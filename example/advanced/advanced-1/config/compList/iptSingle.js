export default {
	name: '文本字段(单行)',
	remark: '基本的单行文本框，用于简单的文本输入',
	code: 'ipt-single',
	formItems: [
		{
			label: '字段长度',
			prop: 'paramName',
			span: 14,
			type: 'input',
			attrs: {
				placeholder: '请输入字段名称'
			}
		},
		{
			label: '数据来源',
			prop: 'paramName',
			span: 14,
			type: 'select',
			attrs: {
				options: [
					{
						label: '手动输入',
						value: 0
					},
					{
						label: '业务数据(自动回显)',
						value: 1
					}
				]
			}
		},
		{
			label: '选择数据',
			prop: 'paramName',
			span: 14,
			type: 'select',
			attrs: {
				options: [
					{
						label: '作业证编号',
						value: 0
					},
					{
						label: '当前用户手机',
						value: 1
					}
				]
			}
		}
	]
};
