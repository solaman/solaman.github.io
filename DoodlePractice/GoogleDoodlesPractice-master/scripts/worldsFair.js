/**
 * Created by Solaman on 5/28/2016.
 */
 var PADDING = 10;
(function() {
   var doodleContainerElement = document.getElementById("doodle-container").getElementsByClassName("overlay")[0];
   var lookingGlassElement = document.getElementById("looking-glass");

   var bigDoodleContainerElement = document.getElementById("big-doodle-container-mid");
   var bigDoodleElement = bigDoodleContainerElement.getElementsByTagName("img")[0];
   var doodleRatioWidth = (bigDoodleElement.naturalWidth/document.getElementById("base-doodle").clientWidth);
   var doodleRatioHeight = (bigDoodleElement.naturalHeight/document.getElementById("base-doodle").clientHeight);


   function moveLookingGlass(event) {
       var x = event.clientX;
       var y = event.clientY;

       lookingGlassElement.style["top"] = (y-100) + "px";
       lookingGlassElement.style["left"] = (x- 100) + "px";
   }

   function moveMagnifiedDoodle(event) {
       var x = event.clientX;
       var y = event.clientY;

       var fixedDeltaX = (x-PADDING)*doodleRatioWidth/2;
       var fixedDeltaY = (y-PADDING)*doodleRatioHeight/2;

       var lookingGlassX = (x - 100);
       var lookingGlassY = (y - 100);
       bigDoodleContainerElement.style["top"] = lookingGlassY + 2 + "px";
       bigDoodleContainerElement.style["left"] = lookingGlassX + 2 + "px";

       bigDoodleElement.style["top"] = PADDING - lookingGlassY - fixedDeltaY + "px";
       bigDoodleElement.style["left"] = PADDING - lookingGlassX - fixedDeltaX + "px";

   }

   doodleContainerElement.addEventListener("mouseenter", function(event) {
         lookingGlassElement.classList.add("active");

         bigDoodleContainerElement.classList.add("active");
         doodleContainerElement.addEventListener("mousemove", moveLookingGlass);
         doodleContainerElement.addEventListener("mousemove", moveMagnifiedDoodle);
   });

   doodleContainerElement.addEventListener("mouseleave", function(event) {
        lookingGlassElement.classList.remove("active");
        bigDoodleContainerElement.classList.remove("active");
        doodleContainerElement.removeEventListener("mousemove", moveLookingGlass);
       doodleContainerElement.removeEventListener("mousemove", moveMagnifiedDoodle);
   });
})();