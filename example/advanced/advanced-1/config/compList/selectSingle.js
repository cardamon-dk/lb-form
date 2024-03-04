export default {
	name: '单选下拉框',
	remark: '单个选择列表，自定义或数据字典配置选项，选项去重',
	code: 'select-single',
	formItems() {
		const _formItems = [
			{
				label: '数据来源',
				prop: 'paramName',
				span: 14,
				type: 'select',
				attrs: {
					placeholder: '请选择',
					options: [
						{
							label: '自定义',
							value: 0
						},
						{
							label: '数据字典',
							value: 1
						}
					]
				}
			},
			{
				label: '数据字典',
				prop: 'paramName',
				span: 14,
				type: 'select',
				attrs: {
					placeholder: '请选择',
					options: [
						{
							label: '作业证类型',
							value: 0
						},
						{
							label: 'JSA清单',
							value: 1
						},
						{
							label: '气体库',
							value: 2
						}
					]
				}
			},
			{
				label: '选项设置',
				prop: 'options',
				span: 14
			},
			{
				label: '选项1',
				prop: 'options',
				span: 14,
				isOptions: true,
				group: [
					{
						type: 'input',
						attrs: {
							placeholder: '选项不可重复',
							maxLength: 50,
							showWordLimit: true,
							style: { width: '80%' }
						}
					},
					{
						type: 'el-button',
						attrs: {
							type: 'text',
							icon: 'el-icon-plus',
							style: { padding: '2px', border: '1px solid #4F7AFF', borderRadius: '50%' }
						},
						events: {
							click: addFormItems
						}
					}
				]
			}
		];
		function addFormItems() {
			const key = `id${parseInt(Math.random() * 1000000)}`;
			const idx = _formItems.reduce((prev, v) => (v.isOptions ? ++prev : prev), 1);
			_formItems.push({
				label: `选项${idx}`,
				prop: 'options',
				span: 14,
				isOptions: true,
				key,
				group: [
					{
						type: 'input',
						prop: key,
						attrs: {
							placeholder: '选项不可重复',
							maxLength: 50,
							showWordLimit: true,
							style: { width: '80%' }
						}
					},
					{
						type: 'el-button',
						attrs: {
							type: 'text',
							icon: 'el-icon-minus',
							style: { padding: '2px', border: '1px solid #4F7AFF', borderRadius: '50%' }
						},
						events: {
							click: () => {
								const idx = _formItems.findIndex(v => v.key === key);
								_formItems.splice(idx, 1);
								let _idx = 1;
								_formItems.forEach(v => (v.label = v.isOptions ? `选项${_idx++}` : v.label));
							}
						}
					}
				]
			});
		}
		return _formItems;
	}
};
