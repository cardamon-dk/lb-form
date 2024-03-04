<template>
	<page-card :title="$route.meta.title" border :go-back="goBack">
		<FormBox title="参数基础设置">
			<lbForm ref="lbForm" :model="form" :rules="rules" :form-items="baseSettingsFormItems"></lbForm>
		</FormBox>
		<div class="comp-container">
			<FormBox title="第一步：选择字段类型" class="left">
				<span>请先选择字段类型，再进行设置</span>

				<el-radio-group v-model="form.compType" class="comp-list">
					<div v-for="(item, index) in compList" :key="index" class="comp-list-item">
						<div class="label">
							<span class="name">{{ item.name }}</span>
							<span class="remark">{{ item.remark }}</span>
						</div>
						<el-radio :label="item.code">{{ '' }}</el-radio>
					</div>
				</el-radio-group>
			</FormBox>

			<FormBox title="第二步：字段基础设置" class="right">
				<lbForm ref="lbForm" :model="form" :rules="rules" :form-items="formItems"></lbForm>
			</FormBox>
		</div>
	</page-card>
</template>
<script>
import FormBox from '../components/FormBox';
import compList from '../config/compList';
export default {
	components: { FormBox },
	data() {
		return {
			form: {
				paramName: '',
				calss: 0,
				type: 1,
				compType: ''
			},
			rules: {
				tag: [{ required: true, message: '请输入最长有效期', trigger: 'blur' }],
				timeRange: [{ required: true, message: '请选择计划周期', trigger: 'blur' }]
			},
			baseSettingsFormItems: [
				{
					label: '字段名称',
					prop: 'paramName',
					span: 8,
					type: 'input',
					attrs: {
						placeholder: '请输入字段名称'
					}
				},
				{
					label: '一级分类',
					prop: 'calss',
					span: 8,
					type: 'select',
					attrs: {
						options: this.initSelector([])
					},
					events: {
						change: val => {
							console.log(val);
						}
					}
				},
				{
					label: '应用作业类型',
					prop: 'type',
					span: 8,
					type: 'select',
					attrs: {
						options: this.initSelector([]),
						multiple: true,
						placeholder: '请选择（可多选）'
					},
					events: {
						change: val => {
							console.log(val);
						}
					}
				},
				{
					label: '是否必填',
					prop: 'paramName',
					span: 8
				}
			],
			compList,
			formItems: []
		};
	},
	watch: {
		'form.compType'(compType) {
			const { formItems } = this.compList?.find(v => v.code === compType) || {};
			const isFn = typeof formItems === 'function';
			this.formItems = isFn ? formItems() : formItems;
		}
	},
	created() {},
	methods: {
		submit() {},
		validForm(formVm) {
			return new Promise((resolve, reject) => {
				formVm.validate(valide => {
					if (valide) {
						return resolve();
					}
					return reject();
				});
			});
		},
		initSelector(options) {
			new Promise((res, rej) => {
				setTimeout(() => {
					res([
						{
							label: '空调系统',
							value: 0
						},
						{
							label: '新风系统',
							value: 1
						},
						{
							label: '配电系统',
							value: 2
						}
					]);
				}, 1000);
			}).then(res => {
				options.push(...res);
				console.log(options);
			});
			return options;
		},
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>
<style lang="scss" scoped>
.comp-container {
	display: flex;
	justify-content: flex-start;
	margin-top: 20px;
	.left,
	.right {
		flex: 1;
		height: 700px;
	}
	.left {
		::v-deep .content {
			height: calc(100% - 40px);
			overflow-y: scroll;
		}
	}
	.right {
		border-left: none;
		margin-top: 0;
	}

	.comp-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		.comp-list-item {
			width: 100%;
			height: 60px;
			background: #fafafa;
			border: 1px solid #e9e9e9;
			border-radius: 2px;
			display: flex;
			margin-top: 20px;
			justify-content: space-between;
			padding: 10px;
			> .label {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name {
					font-size: 12px;
					color: #262626;
				}
				.remark {
					font-size: 12px;
					color: #8c8c8c;
				}
			}
			::v-deep .el-radio {
				display: flex;
				align-items: center;
			}
		}
	}
}
</style>
