### V1.0.1
+ 新增depend属性，用于解决关联渲染的情况，当depend配置了某一个prop或者name，那么只有当该prop或者name对应的表单项显示时，该表单项才可能显示（show为true的话）
+ 新增name属性，表单项的别名，未配置name属性时使用prop关联表单项，配置name之后使用name关联表单项，多与depend配合使用，使用别名之后不用担心后端修改了字段导致prop改动从而需要全局替换prop的情况。
+ 新增reset属性，当该formItem不显示时（depend的formItem隐藏或者show属性为false）,是否重置该表单选项的值。
+ 新增resetvalue属性，与reset配合使用，触发重置时需要重置的值。
+ 补充一些组件注释，补充一些说明文档
### V1.0.0
+ 初始化表单
+ 新增group属性，同一el-form-item中可以配置任意数量表单组件了（暂不支持group嵌套）
+ 新增describe属性（form-label文字后的问号图标，可传入提示文字）
+ 新增rules属性（同el-form-item中的rules属性）
+ 新增required属性 （会往当前的rules属性中插入一条默认的必填rule，提示语句取决于label和required属性的传入值，如果required传入字符串，会被作为提示语句）（例：{required:true, message: '请输入||选择(取决于输入框类型)${label}', trigger: 'blur||change(取决于输入框类型)'}）
+ 新增slot属性(完全自定义插槽，用了这个插槽将不会自动注入el-form-item，需要的话得自己写)
+ 新增slotLabel (el-form-item的label插槽)
+ 新增slotInput (el-form-item的默认插槽)
+ group新增slot、slotName属性，group中的子项支持自定义

