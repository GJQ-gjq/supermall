module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // @表示src
                'views': '@/views',
                'components': '@/components',
                'network': '@/network',
                'common': '@/common',
                'assets': '@/assets',
            }
        }
    }
}