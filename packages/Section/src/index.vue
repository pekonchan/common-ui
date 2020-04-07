<template>
    <div ref="comSection" class="com-section" :style="{height: sectionHeight, width: sectionWidth}">
        <div v-if="needCustom" ref="comSectionView" class="com-section-view">
            <slot></slot>
        </div>
        <div v-if="needCustom" ref="scrollY" class="com-section-scroll-y" :class="{'is-show': showScrollY}" style="top: 0;"></div>
        <div v-if="needCustom" ref="scrollX" class="com-section-scroll-x" :class="{'is-show': showScrollX}" style="left: 0;"></div>
        <slot v-if="!needCustom"></slot>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: [Number, String],
            default: 'auto'
        },
        width: {
            type: [Number, String],
            default: 'auto'
        }
    },
    data () {
        return {
            needCustom: false, // 是否需要自定义滚动条，目前已知是mac不需要
            scrollContainer: null,
            scrollYBar: null,
            scrollXBar: null,
            startY: 0,
            showScrollY: false,
            showScrollX: false,
            distanceY: 0,
            comSection: null,
            timerY: null,
            timerX: null,
            gutterWidth: 0,
            scrollTop: 0,
            scrollLeft: 0
        }
    },
    computed: {
        sectionHeight () {
            return this.formatValue(this.height);
        },
        sectionWidth () {
            return this.formatValue(this.width);
        }
    },
    methods: {
        formatValue (value) {
            return typeof value === 'number' ? `${value}px` : value;
        },
        handleScroll (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            if (target.scrollTop - this.scrollTop) {
                this.showScrollY = this.scrollContainer.scrollHeight > this.scrollContainer.clientHeight;
                if (this.showScrollY) {
                    this.timerY && clearTimeout(this.timerY);
                    this.scrollYBar.style.height = this.scrollContainer.clientHeight * this.scrollContainer.clientHeight / this.scrollContainer.scrollHeight + 'px';
                    if (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight > this.scrollContainer.scrollHeight) {
                        return;
                    }
                    const top = this.scrollContainer.scrollTop * this.scrollContainer.clientHeight / this.scrollContainer.scrollHeight;
                    this.scrollYBar.style.top = top + 'px';
                    this.timerY = setTimeout(() => {
                        this.showScrollY = false;
                    }, 800);
                }
                this.scrollTop = target.scrollTop;
                return;
            }
            if (target.scrollLeft - this.scrollLeft) {
                this.showScrollX = this.scrollContainer.scrollWidth > this.scrollContainer.clientWidth;
                if (this.showScrollX) {
                    this.timerX && clearTimeout(this.timerX);
                    this.scrollXBar.style.width = this.scrollContainer.clientWidth * this.scrollContainer.clientWidth / this.scrollContainer.scrollWidth + 'px';
                    if (this.scrollContainer.scrollLeft + this.scrollContainer.clientWidth > this.scrollContainer.scrollWidth) {
                        return;
                    }
                    const left = this.scrollContainer.scrollLeft * this.scrollContainer.clientWidth / this.scrollContainer.scrollWidth;
                    this.scrollXBar.style.left = left + 'px';
                    this.timerX = setTimeout(() => {
                        this.showScrollX = false;
                    }, 800);
                }
                this.scrollLeft = target.scrollLeft;
            }
            
        },
        clickStart (el) {
            const e = el || event;
            this.startY = e.pageY;
            this.distanceY = this.scrollContainer.scrollTop;
            // 这里如果是滚动条一直都可见的，即不是悬浮上去才可见的话，可以用document来绑定mouseover事件会更好。
            // 在这里由于是悬浮可见，所以绑定滚动容器即可，减少监听事件的触发
            document.addEventListener('mousemove', this.moveScrollBar);
            document.addEventListener('mouseup', this.clickEnd);
            this.scrollYBar.removeEventListener('mouseout', this.hoverOutSrollBar);
        },
        clickEnd () {
            document.removeEventListener('mousemove', this.moveScrollBar);
            document.removeEventListener('mouseup', this.clickEnd);
            this.scrollYBar.addEventListener('mouseout', this.hoverOutSrollBar);
        },
        moveScrollBar (el) {
            const e = el || event;
            const distance = e.pageY - this.startY;
            const top = this.scrollContainer.scrollHeight * distance / this.scrollContainer.clientHeight;
            const scrollTop = top + this.distanceY;
            if (scrollTop < 0) {
                this.scrollContainer.scrollTop = 0
                return;
            }
            if (scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight) {
                this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
                return;
            }
            this.scrollContainer.scrollTop = scrollTop;
        },
        hoverSrollBar (el) {
            const e = el || event;
            if (this.scrollContainer.scrollHeight > this.scrollContainer.clientHeight) {
                const target = e.target || e.srcElement;
                target.className += ' is-show';
                target.addEventListener('mouseout', this.hoverOutSrollBar);
                target.addEventListener('mousedown', this.clickStart);
            }
        },
        hoverOutSrollBar (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            target.className = target.className.replace(' is-show', '');
            target.removeEventListener('mousedown', this.clickStart);
            target.removeEventListener('mouseout', this.hoverOutSrollBar);
        },
        /**
         * 获取原来浏览器滚动条的宽度
         * 从目前的情况来看，window的offsetHeight由于包含了滚动条，减去不包含滚动条的clientHeight，得出了滚动条占据的宽度
         * mac系统的浏览器元素的滚动条不占据元素的空间，所以offsetHeight与clientHeight是一样的。
         * 注释于2020/04/07
         */
        getOriginScrollWidth () {
            const box = document.createElement('div');
            box.style.cssText = 'width:50px;height:50px;overflow:scroll;';
            document.body.appendChild(box);
            this.gutterWidth = box.offsetHeight - box.clientHeight;
            this.needCustom = this.gutterWidth > 0;
            document.body.removeChild(box);
        }
    },
    created () {
        this.getOriginScrollWidth();
    },
    mounted () {
        if (!this.needCustom) { return; }
        this.scrollContainer = this.$refs.comSectionView;
        this.scrollYBar = this.$refs.scrollY;
        this.scrollXBar = this.$refs.scrollX;
        this.comSection = this.$refs.comSection;
        this.gutterWidth && (this.scrollContainer.style.cssText += `margin-right:-${this.gutterWidth}px;margin-bottom:-${this.gutterWidth}px;height: calc(100% + ${this.gutterWidth}px);`);
        this.scrollContainer.addEventListener('scroll', this.handleScroll);
        this.scrollYBar.addEventListener('mouseover', this.hoverSrollBar);
        this.scrollXBar.addEventListener('mouseover', this.hoverSrollBar);
        
    },
    destroyed () {
        if (!this.needCustom) { return; }
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
        this.comSection.removeEventListener('mouseover', this.hoverSrollBar);
    }
}
</script>

<style lang="scss">
@import 'index';
</style>