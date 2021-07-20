<p align="center"><img alt="Pentagone II Logo" src="https://media.discordapp.net/attachments/831549927547994172/847894763473731594/PentagoneII-Logo-RVB.png"></p>

<p align="center"><img alt="Pentagone II Launcher" src="https://media.discordapp.net/attachments/762253192255766530/847921594113327164/unknown.png" width="800px"></p>

  
[<p align="center"><img src="https://img.shields.io/discord/762253189525012501?color=%235865F2&label=Discord&style=for-the-badge">](https://discord.gg/FePaQ7v)
[<img src="https://img.shields.io/badge/platforms-Windows%2C%20macOS-0077DA?style=for-the-badge&color=0077DA">](#platforms) 
[<img src="https://img.shields.io/badge/version-stable-orangered?style=for-the-badge&color=orangered">](package.json)</p>


### [English description](#en-minecraft-launcher-for-the-modded-server-pentagone-ii-french-server)
### [Description française](#fr-launcher-minecraft-pour-le-serveur-modd%C3%A9-pentagone-ii-serveur-fran%C3%A7ais)

---

## <span id="platforms">Platform compatibility • Compatibilité des plateformes</span>

| OS (platform) • Système d'exploitation (plateforme) | Supported? • Supporté ?            | Minimum version supported • Version minimale supportée  |
|-----------------------------------------------------|-------------------------------------|---------------------------------------------------------|
| Windows (win32)                                     | Yes • Oui                           | Windows 7 (Windows NT 6.1)                              |
| macOS (Darwin)                                      | Yes • Oui                           | macOS El Capitan (10.11)                                |
| Linux (including Chrome OS • incluant Chrome OS)    | Not officially • Pas officiellement | -                                                       |
| Others • Autres                                     | Not officially • Pas officiellement | -                                                       |

---

## **[EN]** Minecraft Launcher for the modded server "Pentagone II" (French server)

### Features :
* <a href="https://azuriom.com/en" target="_blank">Azuriom Auth</a>
* Minecraft Forge 1.16
* Bootstrap
* Java x64 autodownloading (for Windows)
* News (using *[AdminTool](http://minecraft-launcher.medianewsonline.com)* (French website))
* Settings (RAM and Launcher action after launching the Game)
* Medias links
* Slideshow background
* Displaying server information

### Dependencies :
* Font Awesome (`npm install --save @fortawesome/fontawesome-free`)
* Minecraft Launcher Core (`npm i  minecraft-launcher-core` - [documentation](https://github.com/Pierce01/MinecraftLauncher-core))
* Minecraft Server util (`npm i minecraft-server-util` - [documentation](https://github.com/PassTheMayo/minecraft-server-util))
* Axios (`npm i axios`)
* Request (`npm i request`)
* HTTP (`npm i http`) (soon removed)
* Unzipper (`npm i unzipper`) (soon removed)

### Dev Dependencises :
* Electron (`npm i -D electron`)
* Electron Builder (`npm i -D electron-builder`)

### Installation commands

Fisrtly, you must download and install <a href="https://nodejs.org" target="_blank">Node.JS</a>.

##### Clone and install dependencies
```
git clone https://github.com/GoldFrite/PentagoneII_Launcher.git
cd PentagoneII_Launcher
npm i
```

##### Start application in test
```
npm run test
```

##### Build application
| Plateforme          | Commande                    |
|---------------------|-----------------------------|
| Windows (win32)     | `npm run buildWin`          |
| macOS (Darwin)      | `npm run buildMac`          |
| Linux Distributions | not supported at the moment |

### Warning !

The *package.json* is only for Windows! The macOS version is available [there](build/macos-package.json).

This Launcher is based on another Launcher that I created, but this last one is not available on GitHub.

This Launcher is under *GNU AGPLv3* licence, so you can clone it for your own project. For more informations, please check the *LICENSE* file.

---

## [FR] Launcher Minecraft pour le serveur moddé "Pentagone II" (serveur français)

### Caracteristiques :
* <a href="https://azuriom.com/fr" target="_blank">Authentification avec Azuriom</a>
* Minecraft Forge 1.16
* Mises à jour automatiques du Launcher
* Téhéchangement automatique de Java x64 (pour Windows)
* News (utilisant *[AdminTool](http://minecraft-launcher.medianewsonline.com)* (site français))
* Paramètres (RAM at Action du Launcher après le lancement du Jeu)
* Liens réseaux sociaux
* Fond d'écran diaporama
* Affichage des infosmations du serveur

### Dépendances :
* Font Awesome (`npm install --save @fortawesome/fontawesome-free`)
* Minecraft Launcher Core (`npm i  minecraft-launcher-core` - [documentation](https://github.com/Pierce01/MinecraftLauncher-core))
* Minecraft Server util (`npm i minecraft-server-util` - [documentation](https://github.com/PassTheMayo/minecraft-server-util))
* Axios (`npm i axios`)
* Request (`npm i request`)
* HTTP (`npm i http`) (bientôt supprimée)
* Unzipper (`npm i unzipper`) (bientôt supprimée)

### Dépendances de dev :
* Electron (`npm i -D electron`)
* Electron Builder (`npm i -D electron-builder`)

### Commandes d'installation

Pour commencer, vous tevez télécharger et installer <a href="https://nodejs.org/fr/" target="_blank">Node.JS</a>.

##### Cloner puis installer les dépendances
```
git clone https://github.com/GoldFrite/PentagoneII_Launcher.git
cd PentagoneII_Launcher
npm i
```

##### Lancer l'application en test
```
npm run test
```

##### Exporter l'application (build)
| Plateforme          | Commande                    |
|---------------------|-----------------------------|
| Windows (win32)     | `npm run buildWin`          |
| macOS (Darwin)      | `npm run buildMac`          |
| Distributions Linux | non supporté pour le moment |

### Attention !

Le *package.json* est uniquement pour Windows ! Pour obtenir la version macOS, cliquez [ici](build/macos-package.json).

Ce Launcher est basé sur un autre Launcher que j'ai créé, mais ce dernier n'est pas disponible sur GitHub.

Ce Launcher est sous licence *GNU AGPLv3*. Vous pouvez donc cloner ce Launcher pour créer le votre. Pour plus d'informations, veuillez lire le fichier *LICENSE*.
