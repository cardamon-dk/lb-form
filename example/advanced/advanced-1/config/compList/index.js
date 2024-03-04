import iptSingle from './iptSingle';
import iptMultiple from './iptMultiple';
import selectSingle from './selectSingle';
export default [
	iptSingle,
	iptMultiple,
	selectSingle,
	{
		name: '多选下拉框',
		remark: '多个选择列表，自定义或数据字典配置选项，选项去重',
		code: 'select-multiple'
	},
	{
		name: '数字字段',
		remark: '用于数字类型字段输入，支持小数点',
		code: 'ipt-number'
	},
	{
		name: '时间选择',
		remark: '提供时间选择的控件，进行时间的选择',
		code: 'picker-date'
	},
	{
		name: '单选按钮',
		remark: '单个选择项，自定义或数据字典配置选项，选项去重',
		code: 'btn-radio'
	},
	{
		name: '复选框',
		remark: '多个个选择项，自定义或数据字典配置选项，选项去重',
		code: 'btn-checkbox'
	},
	{
		name: '新增按钮',
		remark: '提供新增按钮，支持添加输入框文本',
		code: 'btn-add'
	},
	{
		name: '地址选择',
		remark: '提供地址选择的控件，进行空间地址的选择',
		code: 'address'
	},
	{
		name: '签名',
		remark: '用于电子签名，支持手动签名',
		code: 'sign'
	},
	{
		name: '用户控件',
		remark: '用于数字类型字段输入，支持小数点',
		code: 'user'
	},
	{
		name: '附件上传',
		remark: '用附件上传，支持单个或多个附件上传',
		code: 'upload-file'
	},
	{
		name: '图片上传',
		remark: '用于图片上传，支持单个或多个图片上传',
		code: 'upload-img'
	},
	{
		name: '关联设备控件',
		remark: '用于关联设备，支持关联单个或多个设备',
		code: 'select-device'
	},
	{
		name: '关联作业票控件',
		remark: '用于关联作业票，支持关联单个或多个作业票',
		code: 'select-ticket'
	}
];
