<template>
	<div class="form-box">
		<div v-if="title" class="header">
			<div class="title">{{ title }}</div>
			<slot name="subTitle" />
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {}
	},

	data() {
		return {};
	},

	mounted() {},

	methods: {}
};
</script>
<style lang="scss" scoped>
@mixin form-box {
	border: 1px solid #e9e9e9;
	& + .form-box {
		margin-top: 20px;
	}
	> .header {
		background: #fafafa;
		border-bottom: 1px solid #e9e9e9;
		height: 40px;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			font-size: 12px;
			color: #595959;
			font-weight: bold;
		}
	}
	> .content {
		padding: 20px;
	}
}
.form-box {
	@include form-box;
}
</style>
