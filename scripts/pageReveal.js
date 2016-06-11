/**
 * Created by Solaman on 5/30/2016.
 */
/*
Because we have multiple heavy resources in the header, it is very likely
that different parts of the header will be painted at different times.
To account for this, we hide the page until all header content is loaded.
 */

(function() {
   var bannerElement = document.getElementById("website-banner");
    var resourcesToLoad = [{
        "element" : bannerElement.getElementsByClassName("photo")[0],
        "src" :  "resources/profile_picture.png"
    }];
   var loadedResourcesCount = resourcesToLoad.length;

   var bodyElement = document.getElementsByTagName("body")[0];
   var resourceLoaded = function(event) {
       loadedResourcesCount--;
       if(loadedResourcesCount === 0) {
           bodyElement.classList.remove("unrevealed");
       }
   };



   resourcesToLoad.forEach(function(loadPair) {
    loadPair.element.addEventListener("load", resourceLoaded);
    loadPair.element.src = loadPair.src;
   });
})();
