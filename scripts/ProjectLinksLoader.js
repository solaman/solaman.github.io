/**
 * Created by Solaman on 6/11/2016.
 */
(function(resources){
    var projectNavigationElement = document.getElementById("project-navigation");
    var projectListElement = projectNavigationElement.getElementsByTagName("ul")[0];

    resources.forEach(function(resource) {
       var listElement = document.createElement("li");
       var linkElement = document.createElement("a");
       linkElement.style.backgroundImage = "url('" + resource + "')";

       listElement.appendChild(linkElement);
       projectListElement.appendChild(listElement);
    });

})(["resources/ChessApp.png", "resources/Room8.png"]);