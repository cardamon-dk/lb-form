<template>
	<el-cascader ref="cascader" v-model="model" v-bind="$attrs" v-on="$listeners" :filterable="$attrs.filter"></el-cascader>
</template>
<script>
export default {
	props: {
		value: {
			type: String | Number | Array | Object
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
