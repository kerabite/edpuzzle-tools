// ==UserScript==
// @name         edpuzzle tools
// @version      0.1
// @description  a toolkit for edpuzzle
// @author       kerabite
// @match        https://edpuzzle.com/assignments/*/watch
// @grant        none
// ==/UserScript==

var interval;
var button = document.createElement("button");
button.innerHTML = "3x speed video (hacky method)";
button.style.position = "fixed";
button.style.top = "0";
button.style.left = "300 px";

var body = document.querySelector("body");
body.appendChild(button);

button.addEventListener ("click", function() {
    if (!interval) {
        alert("spamming");
        interval = setInterval(() => {
            var timeline = document.querySelector("div._1cCojsbZJ9");
            simulatedClick(timeline, {
                clientX: 1220
            });
        }, 50);
    } else {
        alert("turned off spam");
        clearInterval(interval);
        interval = null;
    }
});

/**
 * @see {@link https://stackoverflow.com/a/6158160} for original stackoverflow answer
 */
function simulatedClick(target, options) {
    options = options || {};
    var event = target.ownerDocument.createEvent('MouseEvents'),
        opts = { // These are the default values, set up for un-modified left clicks
            type: 'click',
            canBubble: true,
            cancelable: true,
            view: target.ownerDocument.defaultView,
            detail: 1,
            screenX: 0, //The coordinates within the entire page
            screenY: 0,
            clientX: 0, //The coordinates within the viewport
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
            button: 0, //0 = left, 1 = middle, 2 = right
            relatedTarget: null,
        };

    //Merge the options with the defaults
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            opts[key] = options[key];
        }
    }

    //Pass in the options
    event.initMouseEvent(
        opts.type,
        opts.canBubble,
        opts.cancelable,
        opts.view,
        opts.detail,
        opts.screenX,
        opts.screenY,
        opts.clientX,
        opts.clientY,
        opts.ctrlKey,
        opts.altKey,
        opts.shiftKey,
        opts.metaKey,
        opts.button,
        opts.relatedTarget
    );

    //Fire the event
    target.dispatchEvent(event);
}