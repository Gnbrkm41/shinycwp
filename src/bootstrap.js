!(async function() {
    console.log(nw.App.dataPath)
    const fs = require("fs");
    const path = require("path");
    const SCWP = require("./js/config.js");
    const TransKRFileName = "ShinyColors.user.js";
    const tempTransKRPath = path.join(nw.App.dataPath,TransKRFileName);
    const versionReg = /\/\/ @version +(.+)/;
    if(global.SCWP.config.get("transKR").active) {
        const injectScript = fs.readFileSync("transKR/inject.js").toString();
        const tempScript = fs.readFileSync("transKR/ShinyColors.user.js").toString();
        const tempVersionRes = versionReg.exec(tempScript);
        if(tempVersionRes) {
            var tempVersion = tempVersionRes[1];
        }
        var remoteResponse = await fetch("https://newbiepr.github.io/Temporary_KRTL/ShinyColors.user.js",{});
        if(remoteResponse.status === 200) {
            var remoteScript = await remoteResponse.text();
            const remoteVersionRes = versionReg.exec(remoteScript);
            if(remoteVersionRes) {
                var remoteVersion = remoteVersionRes[1];
            } 
        }
        let mergedScript = "";
        if(tempVersion && remoteVersion && tempVersion !== remoteVersion) {
            mergedScript = injectScript + remoteScript;
        } else {
            mergedScript = injectScript + tempScript;
        }
        fs.writeFileSync(tempTransKRPath, mergedScript);
        nw.Window.open("index.html",{
            width: 1067,
            height: 623,
            min_width: 600,
            min_height: 360,
            frame: false,
            title: "ShinyCWP TransKR [BETA]",
            icon: "shanicon.png",
            inject_js_start: tempTransKRPath
        }, nwWin => {
            console.log(nwWin);
        })
    } else {
        nw.Window.open("index.html",{
            width: 1067,
            height: 623,
            min_width: 600,
            min_height: 360,
            frame: false,
            title: "ShinyCWP TransKR [BETA]",
            icon: "shanicon.png"
        }, nwWin => {
            console.log(nwWin);
        })
    }    
})();