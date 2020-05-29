<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class='flex' ref='box'>
      <slot name="source"></slot>
      <div class="meta">
        <div class="description">
          <!-- <slot></slot> -->
          <!-- <el-tooltip effect="dark" :content="langConfig['tooltip-text']" placement="right">
            <el-button size="small" type="primary" @click="goJsfiddle">{{ langConfig['button-text'] }}</el-button>
          </el-tooltip> -->
          <!-- <gs-tooltip :title='langConfig["button-text"]'>
            <gs-icon @click.native="goJsfiddle" name='link'></gs-icon>
          </gs-tooltip>
          <gs-tooltip :title='langConfig["enlarge-text"]'>
            <gs-icon name='search' @click.native='enlarge'></gs-icon>
          </gs-tooltip>
          <gs-tooltip :title='langConfig["copy-text"]'>
            <gs-icon name='copy' v-clipboard></gs-icon>
          </gs-tooltip> -->
        </div>
        <slot name="highlight"></slot>
      </div>
    </div>
    <!-- <gs-modal
      class="modal"
      v-model="visible"
      close-on-click-mask
      title="代码示例"
    >
      <div class='modal-code' ref='modalCode'></div>
    </gs-modal> -->
    <div class="demo-block-control" @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  // const version = require('../../package.json').version;

  export default {
    data() {
      return {
        hovering: false,
        isExpanded: false,
        visible: false
      };
    },

    props: {
      jsfiddle: Object,
      default() {
        return {};
      }
    },

    directives: {
      clipboard: {
        inserted(el, binding, vnode) {
          const clipboard = vnode.context.clipboard = new Clipboard(el, {
            text() {
              const code = vnode.context.$refs.box.querySelector('.highlight').innerText;
              return code;
            }
          });
          clipboard.on('success', () => {
            vnode.context.$Message.success({
              content: '复制成功'
            });
          });
          clipboard.on('error', () => {
            vnode.context.$Message.error({
              content: '复制失败'
            });
          });
        }
      }
    },

    methods: {
      enlarge() {
        this.visible = true;
        if (this.codeCloned) {
          return;
        }
        this.$nextTick(() => {
          const code = this.$refs.box.querySelector('.highlight').cloneNode(true);
          this.$refs.modalCode.appendChild(code);
          this.codeCloned = true;
        });
      },
      goJsfiddle() {
        const { script, html, style } = this.jsfiddle;
        const htmlTpl = `
          <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>gsui</title>
              </head>
               <body>
                <div id="app">
                  ${html.trim()}
                </div>
              </body>
          </html>
        `;
        let jsTpl = (script || '').replace(/export default/, 'var Main =').trim();
        jsTpl = jsTpl
          ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
          : 'new Vue().$mount(\'#app\')';
        const data = {
          babel: window.encodeURIComponent(jsTpl),
          css: window.encodeURIComponent(style || ''),
          html: window.encodeURIComponent(htmlTpl)
        };
        const form = document.getElementById('jsbin-form') || document.createElement('form');
        form.innerHTML = '';
        const node = document.createElement('textarea');

        form.method = 'post';
        form.action = 'http://jsbin.gridsum.com';
        form.target = '_blank';

        for (let name in data) {
          node.name = name;
          node.value = data[name].toString();
          form.appendChild(node.cloneNode());
        }
        form.setAttribute('id', 'jsbin-form');
        form.style.display = 'none';
        document.body.appendChild(form);

        form.submit();
      }
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1];
      },

      langConfig() {
        return {
          "hide-text": "隐藏代码",
          "show-text": "显示代码",
          "button-text": "在线运行",
          "tooltip-text": "前往 jsfiddle.net 运行此示例",
          'enlarge-text': '放大',
          'copy-text': '复制代码'
        };
        // return compoLang.filter(config => config.lang === this.lang)[0]['demo-block'];
      },

      blockClass() {
        return `demo-${ this.lang } demo-${ this.$router.currentRoute.path.split('/').pop() }`;
      },

      iconClass() {
        return this.isExpanded ? 'gs-icon-rise' : 'gs-icon-fall';
      },

      controlText() {
        return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
      },

      codeArea() {
        return this.$el.getElementsByClassName('meta')[0];
      },

      codeAreaHeight() {
        if (this.$el.getElementsByClassName('description').length > 0) {
          return Math.max(this.$el.getElementsByClassName('description')[0].clientHeight, this.$el.getElementsByClassName('highlight')[0].clientHeight);
        }
        return this.$el.getElementsByClassName('highlight')[0].clientHeight;
      }
    },

    watch: {
      isExpanded(val) {
        this.timer && clearInterval(this.timer);
        this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : Math.min(this.codeAreaHeight + 1, Math.max(150, this.boxHeight)) + 'px';
        if (Math.max(150, this.boxHeight) > this.codeAreaHeight && !val) {
          this.codeArea.style.height = this.boxHeight + 'px';
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        let highlight = this.$el.getElementsByClassName('highlight')[0];
        if (this.$el.getElementsByClassName('description').length === 0) {
          highlight.style.width = '100%';
          highlight.borderRight = 'none';
        }
        this.boxHeight = this.$refs.box.querySelector('.source').offsetHeight;
        this.codeArea.style.height = Math.min(this.codeAreaHeight, Math.max(150, this.boxHeight)) + 'px';
        if (Math.max(150, this.boxHeight) > this.codeAreaHeight) {
          this.codeArea.style.height = this.codeAreaHeight + 'px';
        }
      });

      const timer = this.timer = setInterval(() => {
        if (!this.$refs.box) {
          clearInterval(timer);
          return;
        }
        this.$nextTick(() => {
          const height = this.$refs.box.querySelector('.source').offsetHeight;
          if (height !== (this.codeAreaHeight + 1)) {
            const temp = this.tempObj = this.tempObj || {};
            temp[height] = temp[height] || 0;
            temp[height]++;
            if (temp[height] >= 10) {
              delete this.tempObj;
              clearInterval(this.timer);
            }
            this.boxHeight = height;
            this.codeArea.style.height = Math.min(this.codeAreaHeight, Math.max(150, this.boxHeight)) + 'px';
            if (Math.max(150, this.boxHeight) > this.codeAreaHeight) {
              this.codeArea.style.height = this.codeAreaHeight + 'px';
            }
          } else {
            clearInterval(timer);
          }
        });
      }, 30);
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.clipboard && this.clipboard.destroy();
    }
  };
</script>

<style lang="scss">
  .demo-block {
    border: solid 1px #eaeefb;
    border-radius: 4px;
    transition: .2s;
    position: relative;

    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .flex {
      display: flex;
      background: #f6f8fa;
    }

    .demo-button {
      float: right;
    }

    .source {
      padding: 24px;
      width: 60%;
      background: #fff;
      overflow: auto;
      border-right: 2px dashed #eaeefb;
    }

    .meta {
      background-color: #f6f8fa;
      clear: both;
      overflow: hidden;
      width: 40%;
      height: 0;
      transition: height .2s;
    }

    .description {
      position: absolute;
      padding: 4px 12px 0 0;
      right: 0;
      top: 0;
      box-sizing: border-box;
      float: right;
      font-size: 14px;
      line-height: 1.8;
      color: #5e6d82;
      word-break: break-word;
      p {
        margin: 0 0 12px;
        line-height: 1.8;
      }

      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }

      [class*="gs-icon"] {
        font-size: 16px;
        margin-left: 8px;
        cursor: pointer;
      }
    }

    .highlight {
      /*width: 60%;*/
      border-right: solid 1px #eaeefb;
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;

        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border-top: solid 1px #eaeefb;
      height: 36px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      transition: .2s;
      position: relative;

      i {
        font-size: 12px;
        line-height: 36px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }

      span {
        position: absolute;
        left: 47%;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 36px;
        transition: .3s;
        display: inline-block;
      }

      &:hover {
        color: #20a0ff;
        background-color: #f6f8fa;
      }

      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
    }
  }
  .modal {
    .gs-modal-wrap {
      width: 80% !important;
    }
  }

</style>
