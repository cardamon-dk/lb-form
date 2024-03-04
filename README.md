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

#### 优化项

##### 待补充的内置组件

- 固定需要补充的组件都是那种多标签渲染的表单组件，比如 el-select 需要<el-select>标签和<el-option>标签配合使用，这种类型无法用 lb-form 配置出来，所以直接将其封装成了内置组件，将<el-option>标签抽离成了配置项，或者是某些带slot标签的组件，比如<el-input>可以使用suffix的slot，也可以进行扁平化封装，其他待补充的内置组件如下：

* swtich --todo
* checkbox --todo

##### 待优化的点

- 该组件内部表单项之间的布局使用 el-layout 控制，这种布局方式在某些情况下不好配置，可能需要拓展其他布局方式，例如直接通过 style 或 class 或 width 控制等。
- 目前该组件对于同级多表单的渲染可以通过 group 属性解决，但是对于多级表单（如果有的话）的渲染无法通过配置项处理，只能通过 slot 自定义解决。
- 内置组件中的 person，应该是作业票的业务组件，不够公共化，不应该当作 lbform 的内置组件，需要找个版本剔除出去。
- 从代码逻辑上看，全局注册的组件在局部注册时好像会失效，需要测试优化。
#### 展望

- 当前实现的功能应该已经能满足大部分表单渲染需求。
- 设计之初的期望是该组件作为表单解析器，与表单配置器组合成为一个低代码的表单配置平台，从而完成大部分表单设计需求。
- 初期的设计思路有两种，一种是通过表单配置器生成页面直接发布至门户，但是这种方式可能与业务耦合过重并且需要承接页面设计的功能，考虑到表单配置器的功能单一性问题，不采用此方案。
- 另一种是通过表单配置器生成.vue 格式的代码或者 json 配置，开发人员配置完后手动复制到项目内使用，优点是一定程度上能提升表单功能的开发效率，缺点是配置器与真实业务同步性无法保证，即每次需求或者业务有所修改都需要重新同步代码，一旦手动修改了配置好的代码，配置平台和真实业务就会失去关联。

