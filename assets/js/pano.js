// Importations
const ipc = require("electron").ipcRenderer;

// Var HTML
const body = document.getElementById("body");
// --------------------

// Charger les images
body.style.backgroundImage = "url('./assets/images/bg-01.png')"
body.style.backgroundImage = "url('./assets/images/bg-02.png')"
body.style.backgroundImage = "url('./assets/images/bg-03.png')"
body.style.backgroundImage = "url('./assets/images/bg-04.png')"

// Random
var random = 0
var xXD

setInterval(change, 15000)

change()

function change() {

    random++

    if (random < 1) {
        body.style.backgroundImage = "url('./assets/images/bg-full-01.png')"
        xXD = 1
    } else if (random < 2) {
        body.style.backgroundImage = "url('./assets/images/bg-full-02.png')"
        xXD = 2
    } else if ((random < 3)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-03.png')"
        xXD = 3
    } else if ((random < 4)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-04.png')"
        xXD = 4
    } else if ((random < 5)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-05.png')"
        xXD = 5
    } else if ((random < 6)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-06.png')"
        xXD = 6
    } else if ((random < 7)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-07.png')"
        xXD = 7
    } else if ((random < 8)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-08.png')"
        xXD = 8
    } else if ((random < 9)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-09.png')"
        xXD = 9
    } else if ((random < 10)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-10.png')"
        xXD = 10
    } else if ((random < 11)) {
        body.style.backgroundImage = "url('./assets/images/bg-full-11.png')"
        xXD = 11
    } else {
        random = 0
        body.style.backgroundImage = "url('./assets/images/bg-full-01.png')"
        xXD = 1
    }
}

document.getElementById("next-diapo").addEventListener("click", () => {
    if (xXD == 11) {
        xXD = 1
    } else {
        xXD++
    }
    manualChange(xXD)
})

document.getElementById("prev-diapo").addEventListener("click", () => {
    if (xXD == 0) {
        xXD = 1
    } else {
        xXD--
    }
    manualChange(xXD)
})

function manualChange(xD) {
    if (xXD < 10) {
        body.style.backgroundImage = "url('./assets/images/bg-full-0" + xD + ".png')"
    } else {
        body.style.backgroundImage = "url('./assets/images/bg-full-" + xD + ".png')"
    }
    random = xXD - 1
}

document.getElementById("backhome-button").addEventListener("click", () => {
    ipc.send("backapp")
})