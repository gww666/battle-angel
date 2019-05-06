<script>
import Vue from "vue";
import Component, {mixins} from "vue-class-component";
import BaseHeader from "../base";
@Component
export default class Home extends mixins(BaseHeader) {

    render() {
        return (
            <div class="header1-box" style={this.mStyle}>
                <img src={require("../../../public/static/images/arrow.png")} alt="arrow" />
                <span>{this.text}</span>
            </div>
        )
    }
    mounted() {
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

