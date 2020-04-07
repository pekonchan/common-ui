<template>
    <div ref="comSection" class="com-section" :style="{height: sectionHeight, width: sectionWidth}">
        <div ref="comSectionView" class="com-section-view">
            <slot></slot>
        </div>
        <div ref="scrollY" v-show="showScrollY" class="com-section-scrollY" :class="{'is-show': showScrollY}" style="top: 0;"></div>
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
            scrollContainer: null,
            scrollYBar: null,
            startY: 0,
            showScrollY: false,
            distanceY: 0,
            comSection: null,
            wheelStart: 0,
            wheelDelta: 0
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
            console.log('handleScroll -> el', el);
            this.showScrollY = this.comSection.clientHeight < this.scrollContainer.offsetHeight;
            if (this.showScrollY) {
                const e = el || event;
                this.timer && clearTimeout(this.timer);
                this.wheelStart = e.deltaY;
                this.wheelDelta = e.deltaY - this.wheelStart;
                this.scrollYBar.style.height = this.comSection.clientHeight * this.comSection.clientHeight / this.scrollContainer.offsetHeight + 'px';
                if (this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight > this.scrollContainer.scrollHeight) {
                    return;
                }
                const top = this.wheelDelta * this.comSection.clientHeight / this.scrollContainer.offsetHeight;
                this.scrollYBar.style.top = top + 'px';
                // this.timer = setTimeout(() => {
                //     this.showScrollY = false;
                // }, 800);
            }
        },
        showScrollBar () {
            this.showScrollY = this.scrollContainer.scrollHeight > this.scrollContainer.clientHeight;
        },
        hideScrollBar () {
            this.showScrollY = false;
        },
        clickStart (el) {
            const e = el || event;
            this.startY = e.pageY;
            this.distanceY = parseFloat(this.scrollYBar.style.top) - this.scrollContainer.scrollTop;
            // 这里如果是滚动条一直都可见的，即不是悬浮上去才可见的话，可以用document来绑定mouseover事件会更好。
            // 在这里由于是悬浮可见，所以绑定滚动容器即可，减少监听事件的触发
            this.scrollContainer.addEventListener('mousemove', this.moveScrollBar);
            document.addEventListener('mouseup', this.clickEnd);
        },
        clickEnd () {
            this.scrollContainer.removeEventListener('mousemove', this.moveScrollBar);
            document.removeEventListener('mouseup', this.clickEnd);
        },
        moveScrollBar (el) {
            const e = el || event;
            const distance = this.distanceY + e.pageY - this.startY;
            const scrollTop = this.scrollContainer.scrollHeight * distance / this.scrollContainer.clientHeight;
            if (scrollTop < 0) {
                this.scrollContainer.scrollTop = 0
                return;
            }
            if (scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight) {
                this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
                return;
            }
            this.scrollContainer.scrollTop = scrollTop;
        }
    },
    mounted () {
        this.scrollContainer = this.$refs.comSectionView;
        this.scrollYBar = this.$refs.scrollY;
        this.comSection = this.$refs.comSection;
        this.comSection.addEventListener('wheel', this.handleScroll);
        // this.scrollContainer.addEventListener('mouseover', this.showScrollBar);
        // this.scrollContainer.addEventListener('mouseout', this.hideScrollBar);
        // this.scrollYBar.addEventListener('mousedown', this.clickStart);
    },
    destroyed () {
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
        this.scrollContainer.removeEventListener('mouseover', this.showScrollBar);
        this.scrollContainer.removeEventListener('mouseout', this.hideScrollBar);
    }
}
</script>

<style lang="scss">
@import 'index3';
</style>