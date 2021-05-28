// Importations
const shell = require("electron");
const ipc = require("electron").ipcRenderer;
const util = require('minecraft-server-util');
// --------------------

// Avertissement console
console.log("%c⚠ Attends !", "color: red; font-size: 28px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
console.log("%cNe tape rien ici à moins que tu sois sûr(e) de ce que tu fais !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);");
console.log("%cCopier-coller quelque chose dictée par un inconnu risque fortement d'être une arnaque !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
// --------------------

// Co OK
console.log("%c[Launcher]" + "%c [Connexion]" + "%c Connection successful!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100")

// Var HTML
const accountInfos = document.getElementById('account-infos');
const status = document.getElementById("status");
const players = document.getElementById("players");
const uuidInput = document.getElementById("uuid-input");
const uuidCopyButton = document.getElementById("uuid-copy-button");
// --------------------

// Infos du compts
document.getElementById("account-pseudo").innerHTML = "<b>" + localStorage.getItem("username") + "</b>";
document.getElementById("account-email").innerHTML = localStorage.getItem("email");
document.getElementById("account-skin").src = "https://minotar.net/avatar/" + localStorage.getItem("username");
// --------------------

// Pour masquer AccountInfos
document.getElementById('account-icon').addEventListener('click', () => {
    if (getComputedStyle(accountInfos).display != "none") {
        accountInfos.style = "display: none"
    } else {
        accountInfos.style = "display: block"
    }
});
// --------------------

// Jouer
document.getElementById("play-button").addEventListener("click", () => {
    ipc.send("play", { u: localStorage.getItem("username"), })
})

// UUID
var ifUUID = 0
document.getElementById("uuid-button").addEventListener("click", () => {

    if (ifUUID === 0) {

        document.getElementById("uuid").innerHTML = "<input type='text' value='" + localStorage.getItem("uuid") + "' class='uuid-input' id='uuid-input' disabled='disabled'><button class='uuid-copy-button hover-shadow' id='uuid-copy-button'>Copier</button>"
        ifUUID = 1

        uuidCopyButton.addEventListener("click", () => {
            uuidInput.disabled = false
            uuidInput.select()
            document.execCommand("copy");
            uuidInput.disabled = true
            console.log("%c[Launcher]" + "%c [Account]" + "%c UUID copied!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            uuidCopyButton.style.background = "#245429";
            uuidInput.style.borderColor = "#245429"

            function uuidColor() {
                uuidCopyButton.style.background = "rgb(61, 61, 61)";
                uuidInput.style.borderColor = "rgb(61, 61, 61)"
            }
            setTimeout(uuidColor, 1500)
        })

    } else {
        document.getElementById("uuid").innerHTML = ""
        ifUUID = 0
    }
});
// --------------------

// Logout
document.getElementById("logout-button").addEventListener("click", () => {
    var logout = {
        url: "https://www.pentagone2.hostim.me/api/auth/logout",
        method: "POST",
        timeout: 0,
        data: {
            access_token: localStorage.getItem("accessToken")
        }
    }

    axios(logout)
        .then(function (response) {
            console.log("%c[Launcher]" + "%c [Connexion]" + "%c Logout successful", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
        })
        .catch(function (error) { })
    localStorage.clear();

    ipc.send("logout")
});
// --------------------


// News
document.getElementById("more-news-button").addEventListener("click", () => {
    ipc.send("news")
})
// --------------------

// Settings
document.getElementById("settings-button").addEventListener("click", () => {
    ipc.send("settings")
});
// --------------------

// Diapo
document.getElementById("full-diapo-button").addEventListener("click", () => {
    ipc.send("diapo")
});
// --------------------

// Ouverture liens
document.getElementById('account-button').addEventListener('click', () => {
    shell.openExternal("https://www.pentagone2.hostim.me/profile/");
});

document.getElementById('site-button').addEventListener('click', () => {
    shell.openExternal("https://www.pentagone2.hostim.me/")
});

document.getElementById('discord-button').addEventListener('click', () => {
    shell.openExternal("https://discord.gg/GBZjpne/")
});

document.getElementById('twitter-button').addEventListener('click', () => {
    shell.openExternal("https://twitter.com/pentagone2_/")
});

document.getElementById('insta-button').addEventListener('click', () => {
    shell.openExternal("https://www.instagram.com/pentagone2_/")
});

document.getElementById('yt-button').addEventListener('click', () => {
    shell.openExternal("https://www.youtube.com/channel/UCUAzUO3TnBZ8AanSOHDaoaQ")
});

document.getElementById('help-site-button').addEventListener('click', () => {
    shell.openExternal("https://www.pentagone2.hostim.me/support/tickets");
});

document.getElementById('help-discord-button').addEventListener('click', () => {
    shell.openExternal("https://discord.com/invite/FePaQ7v");
});
// --------------------

// Status du serveur

servStatus()

document.getElementById("status-refresh").addEventListener("click", () => {
    servStatus()
})

function servStatus() {

    util.status('play.pentagone2.fr', { port: 2022 })
        .then((response) => {

            var playersJSON = JSON.stringify(response.onlinePlayers)

            console.log(response)
            console.log("%c[Server]" + "%c [Status] " + "%cOnline", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            console.log("%c[Server]" + "%c [Players] " + "%c" + playersJSON, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            status.innerHTML = '<b>Status :</b> 🟢 En ligne'
            players.innerHTML = '<b>Joueurs :</b> ' + playersJSON
        })
        .catch(function (error) {
            console.log("%c[Server]" + "%c [Status] " + "%c" + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
            status.innerHTML = '<b>Status :</b> 🔴 Hors ligne';
            players.innerHTML = '<b>Joueurs :</b> ::'
        });

}
// --------------------