<script>
import Vue from "vue";
import Component from "vue-class-component";
import {initListenerCallback, initData} from "../../../util/preview-helper";
@Component({
    props: {
        componentId: {
            type: String,
            default: ""
        }
    }
})
export default class BaseInput extends Vue {
    mStyle = "";
    text = "";
    placeholder = "";
    icon = "phone";
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

