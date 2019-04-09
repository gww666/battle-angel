<script>
import Vue from "vue";
import Component from "vue-class-component";
import StyleLoader from "../../../plugin/edit/css-modules";
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
    mounted() {
        window.PSEvent.listen(this.componentId, data => {
            let mStyle = {}
            Object.keys(data).forEach(key => {
                let value = data[key];
                if (value) {
                    //属于样式标签
                    if (key in document.documentElement.style) {
                        mStyle[key] = value;
                    } else {
                        this[key] = value
                    }
                }
            });
            //设置样式属性
            if (Object.keys(mStyle).length) {
                this.mStyle = StyleLoader(mStyle);
            }
            
        });
    }
}
</script>
<style lang="scss" scoped>

</style>
