<template>
	<lbForm
		ref="lbForm"
		:model="form"
		:rules="rules"
		:form-items="formItems"
		:form-props="formProps"
		style="width: 40%;min-width: 500px;margin: 0 auto;"
	></lbForm>
</template>
<script>
export default {
	data() {
		return {
			formProps: {
				labelPosition: 'left',
				labelWidth: '80px'
			},
			form: {
				tag: 0
			},
			rules: {
				name: [{ required: true, message: '请输入计划名称', trigger: 'blur' }],
				timeRange: [{ required: true, message: '请选择计划周期', trigger: 'blur' }]
			},
			formItems: [
				{
					label: '模板名称',
					prop: 'name',
					span: 24,
					type: 'el-input',
					attrs: {
						placeholder: '请输入模板名称，名称不能重复',
						showWordLimit: true,
						maxlength: '20'
					}
				},
				{
					label: '作业类型',
					prop: 'tag',
					span: 24,
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
					label: '作业分级',
					prop: 'author',
					span: 24,
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
					label: '应用项目',
					prop: 'member',
					span: 24,
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
					label: '描述',
					prop: 'album',
					span: 24,
					type: 'el-input',
					attrs: {
						type: 'textarea',
						showWordLimit: true,
						maxlength: '200'
					}
				}
			]
		};
	},
	created() {},
	methods: {
		submit() {
			return new Promise((resolve, reject) => {
				this.$refs.lbForm.validate(valide => {
					if (valide) {
						return resolve(this.form);
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
			});
			return options;
		}
	}
};
</script>
