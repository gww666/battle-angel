<script>
// <a-icon type="picture" theme="twoTone"/>
import Vue from "vue";
import Component from "vue-class-component";
import {Select, Icon, Spin} from "ant-design-vue";
Vue.use(Select);
Vue.use(Icon);
Vue.use(Spin);
@Component({
    computed: {
        src() {
            return this.$store.state.iframeSrc;
            // return "http://127.0.0.1:3000/public/index1.html";
        },
        compilerState() {
            return this.$store.state.isCompiling;
        }
    }
})
export default class List extends Vue {

    render() {
        console.log(this.$store);
        
        return (
            <div class="main-box">
                <div class="iframe-box">
                    <div class="nav-box">
                        <a-icon type="arrow-left" />
                        <a-icon type="arrow-right" />
                        <a-icon type="reload" />
                        <a-select defaultValue="jack" style="flex: 1;" change="handleChange">
                            <a-select-option value="jack">测试首页</a-select-option>
                        </a-select>
                        
                    </div>
                    {
                        this.compilerState ? <div class="loading-box"><span>编译中</span><a-spin /></div> :
                            <iframe class="iframe" width="375px" height="667px" frameBorder="0" src={this.src}></iframe>
                    }
                    
                </div>
            </div>
        )
    }
}
</script>
<style lang="scss" scoped>
.main-box {
    width: 1000px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    .iframe-box {
        border: 1px solid #f1f1f1;
        border-radius: 5px;

        .nav-box {
            display: flex;
            align-items: center;
            padding: 10px 5px;
            // margin-bottom: 10px;
            // border: 1px solid #f1f1f1;
            &>i {
                margin-right: 8px;
            }
        }

        .loading-box {
            width: 375px;
            height: 667px;
            display: flex;
            justify-content: center;
            // align-content: center;
            align-items: center;
            flex-flow: column nowrap;
        }

        .iframe {
            // border: 1px solid #f1f1f1;
        }
    }
    
}
</style>
