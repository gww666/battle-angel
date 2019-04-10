<script>
import Vue from "vue";
import Component from "vue-class-component";
import ComponentList from "./components/component-list";
import Main from "./components/main";
import Menu from "./components/menu";
import Edit from "./components/edit";
@Component
export default class Home extends Vue {

    render() {
        return (
            <div class="home-box">
                <div class="left">
                    <ComponentList />
                </div>
                <div class="main">
                    <Main />
                </div>
                <div class="right">
                    <Edit />
                </div>
                <Menu />
            </div>
        )
    }
}
</script>
<style lang="scss" scoped>
.home-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .left {
        width: 200px;
        height: 100%;
    }
}
</style>

