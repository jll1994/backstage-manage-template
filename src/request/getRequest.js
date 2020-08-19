/**
 * 实现功能：
 * 1.接口api化
 * 2.请求自动绑定数据
 * 3.防止重复提交
 */
import service from "./server";
import qs from "qs";
function myServer() {
  this.server = service;
  this.nowHandle = null;
  // this.state = "ready"; // 并行请求问题
}
// 利用vue每一个组件都是vue的实例化对象的特性，都是引用类型
// 为了拿到当前vue实例化对象
myServer.prototype.v = function(ob) {
  this.nowHandle = ob;
  return this;
};
myServer.prototype.parseRouter = function(name, urlOb) {
  let ob = (this[name] = {});
  Object.keys(urlOb).forEach((item) => {
    ob[item] = this.sendMes.bind(this, name, item, urlOb[item]);
    // 应该阻止的某个方法的重复提交
    ob[item].state = "ready";
  });
};
// 发请求操作
myServer.prototype.sendMes = function(moduleName, name, url, config) {
  // config 用户自定义配置
  config = config || {};
  let type = config.type || "get";
  let data = config.data || {};
  let self = this;
  let bindName = config.bindName || name;
  // 响应数据处理前-响应数据处理-响应数据处理后
  let before = function(mes) {
    // self.state = "ready";
    self[moduleName][name] = "ready";
  };
  // 默认的数据处理方式
  let defaultFn = function(mes) {
    self.nowHandle[bindName] = mes.data;
  };
  let success = config.success || defaultFn;
  let callback = function(res) {
    success(res, defaultFn);
  };
  let state = {
    get: function() {
      let urlQs = url + "?" + qs.stringify(data);
      service
        .get(urlQs)
        .then(before)
        .then(callback);
    },
    post: function() {
      service
        .post(url, data)
        .then(before)
        .then(callback);
    },
  };
  // 防止重复提交操作(问题：并行发送请求的时候)
  // if (this.state === "ready") {
  //   state[type]();
  //   this.state = "pending";
  // }
  if (self[moduleName][name] === "ready") {
    self[moduleName][name] = "pending";
    state[type]();
  }
};
export default new myServer();



