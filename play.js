function charSelect() {
    window.location = "charSelect.html";
}

function learnToPlay() {
    window.location = "LearnToPlay.html";
}


// Executed when DOM is loaded
$(document).ready(function() {
    // Executed when select is changed
    $("select").on('change',function() {
        var x = this.selectedIndex;

        if (x == "") {
            $("#submit-button").hide();
        } else {
            $("#submit-button").show();
        }
    });

    // It must not be visible at first time
    $("#submit-button").css("display","none");
}); 


var charText;
var photo;

var PUBLIC_KEY = "";
var PRIV_KEY = ""
var ts = new Date().getTime();


function getCharacter() {

    var text = document.getElementById("charSelect");
    charText = text.options[text.selectedIndex].value.replace(" ", "%20");
    console.log(text.options[text.selectedIndex].value);

    var url = "https://gateway.marvel.com:443/v1/public/characters?name=" + charText;

    var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    $.getJSON(url, {
        ts : ts,
        apikey: PUBLIC_KEY,
        hash: hash
    }).done(function(data) {
        console.log(data);


        desc = JSON.stringify(data.data.results[0].description, null,2);
        document.getElementById("desc").innerHTML = desc.substring(1, desc.length - 1);

        photo = JSON.stringify(data.data.results[0].thumbnail.path, null, 2);
        imgString = photo.substring(1, photo.length - 1) + "/portrait_medium.jpg";
        document.getElementById("photo").src = photo.substring(1, photo.length - 1) + "/portrait_incredible.jpg";

        imgUrl = photo.substring(1, photo.length - 1) + "/portrait_medium.jpg";


        sessionStorage.setItem("char", charText);
        sessionStorage.setItem("imag", imgString);
        

    }).fail(function(err) {
        console.log(err);
    });
};




function starter() {
    document.createElement("image");
    window.location = "startGame.html";

}


