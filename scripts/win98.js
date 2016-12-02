"use strict";

/**
 * win98.js, Operating System.
 * @author dd86k
 */

/* TODOs:
- Start menu new design (HTML) for submenus:
<div class="smi">
  <img/><span>Test</span>
  <div class="smsm">
    <div class="smsi">
      <img/><span>Test</span>
    </div>
  </div>
</div>
- win98wsh.js (Windows Scripting Host)
- IE4 (iexplore)
*/

/**
 * Project properties.
 */
var Project = {
    name: "Windows 98 WebSim",
    majorVersion: 0,
    minorVersion: 6,
    revision: 0,
    branch: "git",
    commit: 4,
    get version () {
        var t = Project.majorVersion + "." + Project.minorVersion + "." +
            Project.revision;

        if (Project.branch == "git")
            t = t + "-" + Project.branch + "-" + Project.commit;

        return t;
    },
    get full () {
        return Project.name + " " + Project.version;
    }
};

function start() {
    websimversion.innerText = Project.full;
    updateTime24h();
}

onload = start;

/*
 * Time.
 */

function updateTime12h() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var t = "";

    if (hours > 12) {
        t += "PM";
        hours = hours - 12;
    } else if (hours == 12) {
        t += "PM";
    } else {
        t += "AM";
    }

    ostime.innerHTML = hours + ":" + minutes + " " + t;
}

function updateTime24h() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    ostime.innerHTML = hours + ":" + minutes;
}

setInterval(updateTime24h, 5000);

/*
 * A program.
 */



/**
 * Utilities.
 */

var Utils = {
    r: function (max) { return Math.random() * max; }
}

/*
 * Global prototyping.
 */

// StackOverflow solution by Johan Dettmar
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = 0, len = this.length; i < len; i++)
        if (this[i] && this[i].parentElement)
            this[i].parentElement.removeChild(this[i]);
};

/**
 * Shell.
 */

var Shell = {
    /**
     * Run a file. (Fake)
     * @param {String} path The virtual path to the file.
     * @returns {Number} Error code.
     */
    run: function (file, args) {
        if (file != null && file.length > 0) {
            if (/^(http)/i.test(file)) {
                open(file);
            } else {
                var s = file.split(" ", 128);
                switch (s[0].toLowerCase()) {
                    case "command": case "command.com":
                        WindowManager.createWindow('MS-DOS Prompt', Utils.r(200), Utils.r(200), 'command');
                        return 0;
                    case "notepad": case "notepad.exe":
                        WindowManager.createWindow(
                            'Untitled - Notepad', Utils.r(200), Utils.r(200), 'notepad');
                        return 0;
                    /*case "iexplore": case "iexplore.exe":
                        WindowManager.createWindow(
                            'about:blank - Microsoft Internet Explorer',
                                Utils.r(200), Utils.r(200), 'iexplore'
                        );
                        return 0;*/
                    case "shell:run":
                        WindowManager.createWindow('Run', 150, 50, 'rundialog');
                        return 0;
                    case "shell:about":
                        WindowManager.createWindow('About', 150, 50, 'aboutdialog');
                        return 0;
                    case "shell:tests":
                        WindowManager.createWindow("Tests", 50, 50, "tests");
                        return 0;
                    default:
                        WindowManager.showError(file,
                            "The file \"" + file + "\" (or one of its components) cannot \
be found. Verify the path and the filename are correct, \
and all the libraries required are available.");
                        return 1;
                }
            }
        } else {
            WindowManager.showError("Shell", "Empty command");
            return 2;
        }
    }
}

/**
 * Registry.
 */

var Registry = {

}