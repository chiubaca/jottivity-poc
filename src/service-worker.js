self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

if(workbox){
    console.log("workbox is loaded!")
    workbox.precaching.precacheAndRoute([]);
    
    workbox.routing.registerRoute(
        /(.*)\.(?:json)/,
        workbox.strategies.networkFirst({
          cacheName: 'json-cache',
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