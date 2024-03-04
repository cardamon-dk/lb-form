/**
 * @param  {string} str 需要转换的字符串
 * @return { string }
 * 例：date-picker => datePicker
 */
export function pascalCase(str) {
	let reg = /-(\w)/g;
	// replace函数第二个参数可以接收函数，参数如下
	// $为全局匹配的内容，$1第一个表达式匹配的内容，$2第二个表达式匹配的内容......
	return str.replace(reg, function($, $1) {
		//$1为表达式匹配到的内容，在这里即为 (-f || -n)
		return $1.toUpperCase();
	});
}
