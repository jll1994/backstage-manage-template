const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@images", resolve("src/assets/images"))
      .set("@views", resolve("src/views"))
      .set("@components", resolve("src/components"));
  },
  configureWebpack: (config) => {
    const plugins = [];
    if (isProd) {
      // 配置webpack 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 4096, // 超过4kb压缩
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.join(__dirname, "./src/assets/styles/variable.less")],
    },
  },
};
