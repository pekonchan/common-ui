<template>
    <div class="com-section" :style="{height: sectionHeight, width: sectionWidth, overflow: needCustom ? 'hidden' : 'auto'}">
        <div v-if="needCustom" ref="comSectionView" class="com-section-view">
            <slot></slot>
        </div>
        <div v-if="needCustom" ref="scrollY" class="com-section-scroll-y">
            <div ref="scrollYBar" class="scroll-y-bar" :class="{'is-show': showScrollY}"></div>
        </div>
        <div v-if="needCustom" ref="scrollX" class="com-section-scroll-x">
            <div ref="scrollXBar" class="scroll-x-bar" :class="{'is-show': showScrollX}"></div>
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
        },
        // 在原生支持修改滚动条样式的情况下，是否选择使用原生，目前只有在webkit内核浏览器上才能通过css修改
        useNative: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            needCustom: false, // 是否需要自定义滚动条，目前已知是mac不需要
            scrollContainer: null, // 滚动内容所在容器
            scrollYBar: null, // 垂直滚动条浮标
            scrollXBar: null, // 横向滚动条浮标
            scrollY: null, // 垂直滚动条所在区域
            scrollX: null, // 垂直滚动条所在区域
            showScrollY: false, // 是否展示垂直滚动条
            showScrollX: false, // 是否展示横向滚动条
            startY: 0, // 记录最新一次点击滚动条时的pageY
            startX: 0, // 记录最新一次点击滚动条时的pageX
            distanceY: 0, // 记录最新一次点击滚动条时的scrollTop
            distanceX: 0, // 记录最新一次点击滚动条时的scrollLeft
            timerY: null, // 隐藏垂直滚动条的定时器
            timerX: null, // 隐藏横向滚动条的定时器
            scrollTop: 0, // 记录最新一次滚动的scrollTop，用于判断滚动方向
            scrollLeft: 0, // 记录最新一次滚动的scrollLeft，用于判断滚动方向
            gutterWidth: 0 // 浏览器滚动条的宽度/高度
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
        /**
         * 处理内容滚动事件
         */
        handleScroll (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            let scroll, showScroll, scrollArea, clientArea, timer, scrollBar, isVertical, transform;
            // 如果是发生垂直滚动
            if (target.scrollTop !== this.scrollTop) {
                scroll = 'scrollTop';
                showScroll = 'showScrollY';
                scrollArea = 'scrollHeight';
                clientArea = 'clientHeight';
                timer = 'timerY';
                scrollBar = 'scrollYBar';
                isVertical = true;
                transform = 'translateY';
            }
            // 如果是发生横向滚动
            if (target.scrollLeft !== this.scrollLeft) {
                scroll = 'scrollLeft';
                showScroll = 'showScrollX';
                scrollArea = 'scrollWidth';
                clientArea = 'clientWidth';
                timer = 'timerX';
                scrollBar = 'scrollXBar';
                isVertical = false;
                transform = 'translateX';
            }
            const scrollAreaValue = this.scrollContainer[scrollArea];
            const clientAreaValue = this.scrollContainer[clientArea];
            const scrollValue = this.scrollContainer[scroll];
            this[showScroll] = true; // 触发滚动事件，证明内容尺寸的确大于可视区域，才会发生滚动
            this[timer] && clearTimeout(this[timer]); // 做简单的防抖处理
            this.calcSize(isVertical); // 每次滚动的时候重新计算滚动条尺寸，以免容器内容发生变化后，滚动条尺寸不匹配变化后的容器宽高
            const distance = scrollValue * clientAreaValue / scrollAreaValue;
            this[scrollBar].style.transform = `${transform}(${distance}px)`;
            this[timer] = setTimeout(() => {
                this[showScroll] = false;
            }, 800);
            this[scroll] = target[scroll];
        },
        /**
         * 点击垂直/水平滚动条
         */
        clickStart (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            // 垂直滚动条
            if (/scroll-y-bar/.test(target.className)) {
                this.startY = e.pageY;
                this.distanceY = this.scrollContainer.scrollTop;
                this.scrollY.removeEventListener('mouseout', this.hoverOutSroll);
                this.scrollYBar.removeEventListener('mouseout', this.hoverOutSroll);
                document.addEventListener('mousemove', this.moveScrollYBar);
            } else { // 横向滚动条
                this.startX = e.pageX;
                this.distanceX = this.scrollContainer.scrollLeft;
                this.scrollX.removeEventListener('mouseout', this.hoverOutSroll);
                document.addEventListener('mousemove', this.moveScrollXBar);
            }
            document.addEventListener('mouseup', this.clickEnd);
        },
        /**
         * 按住滚动条移动完松开鼠标后
         */
        clickEnd () {
            document.removeEventListener('mousemove', this.moveScrollYBar);
            document.removeEventListener('mousemove', this.moveScrollXBar);
            document.removeEventListener('mouseup', this.clickEnd);
            this.scrollY.addEventListener('mouseout', this.hoverOutSroll);
            this.scrollX.addEventListener('mouseout', this.hoverOutSroll);
        },
        /**
         * 移动垂直滚动条
         */
        moveScrollYBar (el) {
            this.moveScrollBar(el, 'pageY', 'startY', 'scrollHeight', 'clientHeight', 'distanceY', 'scrollTop');
        },
        /**
         * 移动横向滚动条
         */
        moveScrollXBar (el) {
            this.moveScrollBar(el, 'pageX', 'startX', 'scrollWidth', 'clientWidth', 'distanceX', 'scrollLeft');
        },
        /**
         * 按住滚动条移动
         */
        moveScrollBar (el, pageOffset, start, scrollArea, clientArea, distance, scroll) {
            const e = el || event;
            const delta = e[pageOffset] - this[start];
            const scrollAreaValue = this.scrollContainer[scrollArea];
            const clientAreaValue = this.scrollContainer[clientArea];
            let change = scrollAreaValue * delta / clientAreaValue; // 根据移动的距离，计算出内容应该被移动的距离（scrollTop/scrollLeft）
            change += this[distance]; // 加上原本已经移动的内容位置，得出确实的scrollTop/scrollLeft
            // 如果计算值是负数，证明肯定回到滚动最开始的位置了
            if (change < 0) {
                this.scrollContainer[scroll] = 0
                return;
            }
            // 如果大于最大等于移动距离，那么即到达底部
            if (change + clientAreaValue >= scrollAreaValue) {
                this.scrollContainer[scroll] = scrollAreaValue - clientAreaValue;
                return;
            }
            this.scrollContainer[scroll] = change; // 设置了scrollTop/scrollLeft会引起scroll事件的触发
        },
        /**
         * 悬浮垂直滚动条或所在区域
         */
        hoverSrollYBar () {
            this.hoverScrollBar('scrollHeight', 'clientHeight', 'showScrollY', 'scrollYBar', 'scrollY', 'height');
        },
        /**
         * 悬浮水平滚动条或所在区域
         */
        hoverSrollXBar () {
            this.hoverScrollBar('scrollWidth', 'clientWidth', 'showScrollX', 'scrollXBar', 'scrollX', 'width');
        },
        /**
         * 鼠标移入（悬浮）滚动条或滚动条所在区域
         */
        hoverScrollBar (scrollArea, clientArea, showScroll, scrollBar, scrollBarArea, style) {
            const sA = this.scrollContainer[scrollArea];
            const cA = this.scrollContainer[clientArea];
            // 达到展示滚动条条件时
            if (sA > cA) {
                this[scrollBar].style[style] = cA * cA / sA + 'px'; // 设置滚动条长度
                this[showScroll] = true;
                this[scrollBar].addEventListener('mousedown', this.clickStart);
                this[scrollBarArea].addEventListener('mouseout', this.hoverOutSroll);
            }
        },
        /**
         * 滚动条所在区域鼠标移出时，滚动条要消失
         */
        hoverOutSroll (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            if (/(com-section-scroll-y)|(scroll-y-bar)/.test(target.className)) {
                this.showScrollY = false;
                this.scrollYBar.removeEventListener('mousedown', this.clickStart);
                this.scrollY.removeEventListener('mouseout', this.hoverOutSroll);
            } else {
                this.showScrollX = false;
                this.scrollXBar.removeEventListener('mousedown', this.clickStart);
                this.scrollX.removeEventListener('mouseout', this.hoverOutSroll);
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
        },
        /**
         * 检查浏览器是否是webkit内核，是的话可以自定义滚动条样式
         * @returns {Boolean} true为是webkit内核
         */
        checkWebkit () {
            this.needCustom = navigator.userAgent.toLowerCase().indexOf('applewebkit') === -1;
            return !this.needCustom;
        },
        /**
         * 计算垂直/横向滚动条的宽度/高度
         */
        calcSize (isHeight) {
            let scrollBar,sizeKey,clientArea,scrollArea;
            if (isHeight) {
                scrollBar = 'scrollYBar';
                sizeKey = 'height';
                clientArea = 'clientHeight';
                scrollArea = 'scrollHeight';
            } else {
                scrollBar = 'scrollXBar';
                sizeKey = 'width';
                clientArea = 'clientWidth';
                scrollArea = 'scrollWidth';
            }
            const clientAreaValue = this.scrollContainer[clientArea];
            this[scrollBar].style[sizeKey] = clientAreaValue * clientAreaValue / this.scrollContainer[scrollArea] + 'px';
        }
    },
    created () {
        this.useNative && this.checkWebkit() || this.getOriginScrollWidth();
    },
    mounted () {
        if (!this.needCustom) { return; }
        this.scrollContainer = this.$refs.comSectionView;
        this.scrollY = this.$refs.scrollY;
        this.scrollX = this.$refs.scrollX;
        this.scrollYBar = this.$refs.scrollYBar;
        this.scrollXBar = this.$refs.scrollXBar;
        this.scrollContainer.style.cssText += `margin-right:-${this.gutterWidth}px;margin-bottom:-${this.gutterWidth}px;height: calc(100% + ${this.gutterWidth}px);`
        this.calcSize(true);
        this.calcSize();
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