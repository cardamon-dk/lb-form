<template>
	<el-radio-group v-model="model" v-bind="$attrs" v-on="$listeners">
		<el-radio v-for="(option, index) in options" :key="index" :label="option[optionProps.value]">
			{{ option[optionProps.label] }}
		</el-radio>
	</el-radio-group>
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
				value: 'value'
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
		console.log(this.options, 'options');
	}
};
</script>
