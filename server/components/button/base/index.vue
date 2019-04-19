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
export default class BaseBtn extends Vue {
    mStyle = "";
    text = "";
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

</style>
