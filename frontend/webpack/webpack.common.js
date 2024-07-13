const glob = require("glob");
const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

const getEntryObject = () => {
  const entries = {};
  // for javascript/typescript entry file
  glob
    .sync(Path.join(__dirname, "../src/application/*.{js,ts}"))
    .forEach((path) => {
      const name = Path.basename(path);
      const extension = Path.extname(path);
      const entryName = name.replace(extension, "");
      if (entryName in entries) {
        throw new Error(`Entry file conflict: ${entryName}`);
      }
      entries[entryName] = path;
    });
  return entries;
};
module.exports = {
  entry: getEntryObject(),
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js",
    publicPath: "/static/",
    assetModuleFilename: "[path][name][ext]",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },

    runtimeChunk: "single",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: Path.resolve(__dirname, "../vendors"), to: "vendors" },
      ],
    }),
    new WebpackAssetsManifest({
      entrypoints: true,
      output: "manifest.json",
      writeToDisk: true,
      publicPath: true,
    }),
		new FaviconsWebpackPlugin({
    // Your source logo (required)
    logo: './frontend/vendors/images/favicon.png',
    // Prefix path for generated assets
    prefix: 'assets/',
    devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
    // Favicons configuration options. Read more on: https://github.com/evilebottnawi/favicons#usage
    favicons: {
      appName: 'Smart RPI',              // Your application's name. `string`
      icons: {
        favicons: true,             // Create regular favicons. `boolean`
        android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background }`
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background }`
        appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background }`
        coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background }`
        firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
        windows: false,              // Create Windows 8 tile icons. `boolean` or `{ background }`
        yandex: false                // Create Yandex browser icon. `boolean` or `{ background }`
      }
    },
  }),
  new HtmlWebpackPlugin(),
	new InjectManifest({
    swSrc: '/frontend/src/sw.js',
  }),
],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: "asset",
      },
    ],
  },
};
