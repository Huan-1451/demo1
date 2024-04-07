import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'; // 这个path用到了上面安装的@types/node
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver'; // 按需加载vant组件
import { visualizer } from 'rollup-plugin-visualizer';
import pxtoViewPort from 'postcss-px-to-viewport';
import autoprefixer from 'autoprefixer';
import viteCompression from 'vite-plugin-compression'; // 压缩打包

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      { ...viteCompression(), apply: 'build' },
      visualizer({ open: true }), // 分析生产包的大小
    ],
    envDir: 'env',
    //这里进行配置别名
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'), // @代替src
        '#': resolve(__dirname, './types'), // #代替types
        asserts: resolve(__dirname, './src/assets'),
        views: resolve(__dirname, './src/views'),
        request: resolve(__dirname, './src/request'),
        components: resolve(__dirname, './src/components'),
        utils: resolve(__dirname, './src/utils'),
      },
      extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      // open: false,
      // https: false,
      // // 设置https代理
      // proxy: {
      //   [config.VITE_PROXY_DOMAIN]: {
      //     target: config.VITE_BASE_URL,
      //     changeOrigin: true,
      //     ws: false,
      //     rewrite: (path) => path.replace(/^\/api/, config.VITE_PROXY_DOMAIN),
      //   },
      // },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'], // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
            grid: true,
          }),
          // 对非Vant中的样式进行转换
          pxtoViewPort({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: [], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules\/vant/i], // 设置忽略文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
          // 仅对Vant中的样式进行转换
          pxtoViewPort({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: [], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            include: [/node_modules\/vant/i], // 设置目标文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          // additionalData: `
          //   @import "@/assets/styles/index.scss";
          //   @import "@/assets/styles/mixin.scss";
          // `,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
