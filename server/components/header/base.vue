<script>
import Vue from "vue";
import Component from "vue-class-component";
@Component({
    props: {
        componentId: {
            type: String,
            default: ""
        }
    }
})
export default class Home extends Vue {
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
            console.log("打印style", mStyle);
            //设置样式属性
            if (Object.keys(mStyle).length) {
                this.mStyle = mStyle;
            }
            
        });
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

