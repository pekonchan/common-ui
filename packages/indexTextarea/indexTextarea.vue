<template>
    <div class="index-textarea-view" :style="{height: calcHeight}">
        <ul class="index-ul pull-left" ref="indexUl">
            <li v-for="index in modelCount" :key="index">{{index}}</li>
        </ul>
        <div ref="indexTextarea" class="index-textarea-wrap">
            <textarea
                :rows="modelCount"
                class="index-textarea"
                :style="{minHeight: calcHeight}"
                wrap="off"
                v-model="model"
                @change="changeModel"
                @keyup="showHeight"
                autofocus>
            </textarea>
        </div>r
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            height: {
                type: Number,
                default: 300
            }
        },
        data () {
            return {
                model: this.value
            };
        },
        computed: {
            modelCount () {
                const count = this.model.split('\n');
                return count.length;
            },
            calcHeight () {
                return typeof this.height === 'number' ? `${this.height}px` : `${this.height}`;
            }

        },
        watch: {
            value (newValue) {
                this.model = newValue;
            }
        },
        methods: {
            /**
             * 这里不能用keyup事件处理，因为如果是中文输入法时，输入了某些拼音却不确定输入法中的内容时，点确定按钮会提示无关键词
             */
            changeModel () {
                this.$emit('input', this.model);
            },
            /**
             * 根据输入内容来变化高度
             */
            showHeight () {
                let indexHeight = this.$refs['indexUl'].scrollHeight;
                let textareaHeight = this.$refs['indexTextarea'].scrollHeight;
                // 设置序列号列的高度，保持两边容器高度一致
                // 1. 当文本框超出整个组件的高度时，出现垂直滚动条，序号列和文本框容器高度存在偏差
                // 2. 当文本框出现横向滚动条时，序号列和文本框容器高度存在一个横向滚动条的高度
                // 3. 当删除文本框内容时，如果文本框容器恢复到最小高度时，序号列也要恢复
                if (indexHeight !== textareaHeight) {
                    this.$refs['indexUl'].style.height = textareaHeight + 'px';
                }
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "indexTextarea";
</style>
