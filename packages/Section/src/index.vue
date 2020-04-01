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
            startY: 0,
            showScrollY: false,
            distanceY: 0
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
        this.scrollContainer.addEventListener('scroll', this.handleScroll);
        this.scrollContainer.addEventListener('mouseover', this.showScrollBar);
        this.scrollContainer.addEventListener('mouseout', this.hideScrollBar);
        this.scrollYBar.addEventListener('mousedown', this.clickStart);
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