let body = document.querySelector("body");
let virtArea = document.createElement("div");
let virtMonitor = document.createElement("textarea");
let virtKeyboard = document.createElement("div");

virtArea.className = "virt-area";
virtMonitor.className = "virt-area__monitor";
virtKeyboard.className = "virt-area__keyboard";

body.append(virtArea);
virtArea.append(virtMonitor, virtKeyboard);

// function makeKeyboardKeys() {

// }