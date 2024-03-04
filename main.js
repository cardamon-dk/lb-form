import lbForm from './index.vue';
export { default as lbForm } from './index';

//生成一个包含拓展组件的实例用于局部注册
export function addComponentsOnce(components) {
	return {
		...lbForm,
		components: { ...lbForm.components, ...components }
	};
}

export default {
	install(Vue, options = {}) {
		const { extComponents = {} } = options;
		Vue.component('lbForm', { ...lbForm, components: { ...lbForm.components, ...extComponents } });
	}
};
