/**
 * 路由自动加载（不包含子路由的处理逻辑）
 */
let files = require.context("../views", true, /\.vue$/);
let configRouters = [];
files.keys().forEach((file) => {
  let fileName = file.split(".")[1];
  let config = files(file).default;
  if (fileName.indexOf("Home") > -1) {
    configRouters.push({
      path: "/",
      component: config,
    });
  } else {
    configRouters.push({
      path: fileName,
      component: config,
    });
  }
});
export default configRouters;
