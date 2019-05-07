<template>
	<div class="select-box" :style="mStyle">
		<span :style="labelStyle">{{this.label}}</span>
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
		mStyle: {
			type: Object,
			default: () => {}
		},
		labelStyle: {
			type: Object,
			default: () => {}
		},
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
		},
		//回显值或默认值
		defaultValue: {
			type: String,
			default: ""
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
		value(newVal, oldVal) {
			if (newVal) {
				this.change(newVal, oldVal);
			}
		}
	},
	created() {
		for (let item of this.values) {
			if (item.value === this.defaultValue) {
				this.setValue(this.defaultValue);
				break;
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.select-box {
    display: flex;
    align-items: center;
    // margin-bottom: 10px;

    span {
        font-size: 14px;
        color: #666;
        display: block;
        width: 150px;
    }
}
</style>

