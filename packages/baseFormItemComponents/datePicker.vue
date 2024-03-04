<template>
	<el-date-picker v-model="model" type="datetimerange" v-bind="$attrs" v-on="$listeners"></el-date-picker>
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
	mounted() {}
};
</script>
<style lang="scss" scoped>
.el-date-editor {
	width: 100%;
}

.el-date-editor ::v-deep {
	.el-range-separator {
		font-size: 12px;
		color: #595959;
	}

	.el-range-input {
		font-size: 12px;
	}
}
</style>
