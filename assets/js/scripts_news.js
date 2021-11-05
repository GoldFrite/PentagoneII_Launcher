// Importation des modules --------------------------------
const { shell, ipcMain } = require("electron");
const ipc = require("electron").ipcRenderer;
var axios = require('axios');
const os = require('os');
// ---------------------------------------------------------


var backhomeButton = document.getElementById("backhome-button")
backhomeButton.addEventListener("click", () => {
    ipc.send("backapp")
})



let news = document.getElementById("news")

var config = {
    method: 'post',
    url: 'http://minecraft-launcher.ml/servers/pentagone2/news/news.json',
    headers: {},
};

axios(config)
    .then(function (response) {

        console.log(response);

        var newsLengthJSON = JSON.stringify(response.data.news.length) // nbre de news

        for (let newsLength = 0; newsLength < newsLengthJSON; newsLength++) {

            var newsTitle = response.data.news[newsLength].title
            var newsBody = response.data.news[newsLength].body
            var newsImage = response.data.news[newsLength].img
            var newsAuthor = response.data.news[newsLength].author
            var newsDate = response.data.news[newsLength].date

            if (newsImage === null) {
                news.innerHTML += "<div class='news-title-form'><p class='news-title'><b>" + newsTitle + "</b></p><div class='news-body-form'><p style='line-height: 25px; margin: 0px;'>" + newsBody + "</p></div><p class='news-date'>Par " + newsAuthor + ", le " + newsDate + "</p></div>"
            } else {
                news.innerHTML += "<div class='news-title-form'><p class='news-title'><b>" + newsTitle + "</b></p><div class='news-body-form'><p style='line-height: 25px; margin: 0px;'>" + newsBody + "</p><img class='news-img' src='" + newsImage + "' alt='image'></div><p class='news-date'>Par " + newsAuthor + ", le " + newsDate + "</p></div>"
            }

        }

    })
    .catch(function (error) {
        console.log(error);
        news.innerHTML = "<p style='margin-bottom: 0px; color: #c74930'>Une erreur est survenue lors du chargement des news. Essayez plus tard."
    });