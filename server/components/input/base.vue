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
export default class BaseInput extends Vue {
    mStyle = {};
    text = "";
    placeholder = "";
    icon = "phone";
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

