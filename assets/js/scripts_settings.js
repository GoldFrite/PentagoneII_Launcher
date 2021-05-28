// Importations
const { shell, ipcMain } = require("electron");
const ipc = require("electron").ipcRenderer;
const os = require('os');
const userName = os.userInfo().username;
// --------------------

// Selectionner les valeurs RAM si localStorage
if (localStorage.getItem("minRamValue") && localStorage.getItem("maxRamValue")) {

    document.getElementById("min-" + localStorage.getItem("minRamValue")).selected = "true"
    document.getElementById("max-" + localStorage.getItem("maxRamValue")).selected = "true"

} else {
    document.getElementById("min-2000").selected = "true"
    document.getElementById("max-3000").selected = "true"
}
// --------------------

// Cocher ou non keepLauncherOpen
if (localStorage.getItem("keepLauncherOpen") == "true") {

    document.getElementById("keep-open-zone").innerHTML = '<input checked type="checkbox" class="keep-open" id="keep-open"><label for="keep-open"></label> Garder le Launcher ouvert durant l\'exécution du Jeu'

} else {
    document.getElementById("keep-open-zone").innerHTML = '<input type="checkbox" class="keep-open" id="keep-open"><label for="keep-open"></label> Garder le Launcher ouvert durant l\'exécution du Jeu'
}
// --------------------

// Retour à l'App
document.getElementById("backhome-button").addEventListener("click", () => {
    if (document.getElementById("min-ram").value > document.getElementById("max-ram").value) {
        console.log("%c[Launcher]" + "%c [Settings]" + "%c minRAM could not be superior with maxRAM!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
        document.getElementById("min-ram").style.backgroundColor = "#c74930"
        document.getElementById("max-ram").style.backgroundColor = "#c74930"
        document.getElementById("ram-info").style.color = "#c74930"
    } else {
        localStorage.setItem("minRamValue", document.getElementById("min-ram").value)
        localStorage.setItem("maxRamValue", document.getElementById("max-ram").value)
        localStorage.setItem("keepLauncherOpen", document.getElementById("keep-open").checked)
        ipc.send("backapp")
    }
})
// --------------------