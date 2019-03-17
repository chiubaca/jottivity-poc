self.__precacheManifest = [].concat(self.__precacheManifest || []); //add other resources to cache here
// workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

//install new service worker if message is received to do so
self.addEventListener("message" , function(msg){
  if (msg.data.action === "skipWaiting"){
    self.skipWaiting()
  }
})

if(workbox){
    console.log("workbox is loaded!") 
    workbox.routing.registerRoute(
        /(https:\/\/*micro-blog.*)(?:json)/,
        workbox.strategies.networkFirst({
          cacheName: 'api-cache',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
          ]
        })
      );

}else{
    console.log("workbox not loaded")
}