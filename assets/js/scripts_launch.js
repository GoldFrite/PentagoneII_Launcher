// Importations
const { Client, Authenticator } = require("minecraft-launcher-core");
const launcher = new Client();
const ipc = require("electron").ipcRenderer;
const os = require("os");
const fs = require("fs");
let axios = require('axios');
const Downloader = require('nodejs-file-downloader');
const decompress = require("decompress");
// --------------------

// Var HTML
const progressBar = document.getElementById("progress-bar")
const loadingText = document.getElementById("loading")
const errorText = document.getElementById("error")
// --------------------

// Var & Const
const gameFileName = ".pentagone2" ///// A MODIFIER avec <.nomduserveur>
const smallName = "pentagone2" ////// A MODIFIER avec <nomduserveur>
var modpackLink = null
var fullData
var xVal = 0
// var isDl = 0
// var errorVar
let launchOpts
var modpack = {
    method: 'post',
    url: 'http://minecraft-launcher.medianewsonline.com/servers/' + smallName + '/update/update.json',
};
// --------------------

axios(modpack)
    .then(function (response) {
        modpackLink = response.data.game
    })
    .catch(function (error) {
        console.log("%c[Launcher]" + "%c [Updater]" + "%c Unable to load the Modpack ZIP file : " + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
    })

ipc.on("data", (event, data) => {

    fullData = data

    if (!fs.existsSync(fullData + "/" + gameFileName + "/")) {
        fs.mkdirSync(fullData.appData + "/" + gameFileName + "/", { recursive: true })
        fs.mkdirSync(fullData.appData + "/" + gameFileName + "/runtime/", { recursive: true })
    }

    try { // Suppr le contenu du dossier mods s'il existe
        fs.readdir(fullData.appData + "/" + gameFileName + "/mods/", (err, files) => {
            try {
                files.forEach(file => {
                    fs.unlink(fullData.appData + "/" + gameFileName + "/mods/" + file, (err) => { });
                })
            } catch (error) { }
        })
    } catch (error) { }


    try {
        fs.unlink(fullData.appData + "/" + gameFileName + "/forge.jar", (err) => { })
    } catch (error) { }


    /*if (os.platform == "win32") { // Si l'OS est Win, télécharger JAVA s'il n'existe pas
        fs.access(fullData.appData + "/" + gameFileName + "/runtime/bin/java.exe", (err) => {
            if (err) {
                changeDlJava();
            }
        })
    } else {
        setTimeout(launch, 3000)
    }*/


    if (os.platform == "win32") { // Opts pour Win

        if (!fs.existsSync(fullData.appData + "/" + gameFileName + "/runtime")) {
            fs.mkdirSync(fullData.appData + "/" + gameFileName + "/runtime/", { recursive: true })
            changeDlJava()
        } else if (!fs.existsSync(fullData.appData + "/" + gameFileName + "/runtime/bin/java.exe")) {
            changeDlJava()
        } else {
            setTimeout(launch, 3000)
        }

        launchOpts = {
            javaPath: fullData.appData + "/" + gameFileName + "/runtime/bin/java.exe",
            authorization: Authenticator.getAuth(localStorage.getItem("username")),
            root: fullData.appData + "/" + gameFileName + "/",
            removePackage: true,
            version: {
                number: "1.16.5",
                type: "release"
            },
            forge: fullData.appData + "/" + gameFileName + "/forge.jar",
            memory: {
                max: localStorage.getItem("maxRamValue"),
                min: localStorage.getItem("minRamValue")
            }
        }

    } else { // Opts pour macOS

        launchOpts = {
            authorization: Authenticator.getAuth(localStorage.getItem("aToken"), localStorage.getItem("cToken")),
            root: fullData.appData + "/" + gameFileName + "/",
            removePackage: true,
            version: {
                number: "1.16.5",
                type: "release"
            },
            forge: fullData.appData + "/" + gameFileName + "/forge.jar",
            memory: {
                max: localStorage.getItem("maxRamValue"),
                min: localStorage.getItem("minRamValue")
            }
        }

    }

    launcher.on("debug", (e) => {

        change()
        async function change() {

            console.log(e)
            if (e.includes("[MCLC]: Launching with arguments")) { // Ce message indique que le jeu est télécharge, je change donc l'apparence du HTML

                loadingText.style.opacity = "0"
                progressBar.style.opacity = "0"

                await sleep(1000)
                loadingText.innerHTML = "Lancement du Jeu..."
                loadingText.style.opacity = "1"
            }

            if (!e.includes("[MCLC]: Downloaded assets") && e.includes("[MCLC]: Attempting to download assets")) { // Ces messages indiquent que le jeu n'est pas déja téléchargé, donc je change l'apparence du HTML
                loadingText.style.opacity = "0"
                progressBar.style.opacity = "0"

                await sleep(1000)
                loadingText.innerHTML = "Téléchargement du Jeu..."
                loadingText.style.opacity = "1"
                progressBar.style.opacity = "1"
                progressBar.value = "0"

                launcher.on("progress", (e) => {
                    xVal += 1
                    progressBar.max = e.total
                    progressBar.value = e.task

                })
            }
        }
    })

    launcher.on("data", (e) => {
        console.log(e)

        if (e.includes("[Render thread/INFO]")) {
            if (localStorage.getItem("keepLauncherOpen") && localStorage.getItem("keepLauncherOpen") == "false") {
                ipc.send("quit")
            } else {
                ipc.send("backapp")
            }
        }
    })

    launcher.on("progress", (e) => {
        console.log(e)
        progressBar.value = "0"
        if (e.type == "forge" || e.type == "classes-maven-custom" || e.type == "classes" || e.type == "classes-custom") {
            xVal += 1
            progressBar.max = "109"
            progressBar.value = "" + xVal
            loadingText.innerHTML = "Vérification du Jeu..."
        }
    })

})

// Apparence HTML + Téléchargements

async function changeDlJava() {

    loadingText.style.opacity = 0
    errorText.style.opacity = 0
    progressBar.style.opacity = 0

    await sleep(1000)
    loadingText.innerHTML = "Téléchargement de Java"
    loadingText.style.opacity = 1
    errorText.style.opacity = 0
    progressBar.style.opacity = "1"

    const jreDownloader = new Downloader({

        url: "https://www.dropbox.com/s/262kaub0ra1ma3d/java.zip?dl=1",
        directory: fullData.appData + "/" + gameFileName + "/runtime/",
        fileName: "JRE.zip",
        cloneFiles: false,

        onProgress: function (percentage) {
            progressBar.max = "100"
            progressBar.value = percentage
        }

    })

    try {

        await jreDownloader.download()
            .then(() => {

                then()
                async function then() {

                    await sleep(5000)

                    try {

                        loadingText.style.opacity = 0
                        errorText.style.opacity = 0
                        progressBar.style.opacity = 0

                        await sleep(1000)
                        loadingText.innerHTML = "Extraction de Java"
                        loadingText.style.opacity = 1

                        decompress(fullData.appData + "/" + gameFileName + "/runtime/JRE.zip", fullData.appData + "/" + gameFileName + "/runtime/")
                            .then(() => {

                                try {

                                    fs.unlink(fullData.appData + "/" + gameFileName + "/runtime/JRE.zip", () => {
                                        console.log("%c[Launcher]" + "%c [Java]" + "%c Java has been downloaded and extracted! ", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                                    })

                                    launch()

                                } catch (err) {
                                    console.error("%c[Launcher]" + "%c [Java]" + "%c Unable to unlink JRE.zip! " + err, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                                }

                            })

                    } catch (err) {

                        thenCatch()
                        async function thenCatch() {

                            loadingText.style.opacity = 0
                            errorText.style.opacity = 0
                            progressBar.style.opacity = 0
                            console.error("%c[Launcher]" + "%c [Java]" + "%c Extractig failed! " + err, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

                            await sleep(1000)
                            loadingText.innerHTML = "Echec de l'installation."
                            errorText.innerHTML = "Impossible d'extraire Java."
                            loadingText.style.opacity = 1
                            errorText.style.opacity = 1

                        }

                    }

                }

            })

    } catch (err) {

        thenCatch()
        async function thenCatch() {

            loadingText.style.opacity = 0
            errorText.style.opacity = 0
            progressBar.style.opacity = 0
            console.error("%c[Launcher]" + "%c [Java]" + "%c Download failed! " + err, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

            await sleep(1000)
            loadingText.innerHTML = "Echec du téléchargement."
            errorText.innerHTML = "Impossible de télécharger Java."
            loadingText.style.opacity = 1
            errorText.style.opacity = 1

        }

    }

}

async function launch() {

    loadingText.style.opacity = "0"
    progressBar.style.opacity = "0"

    await sleep(1000)
    loadingText.innerHTML = "Téléchargement du ModPack..."
    loadingText.style.opacity = "1"
    progressBar.style.opacity = "1"
    progressBar.value = "0"


    const mcDownloader = new Downloader({

        url: modpackLink,
        directory: fullData.appData + "/" + gameFileName + "/",
        fileName: "ModPack.zip",
        cloneFiles: false,

        onProgress: function (percentage) {
            progressBar.max = "100"
            progressBar.value = percentage
        }

    })

    try {

        // progressBar.style.opacity = "1"
        await mcDownloader.download()
            .then(() => {

                then()
                async function then() {

                    try {

                        loadingText.style.opacity = 0
                        errorText.style.opacity = 0
                        progressBar.style.opacity = 0

                        await sleep(1000)
                        loadingText.innerHTML = "Extraction du ModPack"
                        loadingText.style.opacity = 1

                        decompress(fullData.appData + "/" + gameFileName + "/ModPack.zip", fullData.appData + "/" + gameFileName + "/")
                            .then(() => {

                                try {

                                    fs.unlink(fullData.appData + "/" + gameFileName + "/ModPack.zip", () => {
                                        console.log("%c[Launcher]" + "%c [ModPack]" + "%c The ModPack has been downloaded and extracted! ", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                                    })

                                    launchOk()

                                } catch (err) {
                                    console.error("%c[Launcher]" + "%c [ModPack]" + "%c Unable to unlink ModPack.zip! " + err, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                                }
                            })

                    } catch (err) {

                        thenCatch()
                        async function thenCatch() {

                            loadingText.style.opacity = 0
                            errorText.style.opacity = 0
                            progressBar.style.opacity = 0
                            console.error("%c[Launcher]" + "%c [ModPack]" + "%c Extracting failed! " + err, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

                            await sleep(1000)
                            loadingText.innerHTML = "Echec de l'extraction."
                            errorText.innerHTML = "Impossible d'extraire le ModPack."
                            loadingText.style.opacity = 1
                            errorText.style.opacity = 1

                        }

                    }

                }

            })

    } catch (err) {

        thenCatch()
        async function thenCatch() {

            loadingText.style.opacity = 0
            errorText.style.opacity = 0
            progressBar.style.opacity = 0
            console.error("%c[Launcher]" + "%c [ModPack]" + "%c Download failed! " + err, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

            await sleep(1000)
            loadingText.innerHTML = "Echec du téléchargement."
            errorText.innerHTML = "Impossible de télécharger le ModPack."
            loadingText.style.opacity = 1
            errorText.style.opacity = 1

        }

    }

}
// --------------------

async function launchOk() {
    launcher.launch(launchOpts)
    loadingText.style.opacity = "0"
    progressBar.style.opacity = "0"

    await sleep(1000)
    loadingText.innerHTML = "Vérification du Jeu..."
    loadingText.style.opacity = "1"
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
