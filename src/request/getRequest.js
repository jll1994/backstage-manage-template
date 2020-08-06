import service from "./server";
import qs from "qs";
function myServer() {
  this.server = service;
}
myServer.prototype.parseRouter = function(name, urlOb) {
  let ob = (this[name] = {});
  console.log(urlOb);
  Object.keys(urlOb).forEach((item) => {
    console.log(ob);
    console.log(item);
    // ob[item] = this.sendMes().bind(this, name, item, urlOb[item]);
  });
};
// myServer.prototype.sendMes = function(moduleName, name, url, config) {
//   config = config || {};
//   let type = config.type || "get";
//   let data = config.data || {};
//   let self = this;
//   let before = function(mes) {};
//   let defaultFn = function() {};
//   let success = config.success || defaultFn;
//   let callback = function(res) {
//     success(res, defaultFn);
//   };
//   let state = {
//     get: function() {
//       let urlQs = url + "?" + qs.stringify(data);
//       service
//         .get(urlQs)
//         .then(before)
//         .then(callback);
//     },
//     post: function() {
//       service
//         .post(url, data)
//         .then(before)
//         .then(callback);
//     },
//   };
//   state[type]();
// };
export default new myServer();
