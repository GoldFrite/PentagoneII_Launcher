let axiosx = require('axios');
const { memoryUsage } = require('process');
const packageGlobal = require("./package.json")

let appVersionx = packageGlobal.version
let appAuthor = packageGlobal.author
let appName = packageGlobal.name + " (" + packageGlobal.productName + ")"
let appLicense = packageGlobal.license
let internalVersion = packageGlobal.internalVersion

// Commande d'aide
function help() {

    console.log("%c[Launcher]" + "%c [Commandes]" + "%c Liste des commandes disponibles :\n\n" +

        " - help()\n     Affiche la ligne des commandes disponibles.\n\n" +

        " - infos()\n     Affiche les informations concernant le Launcher et l'appareil.\n\n",
        
        "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100")

}
function cmd() {
    help()
}
function devHelp() {
    help()
}

// Afficher les infos Launcher/Ordi
function infos() {

    console.log("%c[Launcher]" + "%c [Infos]" + "%c Informations sur le Launcher et l'appareil :\n\n" +

        " Nom du Launcher : " + appName + "\n\n" +

        " Version du Launcher : " + appVersionx + "\n\n" +

        " Version interne du Launcher : " + internalVersion + "\n\n" +

        " Auteur du Launcher : " + appAuthor + "\n\n" +

        " Licence du Launcher : " + appLicense + "\n\n" +

        " Système d'exploitation : " + os.platform + " (" + process.getSystemVersion() + " " + os.arch + ")\n\n" +

        " Processeur : " + os.cpus()[0].model + " (" + os.cpus().length + " threads)\n\n" +

        " Mémoire RAM installée : " + process.getSystemMemoryInfo().total + " Ko | Mémoire RAM libre : " + process.getSystemMemoryInfo().free + " Ko\n\n" +
        " Ce Launcher est basé sur GoldFrite Launcher de GoldFrite. Il utilise minecraft-launcher-core et minecraft-server-util, axios, request, et electron.", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100")

}