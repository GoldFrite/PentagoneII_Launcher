// Var HTML
const body = document.getElementById("body");
//let slogans = null;
let slogans = document.getElementById("slogans");
// --------------------

// Charger les images
body.style.backgroundImage = "url('./assets/images/bg-01.png')"
body.style.backgroundImage = "url('./assets/images/bg-02.png')"
body.style.backgroundImage = "url('./assets/images/bg-03.png')"
body.style.backgroundImage = "url('./assets/images/bg-04.png')"

// Random
var random = -1

setInterval(change, 15000)

change()

function change() {

    random++

    if (random < 1) {
        body.style.backgroundImage = "url('./assets/images/bg-01.png')"
        slogans.innerHTML = "“Aux frontières de l'imagination...”"
        document.getElementById("diapo-1").style.background = "#6e6e6e"
        document.getElementById("diapo-2").style.background = "white"
        document.getElementById("diapo-3").style.background = "white"
    } else if (random < 2) {
        body.style.backgroundImage = "url('./assets/images/bg-02.png')"
        slogans.innerHTML = "“Au delà des limites de l'espaces !”"
        document.getElementById("diapo-2").style.background = "#6e6e6e"
        document.getElementById("diapo-1").style.background = "white"
        document.getElementById("diapo-3").style.background = "white"
    } else if (random < 3) {
        body.style.backgroundImage = "url('./assets/images/bg-03.png')"
        slogans.innerHTML = "“La fin d'une ère...”"
        document.getElementById("diapo-3").style.background = "#6e6e6e"
        document.getElementById("diapo-1").style.background = "white"
        document.getElementById("diapo-2").style.background = "white"
    } else {
        random = 0
        body.style.backgroundImage = "url('./assets/images/bg-01.png')"
        slogans.innerHTML = "“Aux frontières de l'imagination...”"
        document.getElementById("diapo-1").style.background = "#6e6e6e"
        document.getElementById("diapo-2").style.background = "white"
        document.getElementById("diapo-3").style.background = "white"
    }
}

document.getElementById("diapo-1").addEventListener("click", () => {
    manualChange(1)
    document.getElementById("diapo-1").style.background = "#6e6e6e"
    document.getElementById("diapo-2").style.background = "white"
    document.getElementById("diapo-3").style.background = "white"
})
document.getElementById("diapo-2").addEventListener("click", () => {
    manualChange(2)
    document.getElementById("diapo-2").style.background = "#6e6e6e"
    document.getElementById("diapo-1").style.background = "white"
    document.getElementById("diapo-3").style.background = "white"
})
document.getElementById("diapo-3").addEventListener("click", () => {
    manualChange(3)
    document.getElementById("diapo-3").style.background = "#6e6e6e"
    document.getElementById("diapo-1").style.background = "white"
    document.getElementById("diapo-2").style.background = "white"
})

function manualChange(xD) {
    body.style.backgroundImage = "url('./assets/images/bg-0" + xD + ".png')"
    if (xD == 1) {
        slogans.innerHTML = "“Aux frontières de l'imagination...”"
        random = 0
    } else if (xD == 2) {
        slogans.innerHTML = "“Au delà des limites de l'espaces !”"
        random = 1
    } else if (xD == 3) {
        slogans.innerHTML = "“La fin d'une ère...”"
        random = 2
    }
}