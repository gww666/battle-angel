<script>
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class Home extends Vue {


    render() {
        return (
            <div class="input2-box">
                <span class="label">持卡人</span>
                <input type="text" placeholder="请输入持卡人姓名" />
                <span class="btn">发送验证码</span>
                <img src="../../public/static/images/phone.png" alt="arrow-r" />
            </div>
        )
    }
    mounted() {

    }
}
</script>
<style lang="scss" scoped>

.input2-box {
    display: flex;
    height: 0.88rem;
    width: 100%;
    background: #fff;
    position: relative;
}
.input2-box .label {
    box-sizing: border-box;
	width: 2.1rem;
    height: 100%;
    display: flex;
    padding-left: 0.3rem; 
	font-family: PingFangSC-Regular;
	font-size: 0.3rem;
    color: #333333;
    align-items: center;
}
.input2-box>input {
    flex: 1;
    outline: none;
    background: #fff;
    border: 0;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
}

.input2-box .btn {
    position: absolute;
    width: 1.6rem;
    text-align: center;
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: #0168b7;
    border-radius: 0.26rem;
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    padding: 0.12rem 0;
    color: #fff;
}

.input2-box .btn-disable {
    background: #bfbfbf;
}

.input2-box>img {
    height: 0.26rem;
    position: absolute;
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
}
</style>

