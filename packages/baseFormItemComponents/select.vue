<template>
	<el-select v-model="model" v-bind="$attrs" v-on="$listeners">
		<el-option
			v-for="(option, index) in options"
			:key="index"
			:label="option[optionProps.label]"
			:value="option[optionProps.value]"
			:disabled="option[optionProps.disable]"
		></el-option>
	</el-select>
</template>
<script>
export default {
	props: {
		value: {
			type: String | Number | Array | Object
		},
		options: {
			type: Array,
			default: () => []
		},
		optionProps: {
			type: Object,
			default: () => ({
				label: 'label',
				value: 'value',
				disable: 'disable'
			})
		}
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		}
	},
	mounted() {
	}
};
</script>
