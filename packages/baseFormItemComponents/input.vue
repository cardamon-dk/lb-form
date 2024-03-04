<template>
	<el-input v-model="model" v-bind="$attrs" v-on="$listeners">
		<template v-if="$attrs.suffix" #suffix>
			<span class="suffix">{{ $attrs.suffix }}</span>
		</template>
	</el-input>
</template>
<script>
export default {
	props: {
		value: {
			type: String | Number | Array | Object
		},
		props: {
			type: Object
		}
	},
	data() {
		return {};
	},
	mounted() {
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
	}
};
</script>
<style lang="scss" scoped>
.suffix {
	font-size: 12px;
	color: #595959;
}

//去掉数字输入框的上下箭头
.el-input ::v-deep input::-webkit-outer-spin-button,
.el-input ::v-deep input::-webkit-inner-spin-button {
	-webkit-appearance: none;
}

.el-input ::v-deep input[type='number'] {
	-moz-appearance: textfield;
}
</style>
