const filesToCache = [

]

const offlineURL= '/offline.html';


// listen for install event
// the install event is a good time to be caching assets
self.addEventListener('install', function(event){
    //perform some task
    console.log("Service Worker installed!", event)
})

// listen for activate event
self.addEventListener('activate', function(event){
    //Clean old app cache if there is one
    console.log("activating new service worker" , event)
    const cacheWhiteList = [staticCacheName];

    event.waitUntil(
        caches.keys().then(function(cacheNames){
            cacheNames.map(function(cacheName){
                if(cacheWhiteList.indexOf(cacheName) === -1){
                    return caches.delete(cacheName);
                }
            })
        })
    )

})

//intercept network requests
self.addEventListener('fetch', function(event){
    console.log('Fetching: ' , event.request.url)

    event.respondWith(
        caches.open('dynamic-cache')
        .then(function(cache){
            return cache.match(event.request)
            .then(function(response){
                return response || fetch(event.request)
                .then(function(response){
                    cache.put(event.request , response.clone());
                    return response;
                })
            })
        })
        .catch(function(error){
            //TODO: respond with offline pages
            console.log("Error, " , error)
            return caches.match(offlineURL);
        })
    )
})