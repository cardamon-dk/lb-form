## lbform

##### 版本记录
#### 1.0.2
1. 级联选择新增是否支持搜索配置 配置字段filter，例：
``` cmd
attrs: {
	ref: 'operationArea',
	disabled: this.pageType === 'edit',
	options: this.resourceTree,
	filter: true,
	props: {
		value: 'code',
		label: 'name',
		emitPath: false,
		checkStrictly: true
	}
}
```


##### 适用场景-简单表单配置

#### 使用方式

##### 组件注册
``` cmd
npm i lb-form
```
```js
// main.js
import lbform from 'lb-form';
Vue.use(lbform);
```

##### 注册拓展组件

###### 局部注册

```js
// 局部注册主要是为了某些与业务耦合较大不适合全局注册的组件提供，注册完之后会生成一个包含注入组件的lbform实例，可以用于局部注册
import { addComponentsOnce } from 'lb-form';
import compA from 'xxx/compA'; // 假设该组件与当前业务耦合严重，使用次数有限，不适合全局注册
const lbform = addComponentsOnce({ compA: compA }); // 只有导出的实例中会包含传入的组件，不会影响到全局的lb-form
export default {
	components: { lbform }
};
```

###### 全局注册

```js
// main.js

// 全局注册的拓展组件在项目任何地方都可以在lbform中使用
import lbform from 'lb-form';
import compA from 'xxx/compA';
import compB from 'xxx/compB';

Vue.use(lbform, { extComponents: { compA: compA, compB: compB } });
```

```vue
// xxx.vue
<template>
	<lbform ref="lb_form" :form-items="formItems" :model="form" :rules="rules"></lbform>
</template>
<script>
export default {
	computed: {
		formItems: [
			{
				label: '测试A',
				prop: 'anyA',
				type: 'compA', // 组件A
				required: true,
				attrs: {
					xxxx: 'xxxx'
				},
				events: {
					click: val => {
						console.log(val);
					}
				}
			},
			{
				label: '测试B',
				prop: 'anyB',
				type: 'compB', // 组件B
				required: true,
				attrs: {
					xxxx: 'xxxx'
				},
				events: {
					click: val => {
						console.log(val);
					}
				}
			}
		]
	}
};
</script>
```

#### attribute:

|   参数    |                                        说明                                        |  类型  | 可选值 | 默认值 |
| :-------: | :--------------------------------------------------------------------------------: | :----: | :----: | :----: |
| formProps | el-form 配置项 详见https://element.eleme.io/#/zh-CN/component/form#form-attributes | object |        |        |
| formItems |                              表单配置 详见 formItems                               | array  |        |        |
|   model   |                             同 el-form 中的 model 属性                             | object |        |        |
|   rules   |                             同 el-form 中的 rules 属性                             | object |        |        |

#### formItems

|    参数    |                                                                                          说明                                                                                          |              类型              |             可选值              | 默认值 |
| :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------: | :-----------------------------: | :----: |
|    span    |                                                                     el-form-item 的宽度，24 等分，参考 el-row 配置                                                                     |             number             |              1-24               |        |
|    prop    |                                                                                el-form-item 绑定的 prop                                                                                |             string             |                                 |        |
|   label    |                                                                                 el-form-item 的 label                                                                                  |             string             |                                 |        |
|    slot    |                                                                                       是否自定义                                                                                       |            boolean             |                                 | false  |
|    type    |                                                                         el-form-item 中的输入框、选择器的类型                                                                          |             string             | input\|date-picker\|select\|any |        |
|   attrs    |                                                                       el-form-item 中的输入框、选择器绑定的属性                                                                        |             object             |                                 |        |
|   events   |                                                                       el-form-item 中的输入框、选择器绑定的事件                                                                        |             object             |                                 |        |
|    text    |                                                                        el-form-item 中的输入框、选择器中的文本                                                                         |              any               |                                 |        |
|  required  |                                                            是否必填，自动往 rules 中插入一条校验规则并自动生成中文校验信息                                                             |              any               |                                 |        |
|   rules    |                                                                               同 el-form-item 中的 rules                                                                               |              any               |                                 |        |
|    show    |                                                                                  用以判断组件是否显示                                                                                  | boolean 、function（暂未支持） |                                 |        |
|   depend   | 当前 formitem 的显示隐藏依赖于哪个 formitem，当配置此属性时，只有依赖的 formtem 显示时该 formitem 才会显示，与 show 属性并存时先计算 depend 属性再计算 show 属性，两者同时为真才显示。 |             string             |                                 |        |
|    name    |                                         该 formItem 的 name 属性，当配置 depend 属性时会使用该属性匹配，如果不存在 name 属性那么会拿 prop 匹配                                         |             string             |                                 |        |
|   reset    |                                            当该 formItem 不显示时（depend 的 formItem 隐藏或者 show 属性为 false）,是否重置该表单选项的值。                                            |            boolean             |                                 |        |
| resetValue |                                            配置了 reset 之后可用，reset 时会取 resetValue 中的值作为重置后的值,如果不传则默认为空字符串: ''                                            |              any               |                                 |        |
|   group    |                                                                             表单输入组，见下方 group 描述                                                                              |             Array              |                                 |        |

#### group

拥有 formItems 中除了 depend，name，reset， resetValue, label、slot、group 之外的全部属性，区别是它是一个数组，可以渲染多个输入组件

```javascript
{
					label: '作业票预约审核',
					prop: 'needValid',
					span: 24,
					group: [
						{
							prop: 'needValid',
							type: 'el-switch',
							attrs: {}
						},
						{
							show: this.form.needValid,
							type: 'el-button',
							text: '流程配置',
							attrs: {
								type: 'text primary'
							},
							events: {
								click: () => {
									console.log(this.form);
								}
							}
						},
						{
							show: this.form.needValid,
							type: 'el-button',
							text: '查看流程',
							attrs: {
								type: 'text primary'
							},
							events: {
								click: () => {
									console.log(this.form);
								}
							}
						}
					]
				}
```

#### 内置表单组件

- select --见下方示例
- input --见下方示例
- radio --见下方示例
- datePicker --基础封装、主要为了样式统一
- cascader --基础封装、主要为了样式统一

#### 内置表单组件说明

内置组件基本上是对饿了么组件的扁平化封装，主要目的是为了单层配置项能配置出平常需要使用插槽或者父子元素才能写出的输入或选择器

1. input: 支持输入框带单位

```javascript
{
	label: '测试input',
	prop: 'suibian',
	type: 'input',
	required: '请输入测试input'
	attrs: {
		suffix: '个', //输入框内部后置文本，不传则不显示
		placeholder: '请输入',
		maxLength: 10,
		showWordLimit: true
	},
	events: {
		input: (val) => {
			console.log(val)
			console.log(this)
		}
	}
}
```

2. select: 基础示例

```javascript
{
	label: '测试select',
	prop: 'suibian',
	type: 'select',
	required: true,
	attrs: {
		options: [
			{
				name: 'A',
				id: 0
			},
			{
				name: 'B',
				id: 1
			},
		],
		optionProps: {
			label: 'name',
			value: 'id'
		}
		multiple: true,
		placeholder: '请选择',
	},
	events: {
		change: (val) => {}
	}
}
```

3. radio: 基础示例

```javascript
{
	label: '测试select',
	prop: 'suibian',
	type: 'select',
	attrs: {
		options: [
			{
				name: 'A',
				id: 0
			},
			{
				name: 'B',
				id: 1
			},
		],
		optionProps: {
			label: 'name',
			value: 'id'
		}
	},
	events: {
		change: (val) => {}
	}
}
```

