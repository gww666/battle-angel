<script>
import Vue from "vue";
import Component from "vue-class-component";
import {initListenerCallback, initData} from "../../../util/preview-helper";
@Component({
    inject: ["componentId"]
})
export default class Home extends Vue {
    text = "";
    mStyle = "";
    created() {
        //初始化data
        initData(this);
    }
    mounted() {
        initListenerCallback(this);
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

