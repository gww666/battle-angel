<template>
	<div class="select-box">
		<span>{{this.label}}</span>
		<a-select
			style="width: 200px"
			v-model="value">
			<a-select-option
				v-for="item in values" :key="item.value">
				{{item.key}}
			</a-select-option>
		</a-select>
	</div>
	
</template>
<script>
import Vue from "vue";
import { Select } from "ant-design-vue";
Vue.use(Select);
export default {
	props: {
		values: {
			type: Array,
			default: () => []
		},
		id: {
			type: String,
			default: ""
		},
		label: {
			type: String,
			default: ""
		},
		change: {
			type: Function,
			default: () => {}
		}
	},
	data() {
		return {
			value: ""
		}
	},
	methods: {
		//赋值操作
		setValue(value) {
			this.value = value;
		}
	},
	watch: {
		value(newVal) {
			if (newVal) {
				this.change(newVal);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.select-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
        font-size: 14px;
        color: #666;
        display: block;
        width: 150px;
    }
}
</style>

