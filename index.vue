<template>
	<el-form ref="form" :model="model" :rules="rules" class="lb-form fix-required" v-bind="formProps">
		<el-row :gutter="40" class="form-container">
			<template v-for="(item, index) in localFormItems">
				<el-col v-if="item.show" :key="index" :span="item.span">
					<!-- 整个form-item完全自定义插槽 -->
					<slot v-if="item.slot" :name="item.prop"></slot>

					<el-form-item v-else :label="item.label" :prop="item.prop" :rules="item.rules" v-bind="item.itemAttrs">
						<template #label>
							<formItemLabel :item="item">
								<slot v-if="item.slotLabel" :name="`${item.prop}Label`"></slot>
							</formItemLabel>
						</template>

						<!-- 只自定义form-item中的内容插槽 -->
						<slot v-if="item.slotInput" :name="item.prop + 'Input'"></slot>

						<!-- 输入组 -->
						<template v-else-if="item.group">
							<div class="group-container">
								<el-row :gutter="10">
									<template v-for="(iptItem, iptIndex) in item.group">
										<el-col v-if="iptItem.show" :key="iptIndex" :span="iptItem.span || 24">
											<slot v-if="iptItem.slot" :name="iptItem.slotName || `${item.group}${iptIndex}`"></slot>
											<component
												:is="iptItem.type"
												v-else
												v-model="model[iptItem.prop]"
												class="group-item"
												v-bind="iptItem.attrs"
												v-on="iptItem.events"
											>
												<template v-if="iptItem.text">
													{{ iptItem.text }}
												</template>
											</component>
										</el-col>
									</template>
								</el-row>
							</div>
						</template>

						<!-- 单个输入组件 -->
						<component :is="item.type" v-else v-model="model[item.prop]" v-bind="{ ...item.attrs }" v-on="item.events">
							{{ item.text }}
						</component>
					</el-form-item>
				</el-col>
			</template>
		</el-row>
	</el-form>
</template>
<script>
import './assets/font/iconfont.css';
import formItemLabel from './packages/formComponents/formItemLabel.vue';
import { isString } from './utils/typeIs';
import { pascalCase } from './utils/util';
import BaseComps from './packages/baseFormItemComponents';

const baseCompList = Object.keys(BaseComps);
const components = {
	formItemLabel,
	...BaseComps
};
export default {
	name: 'lb-form',
	components,
	props: {
		formProps: {
			type: Object,
			default: () => ({
				labelPosition: 'top'
			})
		},
		formItems: {
			type: Array,
			default: () => []
		},
		model: {
			type: [Object, Array],
			default: () => ({})
		},
		rules: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {};
	},
	computed: {
		// 对formitems做数据处理，
		localFormItems() {
			return this.formItems.map(v => {
				const rules = this.handleFormItemRules(v);
				const res = {
					...v,
					show: this.handleShow(v),
					type: this.hanldeBaseComponent(v.type),
					group: v.group?.map(g => ({
						...g,
						type: this.hanldeBaseComponent(g.type),
						show: this.handleShow(g) // 默认展示
					}))
				};
				if (res.reset && !res.show) {
					this.handleReset(res);
				}
				if (rules.length) {
					Object.assign(res, { rules });
					if (rules.some(v => v.required) || this.rules[v.prop]?.some(v => v.required)) {
						res.required = true;
					}
				}
				return res;
			});
		},
		// 表单元素的渲染状态
		visibleMap() {
			return this.localFormItems.reduce((pre, v) => ({ ...pre, [v.name || v.prop]: v.show }), {});
		}
	},
	watch: {},
	mounted() {},
	methods: {
		validate(cb) {
			return this.$refs.form.validate(cb);
		},
		// 转换内置组件名称，由于input等标签为html内置标签，直接使用会重名，所以加上了前缀base-
		hanldeBaseComponent(compName) {
			if (baseCompList.includes(pascalCase(`Base-${compName}`))) return `base-${compName}`;
			return compName;
		},
		// 判断组件是否显示
		handleShow(item) {
			// 判断show属性
			const isSelfShow = Object.hasOwnProperty.call(item, 'show') ? item.show : true;
			// 如果有depend属性，判断depend的formitem是否显示
			if (item.depend) {
				const depend = this.formItems.find(v => v.name ?? v.prop === item.depend);
				if (depend) {
					const isDependShow = Object.hasOwnProperty.call(depend, 'show') ? depend.show : true;
					return isDependShow && isSelfShow;
				} else {
					console.error(`表单组件:${item.prop}的depend:${item.depend}不存在`);
				}
			}
			return isSelfShow;
		},
		// 如果配置了reset属性并且当前formitem是隐藏状态，则重置
		handleReset(item) {
			const resetValue = Object.hasOwnProperty.call(item, 'resetValue') ? item.resetValue : '';
			this.model[item.prop] = resetValue;
		},
		// 设置默认rules，如果未配置rule属性，但是又配置了required属性，会根据表单项类型设置默认的rule和提示语
		handleFormItemRules(item) {
			const iptList = ['input', 'el-input']; // 提示'请输入xxx'的表单项类型，待补充
			const selectList = ['select', 'el-select', 'radio', 'switch', 'el-radio', 'el-switch', 'el-cascader']; // 提示'请选择xxx'的类型，待补充
			const { required, type, label } = item;
			const iptTip = iptList.includes(type) ? '输入' : null;
			const selectTip = selectList.includes(type) ? '选择' : '选择/输入';
			const fullTip = isString(required) ? required : `请${iptTip || selectTip}${label}`;
			const defaultRequiredRule = required ? [{ required: true, message: fullTip }] : [];
			return [...(item.rules || []), ...defaultRequiredRule]; // 如果配置了rule，取rule，如果未配置，取默认配置
		}
	}
};
</script>
<style lang="scss" scoped>
.group-item + .group-item {
	margin-left: 20px;
}

::v-deep .el-form-item {
	.el-form-item__label::before {
		display: none;
	}

	&.is-required {
		.lb-form-item-label {
			display: flex;
			align-items: center;

			.lb-form__required {
				font-size: 14px;
				color: red;
				font-weight: bold;
				display: block;
				margin-left: 4px;
				transform: translateY(3px);
			}
		}
	}
}
</style>
