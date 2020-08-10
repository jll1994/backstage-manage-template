/**
 * 向上查找最近指定的组件
 * @param {*上下文} context
 * @param {*组件名} componentName
 */
function findComponentDownward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
export { findComponentDownward };
