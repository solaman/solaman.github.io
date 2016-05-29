/**
 * Created by Solaman on 5/26/2016.
 */
var doodleNames = ['childrensday11-hp.png', 'flower.jpg', 'marionettes.png', 'wrench.jpg', 'worldFair.html'];

var doodleContainerElement = document.getElementById("doodle-container");

(function() {
    var currentDoodleIndex = 0;
    var doodleURL = "resources/images/";
    var doodleImageElement = doodleContainerElement.getElementsByClassName("displayed-doodle")[0];
    var doodleIFrameElement = document.createElement("iframe");
    doodleIFrameElement.classList.add("displayed-doodle");

    var swappingDoodle = doodleImageElement;

    var swapFrom = 0;
    doodleImageElement.addEventListener("load", function() {
       this.style["top"] = (150 - this.height/2) + "px";
       doodleEnter(swapFrom);
    });
    doodleIFrameElement.addEventListener("load", function() {
        doodleEnter(swapFrom);
    });

    var prevLink = doodleContainerElement.getElementsByClassName("prev-doodle")[0];
    var nextLink = doodleContainerElement.getElementsByClassName("next-doodle")[0];

    var doodleEnter = function(doodleDelta) {
        if(doodleDelta === 0) {
            return;
        }
        resetDoodlePosition();
        var distanceToStart = (swappingDoodle.width + swappingDoodle.clientWidth)/2;
        var numberOfFrames = 60;
        var horizontalPositionFrameDelta = distanceToStart/numberOfFrames;
        var horizontalPositionProperty = null;
        if(doodleDelta > 0) {
            horizontalPositionProperty = "right";
        } else {
            horizontalPositionProperty = "left";
        }

        swappingDoodle.style[horizontalPositionProperty] = distanceToStart + "px";
        swappingDoodle.style["opacity"] = 1;
        var interval = setInterval(doodleEnteringAnimation, 5);
        var distanceFromStart = distanceToStart;
        function doodleEnteringAnimation() {
            if(distanceFromStart <= 0) {
                swappingDoodle.style[horizontalPositionProperty] = 0 + "px";
                clearInterval(interval);
                prevLink.classList.remove("disabled");
                nextLink.classList.remove("disabled");
            } else {
                distanceFromStart -= horizontalPositionFrameDelta;
                swappingDoodle.style[horizontalPositionProperty] = distanceFromStart + "px";
            }
        }
    };

    function resetDoodlePosition() {
        swappingDoodle.style["left"] = null;
        swappingDoodle.style["right"] = null;
    }

    var doodleExit = function(pageDelta){
        resetDoodlePosition();
        var distanceToCover = (swappingDoodle.width + doodleContainerElement.clientWidth)/2;
        var numberOfFrames = 60;
        var horizontalPositionFrameDelta = distanceToCover/numberOfFrames;
        var horizontalPositionProperty = null;
        if(pageDelta > 0) {
            horizontalPositionProperty = "left";
        } else {
            horizontalPositionProperty = "right";
        }

        var interval = setInterval(doodleLeavingAnimation, 5);

        var coveredDistance = 0;
        function doodleLeavingAnimation() {
            if (coveredDistance >= distanceToCover) {
                clearInterval(interval);
                swapDoodles(pageDelta);
            } else {
                coveredDistance += horizontalPositionFrameDelta;
                swappingDoodle.style[horizontalPositionProperty] = coveredDistance + "px";
            }
        }
    };

    var swapDoodles = function(pageDelta) {
        if(doodleNames[currentDoodleIndex] === 'worldFair.html') {
            doodleContainerElement.removeChild(doodleIFrameElement);
            doodleContainerElement.appendChild(doodleImageElement);
            swappingDoodle = doodleImageElement;
        }

        currentDoodleIndex = ((currentDoodleIndex + pageDelta) % doodleNames.length + doodleNames.length ) % doodleNames.length;
        swappingDoodle.style["opacity"] = 0;
        swapFrom = pageDelta;
        if( doodleNames[currentDoodleIndex] === 'worldFair.html') {
            doodleContainerElement.removeChild(doodleImageElement);
            doodleContainerElement.appendChild(doodleIFrameElement);
            swappingDoodle = doodleIFrameElement;
            doodleIFrameElement.setAttribute("src", doodleNames[currentDoodleIndex] );

        } else {
            doodleImageElement.setAttribute("src", doodleURL + doodleNames[currentDoodleIndex]);
        }
    };

    prevLink.addEventListener("click", function() {
        if(prevLink.classList.contains("disabled")){
         return;
        }
        prevLink.classList.add("disabled");
        nextLink.classList.add("disabled");
        doodleExit(-1);
    });

    nextLink.addEventListener("click", function() {
        if(nextLink.classList.contains("disabled")){
            return;
        }
        prevLink.classList.add("disabled");
        nextLink.classList.add("disabled");
        doodleExit(1);
    });
})();

