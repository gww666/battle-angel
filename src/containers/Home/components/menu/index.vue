<script>
import Vue from "vue";
import Drag from "../../../../plugin/drag";
import Component from "vue-class-component";
import {Icon} from "ant-design-vue";
Vue.use(Icon);
@Component
export default class Menu extends Vue {

    initDrag() {
        let menu = document.querySelector(".dangling-menu-box");
        // let menu = document.querySelector(".btn-box");
        //把menu变为可拖拽的
        new Drag(menu);
    }
    add(e) {
        e.stopPropagation();
        console.log("add");
        
    }
    copy() {

    }
    download() {
        
    }
    mounted() {
        this.initDrag();
    }
    render() {
        return (
            <div class="dangling-menu-container">
                <div class="dangling-menu-box">
                    <div class="btn-box">
                        <span onClick={this.add}>
                            <Icon type="file-add" />
                        </span>
                        <span onClick={this.copy}>
                            <Icon type="copy" />
                        </span>
                        <span onClick={this.download}>
                            <Icon type="download" />
                        </span>
                    </div>
                </div>
            </div>
        )
    }

}
</script>
<style lang="scss" scoped>
.dangling-menu-box {
    position: fixed;
    left: 80%;
    top: 50px;
    width: 200px;
    height: 30px;
    border-radius: 15px;
    background-color: #f0f0f0;
    box-shadow: 2px 4px 10px #444;
    line-height: 30px;

    .btn-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;



        &>span i {
            font-size: 16px;
            margin-right: 15px;
            cursor: pointer;
        }
        &>span i:nth-of-type(1) {
            margin-left: 20px;
        }

    }
}

</style>


