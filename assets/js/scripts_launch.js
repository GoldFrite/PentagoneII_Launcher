// Importations
const { Client, Authenticator } = require("minecraft-launcher-core");
const launcher = new Client();
const ipc = require("electron").ipcRenderer;
const os = require("os");
const fs = require("fs");
let axios = require('axios');
const request = require('request');
const unzipper = require("unzipper");
// --------------------

var modpackLink = null
const progressBar = document.getElementById("progress-bar")
const loadingText = document.getElementById("loading")
const errorText = document.getElementById("error")
var xVal = 0
var isDl = 0
let launchOpts

var modpack = {
    method: 'post',
    url: 'http://minecraft-launcher.medianewsonline.com/servers/pentagone2/update/update.json',
};

axios(modpack)
    .then(function (response) {
        modpackLink = response.data.game
    })
    .catch(function (error) {
        console.log("%c[Launcher]" + "%c [Updater]" + "%c Unable to load the Modpack ZIP file : " + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
    })

function launch() {
    launcher.launch(launchOpts)
    loadingText.style.opacity = "0"
    setTimeout(change, 1000)
    function change() {
        loadingText.innerHTML = "Vérification du Jeu..."
        loadingText.style.opacity = "1"
    }
}

ipc.on("data", (event, data) => {

    try {
        fs.readdir(data.appData + "/.pentagone2/mods/", (err, files) => {
            try {
                files.forEach(file => {
                    fs.unlink(data.appData + "/.pentagone2/mods/" + file, (err) => { });
                })
            } catch (error) { }
        })
    } catch (error) { }

    fs.access(data.appData + "/.pentagone2/runtime/bin/java.exe", (err) => {
        if (err) {

            changeDlJava();

            download("https://www.dropbox.com/s/262kaub0ra1ma3d/java.zip?dl=1", data.appData + "/.pentagone2/runtime/jre.zip", (err) => {
                console.log("OK");
                if (err || isDl == -1) {
                    loadingText.style.opacity = 0
                    errorText.style.opacity = 0
                    progressBar.style.opacity = 0
                    console.error("%c[Launcher]" + "%c [Java]" + "%c Download failed! " + errorVar, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                    setTimeout(change, 1000)
                    function change() {
                        loadingText.innerHTML = "Echec du téléchargement."
                        errorText.innerHTML = "Impossible de télécharger Java."
                        loadingText.style.opacity = 1
                        errorText.style.opacity = 1
                    }
                    isDl = -1
                } else {
                    loadingText.style.opacity = 0
                    progressBar.style.opacity = 0
                    console.log("%c[Launcher]" + "%c [Java]" + "%c Download complete!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                    setTimeout(change, 1000)
                    function change() {
                        loadingText.innerHTML = "Installation de Java"
                        loadingText.style.opacity = 1
                        fs.createReadStream(data.appData + '/.pentagone2/runtime/jre.zip')
                            .pipe(unzipper.Extract({ path: data.appData + "/.pentagone2/runtime/" }, { end: setTimeout(lanuchAndDelete, 10000) }))
                        function lanuchAndDelete() {
                            setTimeout(launch, 1000)
                            fs.unlink(data.appData + "/.pentagone2/runtime/jre.zip", (err) => { })
                        }
                    }
                }
            })
        }
    })

    function download(url, dest, cb) {
        const file = fs.createWriteStream(dest)
        const sendReq = request.get(url)
        var weight = null
        var dl = 0
        progressBar.style.opacity = 1

        sendReq.on('response', (response) => {
            if (response.statusCode !== 200) {
                isDl = -1
                return cb('Response status was ' + response.statusCode)
            } else {
                weight = response.headers['content-length'];
                progressBar.max = weight
                response.on("data", (chunk) => {
                    dl = dl + chunk.length
                    //console.log("Downloaded: " + dl + " bytes");
                    progressBar.value = dl
                })
            }
        })
        sendReq.on('error', (err) => {
            cb(err.message)
            errorVar = err
            errorText.style.opacity = 1
            isDl = -1
            fs.unlink(dest)
        })
        file.on('error', (err) => {
            cb(err.message);
            errorVar = err
            errorText.style.opacity = 1
            isDl = -1
            fs.unlink(dest)
        })
        sendReq.pipe(file)
        file.on('finish', () => {
            file.close(cb);
            console.log(isDl);
        })
    }



    try {
        fs.unlink(data.appData + "/.pentagone2/forge.jar", (err) => { })
    } catch (error) { }

    if (os.platform == "win32") {

        launchOpts = {
            clientPackage: modpackLink,
            javaPath: data.appData + "/.pentagone2/runtime/bin/java.exe",
            authorization: Authenticator.getAuth(localStorage.getItem("username")),
            root: data.appData + "/.pentagone2",
            removePackage: true,
            version: {
                number: "1.16.5",
                type: "release"
            },
            forge: data.appData + "/.pentagone2/forge.jar",
            memory: {
                max: localStorage.getItem("maxRamValue"),
                min: localStorage.getItem("minRamValue")
            }
        }

        if (!fs.existsSync(data.appData + "/.pentagone2/")) {
            fs.mkdirSync(data.appData + "/.pentagone2/", { recursive: true })
            fs.mkdirSync(data.appData + "/.pentagone2/runtime/", { recursive: true })
            changeDlJava()
        } else if (!fs.existsSync(data.appData + "/.pentagone2/runtime")) {
            fs.mkdirSync(data.appData + "/.pentagone2/runtime/", { recursive: true })
            changeDlJava()
        } else if (!fs.existsSync(data.appData + "/.pentagone2/runtime/bin/java.exe")) {
            changeDlJava()
        } else {
            setTimeout(launch, 1000)
        }
    } else {

        launchOpts = {
            clientPackage: modpackLink,
            authorization: Authenticator.getAuth(localStorage.getItem("username")),
            root: data.appData + "/.pentagone2",
            removePackage: true,
            version: {
                number: "1.16.5",
                type: "release"
            },
            forge: data.appData + "/.pentagone2/forge.jar",
            memory: {
                max: localStorage.getItem("maxRamValue"),
                min: localStorage.getItem("minRamValue")
            }
        }


    }

    function changeDlJava() {
        setTimeout(change, 1000)
        function change() {
            loadingText.innerHTML = "Téléchargement de Java"
            loadingText.style.opacity = 1
            errorText.style.opacity = 0
        }
    }

    launcher.on("debug", (e) => {
        console.log(e)
        if (e.includes("[MCLC]: Launching with arguments")) {
            loadingText.style.opacity = "0"
            progressBar.style.opacity = "0"
            setTimeout(change, 1000)
            function change() {
                loadingText.innerHTML = "Lancement du Jeu..."
                loadingText.style.opacity = "1"
            }
        }
        if (!e.includes("[MCLC]: Downloaded assets") && e.includes("[MCLC]: Attempting to download assets")) {
            loadingText.style.opacity = "0"
            progressBar.style.opacity = "0"
            setTimeout(change, 1000)
            function change() {
                loadingText.innerHTML = "Téléchargement du Jeu..."
                loadingText.style.opacity = "1"
                progressBar.style.opacity = "1"
                progressBar.value = "0"
            }
            launcher.on("progress", (e) => {
                xVal += 1
                progressBar.max = e.total
                progressBar.value = e.task

            })
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