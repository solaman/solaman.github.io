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
   var NUMBER_OF_HEADER_RESOURCES = 3;
   var resourcesLoadedCount = 0;


    /*
     add appropriate targets and event listeners.
    */
    (function() {
        var logoElement = bannerElement.getElementsByClassName("logo")[0];
        logoElement.addEventListener("load", resourceLoaded);
        logoElement.src =  "resources/PersonalWebsiteHeader.svg";

        var photoRimElement = bannerElement.getElementsByClassName("photo-rim")[0];
        photoRimElement.addEventListener("load", resourceLoaded);
        photoRimElement.src = "resources/PersonalWebsiteHeaderPhotoRim.svg";

        var photoElement = bannerElement.getElementsByClassName("photo")[0];
        photoElement.addEventListener("load", resourceLoaded);
        photoElement.src = "resources/profile_picture.png";

    })();

    function resourceLoaded() {
     resourcesLoadedCount++;
     if(resourcesLoadedCount === NUMBER_OF_HEADER_RESOURCES) {
        revealPage();
     }
    }

   /*
   As of now, we only remove a class, but if it comes to the point where we do more,
   we might want to enclose some variables to make this call idempotent.
    */
   var revealPage = (function() {
       var bodyElement = document.getElementsByTagName("body")[0];

       return function() {
           bodyElement.classList.remove("unrevealed");
       }
   })();
})();
