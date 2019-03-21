<script>
import Vue from "vue";
import Component from "vue-class-component";
import Drag from "../../../plugin/drag";
@Component
export default class Home extends Vue {


    render() {
        return (
            <div class="input1-box">
                <img src="../../public/static/images/phone.png" alt="arrow" />
                <input type="text" placeholder="请输入手机号" />
            </div>
        )
    }
    mounted() {
        let inputs = document.querySelectorAll(".input1-box");
        Array.from(inputs).forEach(item => new Drag(item));
        // let menu = document.querySelector(".btn-box");
        //把menu变为可拖拽的
        // new Drag(input);
    }
}
</script>
<style lang="scss" scoped>
.input1-box {
    height: 0.88rem;
    display: flex;
    align-items: center;
    color: #333;
    width: 90%;
    background: #f2f2f2;
    border-radius: 0.44rem;
    // position: absolute;
}
.input1-box>img {
    margin-left: 0.42rem;
    /* margin-right: 0.3rem; */
    height: 0.36rem;
}

.input1-box>input {
    margin-left: 0.3rem;
    border: 0;
    outline: none;
    background: #f2f2f2;
}
</style>

