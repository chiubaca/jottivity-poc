module.exports = {
    pwa:{
        workboxPluginMode:"InjectManifest",
        workboxOptions:{
            swSrc: "src/service-worker.js"
        },
    },    
    pluginOptions: {
        webpackBundleAnalyzer: {
        openAnalyzer: false
            }
    },
    css:{
        loaderOptions:{
            sass:{
                data:`@import "@/assets/scss/common.scss";
                      @import "@/assets/scss/variables.scss";
                     `
            }
        }
    }
};