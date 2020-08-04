/**
 * 判断类型 String Number Array Object
 */
export const isType = (type) => (obj) => {
  return Object.prototype.toString.call(obj) === "[object " + type + "]";
};
