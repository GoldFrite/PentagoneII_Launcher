// Importation
const { shell, ipcMain, app } = require("electron");
const ipc = require("electron").ipcRenderer;
let axios = require('axios');
const Downloader = require('nodejs-file-downloader');
const fs = require('fs');
const os = require('os');
const package = require("./package.json")
// --------------------

// Avertissement console
console.log("%c⚠ Attends !", "color: red; font-size: 28px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
console.log("%cNe tape rien ici à moins que tu sois sûr(e) de ce que tu fais !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);");
console.log("%cCopier-coller quelque chose dictée par un inconnu risque fortement d'être une arnaque !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
// --------------------

// Constantes
const tallName = "Pentagone II"
const smallName = "pentagone2"

const appVersion = package.version
const currentOS = os.platform
const userName = os.userInfo().username
// --------------------

// Var
var updaterPath = null
var updaterName = null
var updaterLink = null
var lastVersion = null
// var isDl = 0
var errorVar = null
var counter = 3; // Pour essayer 3 fois de se connecter...
var checkCoInterval = setInterval(co, 1500) // ... toutes les 1,5 sec
var errorCo = 0 // ERreur de co à 0
// --------------------

// Var HTML
const loadingText = document.getElementById("loading")
const progressBar = document.getElementById("progress-bar")
const infoText = document.getElementById("info")
const errorText = document.getElementById("error")
const buttonFrom = document.getElementById("button-form")
// --------------------

// Base
errorText.style.opacity = 0
infoText.style.opacity = 0

document.getElementById("ver").innerHTML = "v" + appVersion
// --------------------

console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Current OS: " + currentOS, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Launcher version: " + appVersion, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

setTimeout(internetCo, 200)

var check = {
    method: 'post',
    url: 'http://minecraft-launcher.ml/servers/' + smallName + '/update/update.json',
};

async function internetCo() {

    await sleep(1000)
    loadingText.innerHTML = "Connexion à Internet..."
    errorText.innerHTML = ""
    buttonFrom.innerHTML = ""
    loadingText.style.opacity = 1

    co();
}

function co() {
    if (counter == 0) {
        endCo()
    } else {
        axios(check)
            .then(function (response) {
                if (response.code === 200) {
                    console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Connexion successful.", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                }
                counter = 0 // Terminer la boucle
                errorCo = 0 // Sans erreur
            })
            .catch(function (error) {
                console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Connexion failed! Retrying. " + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                counter--; // On enleve 1 pour répéter la boucle
                errorCo = 1 // Avec erreur
            });
    }
}

async function endCo() {
    clearInterval(checkCoInterval)
    if (errorCo === 0) { // Si pas d'erreur
        checkUpdate() // Lancer le Bootstrap
    } else { // Sinon, avertir
        loadingText.style.opacity = 0
        console.error("%c[Launcher]" + "%c [Bootstrap]" + "%c Connexion failed! Check your Internet connexion.", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
        // setTimeout(change, 1000)

        await sleep(1000)
        loadingText.innerHTML = "Echec de la connexion."
        errorText.innerHTML = "Impossible de se connecter à Internet. Vérifiez votre connexion."
        buttonFrom.innerHTML = "<button class='button' id='retry-button'>Réessayer</button>"
        loadingText.style.opacity = 1
        errorText.style.opacity = 1
        buttonFrom.style.opacity = 1

        await sleep(1000)
        document.getElementById("retry-button").addEventListener("click", () => {
            loadingText.style.opacity = 0
            errorText.style.opacity = 0
            buttonFrom.style.opacity = 0

            counter = 3
            errorCo = 0
            checkCoInterval = setInterval(co, 1500) // ... toutes les 1,5 sec
            setTimeout(internetCo, 1000)
        })
    }

}

async function checkUpdate() {

    loadingText.style.opacity = 0

    await sleep(1000)
    loadingText.innerHTML = "Recherche de Mises à Jour..."
    loadingText.style.opacity = 1


    axios(check)
        .then(function (response) {

            lastVersion = response.data.last
            if (os.platform == "win32") {
                updaterLink = response.data.linkWin
            } else if (os.platform == "darwin") {
                updaterLink = response.data.linkMac
            }
            console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Last version: " + lastVersion + ". Current version: " + appVersion, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

            if (appVersion === lastVersion) {
                console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Launcher up to date.", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                setTimeout(index, 2000)
            } else {
                console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c A new version is available.", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                setTimeout(needUpdate, 2000)
            }

        })
        .catch(function (error) {
            console.log(error);
        })
}

async function index() { // Si le Launcher est à Jour
    loadingText.style.opacity = 0

    await sleep(1000)
    loadingText.innerHTML = "Préparation du Launcher..."
    loadingText.style.opacity = 1

    await sleep(500)
    loadingText.style.opacity = 0
    document.getElementById("title").style.opacity = 0
    document.getElementById("gif").style.opacity = 0


    await sleep(500)
    if (localStorage.getItem("accessToken")) {

        var loginToken = {
            url: "https://pentagone2.fr/api/auth/verify",
            method: "POST",
            timeout: 0,
            data: {
                access_token: localStorage.getItem("accessToken")
            }
        }

        axios(loginToken)
            .then(function (response) {

                console.log("%c[Launcher]" + "%c [Connexion]" + "%c Connexion successful", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

                console.log(response);

                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("uuid", response.data.uuid);

                ipc.send("login")

            })
            .catch(function (error) {
                console.log("%c[Launcher]" + "%c [Connexion]" + "%c Cannot connect with accessToken : " + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                ipc.send("noLogged")
            })

    } else {
        ipc.send("noLogged")
    }

}

async function needUpdate() { // Si le launcher n'est pas à Jour

    if (os.platform == "win32") {
        updaterPath = os.homedir + "/AppData/Local/Temp/"
        updaterName = smallName + "-updater.exe"
    } else if (os.platform == "darwin") {
        updaterPath = "users/" + userName + "/Desktop/"
        updaterName = smallName + "-updater.dmg"
    }

    console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Downloading path: file:///" + updaterPath, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

    loadingText.style.opacity = 0

    await sleep(1000)
    loadingText.innerHTML = "Téléchargement de la Mise à Jour..."
    loadingText.style.opacity = 1
    infoText.innerHTML = "La Mise à Jour est en cours de téléchargement. Une fois le Launcher à jour, il sera peut-être nécessaire de la paramétrer de nouveau.<br>"
    infoText.style.opacity = 1
    progressBar.style.opacity = 1


    const launcherUpdate = new Downloader({

        url: updaterLink,
        directory: updaterPath,
        fileName: updaterName,
        cloneFiles: false,

        onProgress: function (percentage) {
            progressBar.max = "100"
            if (percentage >= progressBar.value) {
                progressBar.value = percentage
            }
        }

    })

    try {

        await launcherUpdate.download()
            .then(() => {
                then()
                async function then() {

                    loadingText.style.opacity = 0
                    progressBar.style.opacity = 0
                    infoText.style.opacity = 0
                    buttonFrom.style.opacity = 0
                    console.log("%c[Launcher]" + "%c [Bootstrap]" + "%c Download complete!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

                    await sleep(1000)
                    loadingText.innerHTML = "Téléchargement terminé."
                    infoText.innerHTML = "L'installation va débuter dans quelques instants !"
                    buttonFrom.innerHTML = ""
                    loadingText.style.opacity = 1
                    infoText.style.opacity = 1

                    await sleep(3000)
                    if (os.platform == "win32") {

                        fs.writeFile(os.homedir + "/AppData/Local/Temp/update.bat",
                            `@echo off
echo Fermeture du Launcher...
taskkill /Im "${tallName} Launcher.exe"
taskkill /Im "electron.exe"
echo Launcher ferme.
echo Lancement du programme d'installation...
cd %temp%
start ${smallName}-updater.exe
echo Pregramme d'installation lance.
echo Fermeture de la console...`, (err) => {
                            if (err) throw err
                        })
                        shell.openExternal(os.homedir + "/AppData/Local/Temp/update.bat")

                    } else if (os.platform == "darwin") {

                        buttonFrom.innerHTML = "Vous semblez être sur macOS.<br>Veuillez fermer le Launcher puis ouvrir manuellement l'exécutable de Mise à Jour ; celui-ci se trouve sur votre Bureau (Desktop), et se nomme <i>" + smallName + "-updater.dmg</i>."

                    } else {

                        buttonFrom.innerHTML = "Vous semblez être sur Linux.<br>Veuillez fermer le Launcher puis ouvrir manuellement l'exécutable de Mise à Jour ; celui-ci se trouve dans votre dossier personnel (users/votrenomdutilisater)."

                    }

                }

            })

    } catch (err) {

        loadingText.style.opacity = 0
        infoText.style.opacity = 0
        errorText.style.opacity = 0
        progressBar.style.opacity = 0
        console.error("%c[Launcher]" + "%c [Bootstrap]" + "%c Download failed! " + errorVar, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

        await sleep(1000)
        loadingText.innerHTML = "Echec du téléchargement."
        infoText.innerHTML = ""
        errorText.innerHTML = "Impossible de télécharger la Mise à Jour.<br>Sous Windows, cela peut être dû au fait que votre lecteur principal n'est pas \"C:\\\""
        buttonFrom.innerHTML = "<button class='button' id='retry-button'>Réessayer</button><br><br style=\"font-size: 10px\"><a href=\""
            + updaterLink + "\" target=\"_blank\" style=\"margin-top: 10px;\">Télécharger manuellement</a>"
        loadingText.style.opacity = 1
        errorText.style.opacity = 1
        progressBar.style.opacity = 0
    }
    document.getElementById("retry-button").addEventListener("click", () => {
        internetCo()
    })

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}