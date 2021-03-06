var GMOptions = {};

function Inject_GM_registerMenuCommand(commandName, commandFunc, accessKey) {
	console.log(commandName);
	console.log(commandFunc);
	console.log(accessKey);

	// Ignore accessKey - it's for shortcuts to menus but we won't use it
	GMOptions[commandName] = {
		commandName: commandName,
		commandFunc: commandFunc,
	};
	
	if (commandName.includes("백그라운드 BGM")) {
		GMOptions[commandName].action = "background-bgm";
		if (window.parentDocument) {
			window.parentDocument.querySelector(".button-transKR.background-bgm").textContent = commandName;
			window.parentDocument.querySelector(".button-transKR.background-bgm").onclick = commandFunc;
		}
	} else if (commandName.includes("커뮤 추출")) {
		GMOptions[commandName].action = "commu-extract";
		if (window.parentDocument) {
			window.parentDocument.querySelector(".button-transKR.commu-extract").textContent = commandName;
			window.parentDocument.querySelector(".button-transKR.commu-extract").onclick = commandFunc;
		}
	}
	return commandName;
}

function Inject_GM_unregisterMenuCommand(menuCmdId) {
	console.log(menuCmdId);
	if (GMOptions[menuCmdId]) {
		delete GMOptions[menuCmdId]
	}
}

if (typeof nw !== 'undefined') {
	var win = nw.window.get().window;
} else {
	var win = window;
}
if (win.location.hostname.indexOf("shinycolors.enza.fun") != -1) {
	win.GM_registerMenuCommand = Inject_GM_registerMenuCommand;
	win.GM_unregisterMenuCommand = Inject_GM_unregisterMenuCommand;
	var interval = setInterval(function() {
		if (typeof win.parentDocument !== 'undefined') {
			clearInterval(interval);
			win.parentDocument.querySelector(".button-transKR.background-bgm").textContent = Object.values(GMOptions).find((value) => value.action == "background-bgm").commandName;
			win.parentDocument.querySelector(".button-transKR.background-bgm").onclick = Object.values(GMOptions).find((value) => value.action == "background-bgm").commandFunc;
			win.parentDocument.querySelector(".button-transKR.commu-extract").textContent = Object.values(GMOptions).find((value) => value.action == "commu-extract").commandName;
			win.parentDocument.querySelector(".button-transKR.commu-extract").onclick = Object.values(GMOptions).find((value) => value.action == "commu-extract").commandFunc;
		}
	});
}
