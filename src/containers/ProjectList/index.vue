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
                                <a-card
                                    hoverable
                                    class="cards"
                                    onClick={() => this.handleCardClick(item)}
                                >
                                    <img
                                        alt="example"
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        slot="cover"
                                    />
                                    <a-card-meta title={item.name}>
                                        <template slot="description">{item.name}</template>
                                    </a-card-meta>
                                </a-card>
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
    .cards{
        width: 200px;
        height: 340px;
        margin: 5px;
    }
}
</style>