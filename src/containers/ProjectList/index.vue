<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Card } from 'ant-design-vue';
import axios from "axios";
import NewFile from "../Home/components/menu/new-file";
Vue.use(Card)
@Component({
    computed: {
        projectsList() {
            return this.$store.state.qxz.projectsList;
        }
    }
})
export default class ProjectsList extends Vue {
    render() {
        return (
            <div class="project-page">
                <p class="title">已有项目</p>
                <NewFile />
                <div class="project-box">
                    {
                        this.projectsList.map((item, index) => {
                            return (
                                <div class="cards-box">
                                    <div
                                        class="cards"
                                        hoverable
                                        onClick={() => this.handleCardClick(item)}
                                    >
                                        <div class="img-box">
                                            <img
                                                class="card-img"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                                slot="cover"
                                            />
                                        </div>
                                        <div class="card-info">
                                            <div class="card-title-box">
                                                <span class="card-title">{item.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    // 点击卡片
    handleCardClick(item) {
        this.$store.commit("gw/setCurrentProjectId", item.name);
        
        this.$router.push({name: "home"});
    }
    mounted() {
        //获取项目列表
        this.$store.dispatch("qxz/requestProjectsList");
    }
}
</script>
<style lang="scss" scoped>
.project-page{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px;
    background: #f5f5f5;
    .title{
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        color: #555555;
    }
}
.project-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .cards-box{
        width: 350px;
        padding: 20px 40px 40px;
        border-radius: 5px;
    }
}
.cards{
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .img-box{
        width: 100%;
        height: 270px;
        overflow: hidden;
        border-bottom: 1px solid #f1f1f1;
        .card-img{
            width: 100%;
        }
    }
}
.card-info{
    padding: 0 15px;
    line-height: 14px;
    box-sizing: border-box;
    width: 100%;
    .card-title{
        padding: 15px 0;
        display: flex;
        text-align: left;
        align-items: center;
        -webkit-transition: color 0.3s;
        transition: color 0.3s;
        cursor: pointer;
    }
}
</style>