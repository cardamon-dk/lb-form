const requireComponent = require.context('./', false, /\w+\.vue$/);

let BaseComps = {};

requireComponent.keys().map(fileName => {
	let comp = requireComponent(fileName).default;
	let compName = fileName.replace(/(\.\/)|(\.vue)/g, '');
	BaseComps[`Base${compName.replace(compName[0], compName[0].toUpperCase())}`] = comp;
});

export default BaseComps;
