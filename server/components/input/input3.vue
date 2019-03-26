<script>
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class Home extends Vue {


    render() {
        return (
            <div class="input3-box">
                <span class="left">还款账号</span>
                <span class="middle">中国银行(1411)</span>
                <span class="right">更改</span>
            </div>
        )
    }
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
.input3-box {
    height: 0.88rem;
    background: #fff;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.3rem;
    font-size: 0.3rem;
    color: #333;
}

.input3-box .left {

}

.input3-box .middle {
    flex: 1;
    margin-left: 0.6rem;
}

.input3-box .right {
    font-size: 0.26rem;
	color: #0168b7;
}
</style>

