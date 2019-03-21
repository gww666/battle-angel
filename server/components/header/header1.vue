<script>
import Vue from "vue";
import Component from "vue-class-component";
import Drag from "../../../plugin/drag";
@Component
export default class Home extends Vue {


    render() {
        return (
            <div class="header1-box">
                <img src="../../public/static/images/arrow.png" alt="arrow" />
                <span>登录</span>
            </div>
        )
    }
    mounted() {
        let inputs = document.querySelectorAll(".header1-box");
        Array.from(inputs).forEach(item => new Drag(item));
        // let menu = document.querySelector(".btn-box");
        //把menu变为可拖拽的
        // new Drag(input);
    }
}
</script>
<style lang="scss" scoped>
.header1-box {
    position: relative;
    height: 0.88rem;
    width: 100%;
    background: #0168b7;
    color: white;
    font-size: 0.36rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.header1-box>img {
    position: absolute;
    top: 50%;
    left: 0.3rem;
    height: 0.36rem;
    transform: translateY(-50%);
}
</style>

