<template>
    <div class="com-section">
        <div ref="comSectionView" class="com-section-view">
            <slot></slot>
            <div ref="scrollY" v-show="showScrollY" class="com-section-scrollY" style="top: 0;"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            scrollContainer: null,
            scrollYBar: null,
            distanceY: 0,
            startY: 0,
            showScrollY: false,
            dd: 0
        }
    },
    methods: {
        handleScroll () {
            if (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight) {
                return;
            }
            const top = this.scrollContainer.scrollTop * this.scrollContainer.clientHeight / this.scrollContainer.scrollHeight + this.scrollContainer.scrollTop;
            this.scrollYBar.style.top = top + 'px';
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
            this.dd = parseFloat(this.scrollYBar.style.top) - this.scrollContainer.scrollTop;
            this.scrollContainer.addEventListener('mousemove', this.moveScrollBar);
        },
        clickEnd () {
            this.scrollContainer.removeEventListener('mousemove', this.moveScrollBar);
        },
        moveScrollBar (el) {
            const e = el || event;
            const distance = this.dd + e.pageY - this.startY;
            const scrollTop = this.scrollContainer.scrollHeight * distance / this.scrollContainer.clientHeight;
            if (scrollTop < 0) {
                (scrollTop + this.scrollContainer.scrollTop < 0) && (this.scrollContainer.scrollTop = 0);
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
        this.scrollContainer.addEventListener('scroll', this.handleScroll);
        this.scrollContainer.addEventListener('mouseover', this.showScrollBar);
        this.scrollContainer.addEventListener('mouseout', this.hideScrollBar);
        this.scrollYBar.addEventListener('mousedown', this.clickStart);
        this.scrollYBar.addEventListener('mousedown', this.clickStart);
        document.addEventListener('mouseup', this.clickEnd);
    },
    destroyed () {
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
        this.scrollContainer.removeEventListener('mouseover', this.showScrollBar);
        this.scrollContainer.removeEventListener('mouseout', this.hideScrollBar);
    }
}
</script>

<style lang="scss">
@import 'index';
</style>