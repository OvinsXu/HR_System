const path = require('path');

module.exports = {
    webpack: {
        configure: (
            webpackConfig, {paths}
        ) => {
            paths.appBuild = '../Server/src/main/resources/static'
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, paths.appBuild), // 修改输出文件目录
            }
            return webpackConfig
        }
    }
}



