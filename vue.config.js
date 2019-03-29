module.exports = {
    pwa:{
        workboxPluginMode:"InjectManifest",
        workboxOptions:{
            swSrc: "src/service-worker.js"
        },
    },    
    pluginOptions: {
        webpackBundleAnalyzer: {
        openAnalyzer: true
            }
    }
};