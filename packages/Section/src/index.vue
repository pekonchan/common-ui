<template>
    <div ref="comSection" class="com-section" :style="{height: sectionHeight, width: sectionWidth, overflow: needCustom ? 'hidden' : 'visible'}">
        <div v-if="needCustom" ref="comSectionView" class="com-section-view">
            <slot></slot>
        </div>
        <div v-if="needCustom" ref="scrollY" class="com-section-scroll-y" :class="{'is-show': showScrollY}">
            <div ref="scrollYBar" class="scroll-y-bar"></div>
        </div>
        <div v-if="needCustom" ref="scrollX" class="com-section-scroll-x" :class="{'is-show': showScrollX}">
            <div ref="scrollXBar" class="scroll-x-bar"></div>
        </div>
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
            scrollY: null,
            scrollXBar: null,
            startY: 0,
            startX: 0,
            showScrollY: false,
            showScrollX: false,
            distanceY: 0,
            distanceX: 0,
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
                    this.scrollYBar.style.transform = `translateY(${top}px)`;
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
                    this.scrollXBar.style.transform = `translateX(${left}px)`;
                    this.timerX = setTimeout(() => {
                        this.showScrollX = false;
                    }, 800);
                }
                this.scrollLeft = target.scrollLeft;
            }
            
        },
        clickStart (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            if (/scroll-y-bar/.test(target.className)) {
                this.startY = e.pageY;
                this.distanceY = this.scrollContainer.scrollTop;
                this.scrollY.removeEventListener('mouseout', this.hoverOutSrollBar);
                document.addEventListener('mousemove', this.moveScrollYBar);
            } else {
                this.startX = e.pageX;
                this.distanceX = this.scrollContainer.scrollLeft;
                this.scrollX.removeEventListener('mouseout', this.hoverOutSrollBar);
                document.addEventListener('mousemove', this.moveScrollXBar);
            }
            document.addEventListener('mouseup', this.clickEnd);
        },
        clickEnd () {
            document.removeEventListener('mousemove', this.moveScrollBar);
            document.removeEventListener('mouseup', this.clickEnd);
            this.scrollY.addEventListener('mouseout', this.hoverOutSrollBar);
        },
        moveScrollYBar (el) {
            this.moveScrollBar(el, 'startY', 'scrollHeight', 'clientHeight', 'distanceY', 'scrollTop');
        },
        moveScrollXBar (el) {
            this.moveScrollBar(el, 'startX', 'scrollWidth', 'clientWidth', 'distanceX', 'scrollLeft');
        },
        moveScrollBar (el, start, scrollArea, clientArea, distance, scroll) {
            const e = el || event;
            const delta = e.pageY - this[start];
            const top = this.scrollContainer[scrollArea] * delta / this.scrollContainer[clientArea];
            const change = top + this[distance];
            if (change < 0) {
                this.scrollContainer[scroll] = 0
                return;
            }
            if (change + this.scrollContainer[clientArea] >= this.scrollContainer[scrollArea]) {
                this.scrollContainer[scroll] = this.scrollContainer[scrollArea] - this.scrollContainer[clientArea];
                return;
            }
            this.scrollContainer[scroll] = change;
        },
        hoverSrollYBar () {
            this.hoverScrollBar('scrollHeight', 'clientHeight', 'scrollYBar', 'scrollY', 'height');
        },
        hoverSrollXBar () {
            this.hoverScrollBar('scrollWidth', 'clientWidth', 'scrollXBar', 'scrollX', 'width');
        },
        hoverScrollBar (scrollArea, clientArea, scrollBar, scrollBarArea, style) {
            const sA = this.scrollContainer[scrollArea];
            const cA = this.scrollContainer[clientArea];
            if (sA > cA) {
                this[scrollBar].style[style] = cA * cA / sA + 'px';
                this[scrollBar].className += ' is-show';
                this[scrollBar].addEventListener('mousedown', this.clickStart);
                this[scrollBarArea].addEventListener('mouseout', this.hoverOutSroll);
            }
        },
        /**
         * 滚动条所在区域鼠标移出时，滚动条要消失
         */
        hoverOutSroll (el) {
            console.log('hoverOutSroll -> el', el);
            const e = el || event;
            const target = e.target || e.srcElement;
            if (/(com-section-scroll-y)|(scroll-y-bar)/.test(target.className)) {
                this.scrollYBar.className = this.scrollYBar.className.replace(' is-show', '');
                this.scrollYBar.removeEventListener('mousedown', this.clickStart);
                this.scrollY.removeEventListener('mouseout', this.hoverOutSrollBar);
            } else {
                this.scrollXBar.className = this.scrollXBar.className.replace(' is-show', '');
                this.scrollXBar.removeEventListener('mousedown', this.clickStart);
                this.scrollX.removeEventListener('mouseout', this.hoverOutSrollBar);
            }
        },
        /**
         * 获取原来浏览器滚动条的宽度
         * 从目前的情况来看，window的offsetHeight由于包含了滚动条，减去不包含滚动条的clientHeight，得出了滚动条占据的宽度
         * mac系统的浏览器元素的滚动条不占据元素的空间，所以offsetHeight与clientHeight是一样的。
         * 注释于2020/04/07
         */
        getOriginScrollWidth () {
            const box = document.createElement('div');
            box.style.cssText = 'width:100px;height:100px;overflow:scroll;';
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
        this.scrollY = this.$refs.scrollY;
        this.scrollX = this.$refs.scrollX;
        this.comSection = this.$refs.comSection;
        this.scrollYBar = this.$refs.scrollYBar;
        this.scrollXBar = this.$refs.scrollXBar;
        this.scrollContainer.style.cssText += `margin-right:-${this.gutterWidth}px;margin-bottom:-${this.gutterWidth}px;height: calc(100% + ${this.gutterWidth}px);`
        this.scrollYBar.style.height = this.scrollContainer.clientHeight * this.scrollContainer.clientHeight / this.scrollContainer.scrollHeight + 'px';
        this.scrollXBar.style.width = this.scrollContainer.clientWidth * this.scrollContainer.clientWidth / this.scrollContainer.scrollWidth + 'px';
        this.scrollContainer.addEventListener('scroll', this.handleScroll);
        this.scrollY.addEventListener('mouseover', this.hoverSrollYBar);
        this.scrollX.addEventListener('mouseover', this.hoverSrollXBar);
        
    },
    destroyed () {
        if (!this.needCustom) { return; }
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
        this.scrollY.removeEventListener('mouseover', this.hoverSrollYBar);
        this.scrollX.removeEventListener('mouseover', this.hoverSrollXBar);
    }
}
</script>

<style lang="scss">
@import 'index';
</style>