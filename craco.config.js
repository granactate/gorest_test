const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                          '@primary-color': '#243356',
                          '@success-color': '#d7d9db',
                          '@error-color': '#ed1f24',
                          '@text-color-secondary': '#808080',
                          '@menu-dark-color': '#000000',
                          '@layout-body-background': '#d7d9db'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};