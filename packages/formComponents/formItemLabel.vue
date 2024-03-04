<template>
	<div class="lb-form-item-label">
		<span>{{ item.label }}</span>
		<el-popover v-if="item.describe" placement="top-start" width="200" trigger="hover" :content="item.describe">
			<em slot="reference" class="iconfont-lbForm icon-lb-form-wenhao"></em>
		</el-popover>
		<em class="lb-form__required">*</em>
		<slot></slot>
	</div>
</template>
<script>
export default {
	props: {
		item: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {};
	}
};
</script>
<style lang="scss">
.lb-form-item-label {
	.iconfont-lbForm {
		margin-left: 5px;
		font-size: 15px;
		color: #8c8c8c;
	}
	.lb-form__required {
		display: none;
	}
}
</style>
