<script>
import Vue from "vue";
import Component, {mixins} from "vue-class-component";
import BaseHeader from "../base";
import animate from "../../../util/animate";
@Component
export default class Home extends mixins(BaseHeader) {
    timer = null;
    step = 0;
    expendList = [];
    render() {
        return (
            <div class="carousel1-box" style={this.mStyle} ref="carouselBox">
                <div class="carousel-body" ref="carouselBody">
                    {
                        this.expendList.map((item, index) => {
                            return (
                                <div class="carousel-items" ref="carouselItems">
                                    <img src={item.imgSrc} /><span>{index}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div class="dots">
                    {
                        this.imgList.map((ele, index) => {
                            return (
                                <div class="dot" style={this.step === (index + 1) ? "background: cyan;" : "background: black;"}>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    autoPlay() {
        let boxWidth = this.$refs.carouselBox.offsetWidth;
        let body = this.$refs.carouselBody;
        let items = document.querySelectorAll(".carousel-items");

        body.style.width = this.expendList.length * boxWidth + "px";
        body.style.left = boxWidth * -1 + "px";

        body.addEventListener('touchstart', e => {
           clearInterval(this.timer);
        }, false);
        body.addEventListener('touchmove', e => {
            console.log(e, "touch move")
        }, false);
        body.addEventListener('touchend', e => {
            console.log(e, "touch end")
        }, false);

        items.forEach(ele => {
            ele.style.width = boxWidth + "px";
        });

        if(this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        };

        this.step = 0;
        this.start(body, boxWidth);
    }
    start(body, boxWidth) {
        this.timer = setInterval(() => {
            this.step++;
            if(this.step > this.imgList.length) {
                this.step = 0;
                body.style.left = boxWidth * this.step * -1 + "px";
                this.step++;
            };
            animate(body, {left: boxWidth * this.step * -1});
        }, 2000);
    }
    mounted() {
        this.expendList = [this.imgList[this.imgList.length - 1], ...this.imgList, this.imgList[this.imgList.length - 1], this.imgList[0]];
        this.$nextTick(() => {
            this.autoPlay();
        });
    }
}
</script>
<style lang="scss" scoped>
.carousel1-box {
    width: 100%;
    position: relative;
    overflow: hidden;
    .carousel-body{
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .carousel-items{
            height: 100%;
            float: left;
        }
    }
    .dots{
        width: 100%;
        height: 30px;
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dot{
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: black;
        margin: 0 3px;
    }
}
</style>

