<template>
    <div ref="comSection" class="com-section">
        <div ref="comSectionView" class="com-section-view">
            <slot></slot>
        </div>
        <div ref="scrollY" v-show="showScrollY" class="com-section-scrollY" style="top: 0;"></div>
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
            distanceY: 0,
            comSection: null,
            scrollY: 0
        }
    },
    methods: {
        handleScroll () {
            if (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight) {
                return;
            }
            const top = this.scrollContainer.scrollTop * this.scrollContainer.clientHeight / this.scrollContainer.scrollHeight;
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
            this.distanceY = parseFloat(this.scrollContainer.style.top);
            this.scrollY = parseFloat(this.scrollYBar.style.top)
            // 这里如果是滚动条一直都可见的，即不是悬浮上去才可见的话，可以用document来绑定mouseover事件会更好。
            // 在这里由于是悬浮可见，所以绑定滚动容器即可，减少监听事件的触发
            this.comSection.addEventListener('mousemove', this.moveScrollBar);
            document.addEventListener('mouseup', this.clickEnd);
        },
        clickEnd () {
            this.comSection.removeEventListener('mousemove', this.moveScrollBar);
            document.removeEventListener('mouseup', this.clickEnd);
        },
        moveScrollBar (el) {
            const e = el || event;
            const distance = e.pageY - this.startY;
            const top = this.scrollContainer.scrollHeight * -distance / this.comSection.clientHeight;
            const scrollTop = this.distanceY + top;
            if (-scrollTop > this.scrollContainer.scrollHeight - this.comSection.clientHeight) {
                this.scrollContainer.style.top = (-this.scrollContainer.scrollHeight + this.comSection.clientHeight) + 'px';
                return;
            }
            if (-scrollTop < 0) {
                this.scrollContainer.style.top = 0 + 'px';
                return;
            }
             this.scrollContainer.style.top = scrollTop + 'px';
             this.scrollYBar.style.top = this.scrollY + distance + 'px';
        }
    },
    mounted () {
        this.scrollContainer = this.$refs.comSectionView;
        this.scrollYBar = this.$refs.scrollY;
        this.comSection = this.$refs.comSection;
        this.scrollYBar.style.height = this.comSection.clientHeight * this.comSection.clientHeight / this.scrollContainer.scrollHeight + 'px';
        // this.scrollContainer.addEventListener('scroll', this.handleScroll);
        this.comSection.addEventListener('mouseover', this.showScrollBar);
        this.comSection.addEventListener('mouseout', this.hideScrollBar);
        this.scrollYBar.addEventListener('mousedown', this.clickStart);
    },
    destroyed () {
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
        this.comSection.removeEventListener('mouseover', this.showScrollBar);
        this.comSection.removeEventListener('mouseout', this.hideScrollBar);
    }
}
</script>

<style lang="scss">
@import 'index2';
</style>