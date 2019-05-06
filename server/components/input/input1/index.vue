<script>
import Vue from "vue";
import Component, {mixins} from "vue-class-component";
import Base from "../base";
@Component
export default class Home extends mixins(Base) {
    
    render() {
        return (
            <div class="input1-box" style={this.mStyle}>
                <img src={require(`../../../public/static/images/${this.icon}.png`)} alt="arrow" />
                <input type="text" placeholder={this.placeholder} />
            </div>
        )
    }
    mounted() {
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

