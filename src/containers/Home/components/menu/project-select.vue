<script>
import Vue from "vue";
import Component from "vue-class-component";
import {postMessage} from "../../util";
import Select from "../form/select";
import axios from 'axios';
@Component
export default class ProjectSelect extends Vue {
    get currentProjectId() {
        return this.$store.state.gw.currentProjectId;
    }
    get projectList() {
        return this.$store.state.qxz.projectsList.map(item => ({key: item.name, value: item.name}));
        // return [
        //     {
        //         name: "测试",
        //         id: "89"
        //     }
        // ].map(item => ({key: item.name, value: item.id}));
        return [
            {
                // name: "测试",
                id: "89"
            }
        ].map(item => ({key: item.id, value: item.id}));
    }

    //处理切换项目的方法
    async handleProjectChange(projectId) {
        console.log(projectId);
        this.$store.commit("gw/setCurrentProjectId", projectId);
        //获取页面列表
        this.$store.dispatch("qxz/requestPagesList", projectId);
        let options = {
            method: "GET",
            url: "/api/getProjectConf",
            params: {
                projectId
            }
        };
        let res = await axios(options);
        console.log(res, 'resssss')
    }
    render() {
        return (
            <Select 
                label="当前项目："
                labelStyle={{width: "unset"}}
                values={this.projectList}
                change={this.handleProjectChange}
                defaultValue={this.currentProjectId}>
            </Select>
        )
    }
}
</script>