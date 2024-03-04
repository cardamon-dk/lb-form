<template>
	<div class="person-template" v-bind="$attrs">
		<template>
			<ElTag v-for="(item, index) in user" v-model="user" closable size="small" type="info" @close="handleClose(index)">
				{{ item.name }}
			</ElTag>
		</template>
		<ElButton type="text" @click="openSpaceSelectPerson">选择用户</ElButton>
		<SpaceSelectPerson ref="personRef" :category-hide="categoryHide" @get-data="getData" />
	</div>
</template>

<script>
import { SpaceSelectPerson, SpacePersonCard } from '@/components/SpaceSelectPerson';

export default {
	name: 'person',
	components: { SpaceSelectPerson, SpacePersonCard },
	props: {
		value: {},
		config: Object,
		// 隐藏的选择类型，传入数组选项：userGroup,position,role
		categoryHide: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {};
	},
	computed: {
		user: {
			get() {
				if (typeof this.value === 'string') {
					return [{ name: this.value }];
				}
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
				this.$emit('getPerson', val);
				this.$nextTick(() => {
					this.$parent.$emit('el.form.change'); //手动触发表单校验
				});
			}
		}
	},

	methods: {
		openSpaceSelectPerson() {
			this.$refs.personRef.openDialog();
		},
		getData(val = []) {
			if (this.$attrs.model == 1) {
				this.user = val;
				return;
			}
			this.user = [{ ...val[0] }];
		},
		handleClose(tag) {
			this.user.splice(tag, 1);
		}
	}
};
</script>

<style lang="scss" scoped>
.person-template {
	display: flex;
}

.person {
	height: 28px;
	background: #fafafa;
	border: 1px solid #d9d9d9;
	border-radius: 2px;
	line-height: 28px;
	padding: 0 9px;
	font-size: 14px;
	color: #595959;
	margin-right: 8px;
}

.el-tag {
	margin-right: 8px;
}
</style>
