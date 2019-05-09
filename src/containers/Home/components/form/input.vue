<script>
import Vue from "vue";
import Component from "vue-class-component";
import {Icon} from "ant-design-vue";
Vue.use(Icon);
@Component({
    props: {
        label: "",
        type: "text",
        placeholder: "",
        id: ""
    }
})
export default class Input extends Vue {
    value = ""
    handelChange(e) {
        // console.log(val);
        this.value = e.target.value;
        
    }
    //赋值操作
    setValue(value) {
        this.value = value;
        this.$refs.input.value = value;
    }

    render() {
        return (
            <div class="input-box">
                <span>{this.label}</span>
                <input ref="input" type={this.type} placeholder={this.placeholder} onChange={this.handelChange}/>
            </div>
        )
    }
}
</script>
<style lang="scss" scoped>
.input-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
        font-size: 14px;
        color: #666;
        display: block;
        width: 150px;
    }
    &>input {
        display: block;
        border: 1px solid #ddd;
        outline: none;
        height: 28px;
        width: 200px;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 0 10px;
    }
}
</style>
