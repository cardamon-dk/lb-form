export const isString = val => {
	return Object.prototype.toString.call(val) === '[object String]';
};
export const isBoolean = val => {
	return Object.prototype.toString.call(val) === '[object Boolean]';
};

export default {
	isString,
	isBoolean
};
