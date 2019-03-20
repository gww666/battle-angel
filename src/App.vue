<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {
	render() {
		return (
			<router-view></router-view>
		)
	}
}
</script>

<style>
* {
	padding: 0;
	margin: 0;
}
body, html {
	width: 100%;
	height: 100%;
}
/* 重置main组件里页面下拉框的样式 */
.nav-box .ant-select .ant-select-selection {
	border-radius: 15px;
    background: #f1f1f1;
}
</style>
