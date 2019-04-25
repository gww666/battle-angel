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

<style lang="scss">
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
//重置ant-design-vue select-default组件的高度
.ant-select-selection--single {
    height: 28px !important;

    .ant-select-selection__rendered {
        line-height: 28px;
    }
}
.menu-item-box {
    background: #fff;
    width: 200px;
    position: absolute;

    .item {
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 10px;
        width: 100%;
		position: relative;
    }
}
</style>
