<template>
    <div ref="comSection" class="com-section" :style="{height: sectionHeight, width: sectionWidth}">
        <div ref="comSectionView" class="com-section-view">
            <slot></slot>
        </div>
        <div ref="scrollY" class="com-section-scrollY" :class="{'is-show': showScrollY}" style="top: 0;"></div>
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
            timer: null
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
        handleScroll () {
            this.showScrollY = this.scrollContainer.scrollHeight > this.scrollContainer.offsetHeight;
            if (this.showScrollY) {
                this.timer && clearTimeout(this.timer);
                this.scrollYBar.style.height = this.scrollContainer.offsetHeight * this.scrollContainer.offsetHeight / this.scrollContainer.scrollHeight + 'px';
                if (this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight > this.scrollContainer.scrollHeight) {
                    return;
                }
                const top = this.scrollContainer.scrollTop * this.scrollContainer.offsetHeight / this.scrollContainer.scrollHeight;
                this.scrollYBar.style.top = top + 'px';
                this.timer = setTimeout(() => {
                    this.showScrollY = false;
                }, 800);
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
            const top = this.scrollContainer.scrollHeight * distance / this.scrollContainer.offsetHeight;
            const scrollTop = top + this.distanceY;
            if (scrollTop < 0) {
                this.scrollContainer.scrollTop = 0
                return;
            }
            if (scrollTop + this.scrollContainer.offsetHeight >= this.scrollContainer.scrollHeight) {
                this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight - this.scrollContainer.offsetHeight;
                return;
            }
            this.scrollContainer.scrollTop = scrollTop;
        },
        hoverSrollBar (el) {
            const e = el || event;
            if (this.scrollContainer.scrollHeight > this.scrollContainer.offsetHeight) {
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
        }
    },
    mounted () {
        this.scrollContainer = this.$refs.comSectionView;
        this.scrollYBar = this.$refs.scrollY;
        this.comSection = this.$refs.comSection;
        this.scrollContainer.addEventListener('scroll', this.handleScroll);
        this.scrollYBar.addEventListener('mouseover', this.hoverSrollBar);
    },
    destroyed () {
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
        this.comSection.removeEventListener('mouseover', this.hoverSrollBar);
    }
}
</script>

<style lang="scss">
@import 'index';
</style>