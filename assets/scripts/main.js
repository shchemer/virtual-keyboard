let enKeyboard = {
  Backquote: ["`", "~"],
  Digit1: ["1", "!"],
  Digit2: ["2", "@"],
  Digit3: ["3", "#"],
  Digit4: ["4", "$"],
  Digit5: ["5", "%"],
  Digit6: ["6", ":"],
  Digit7: ["7", "?"],
  Digit8: ["8", "*"],
  Digit9: ["9", "("],
  Digit0: ["0", ")"],
  Minus: ["-", "_"],
  Equal: ["=", "+"],
  Backspace: ["Backspace"],
  Tab: ["Tab"],
  KeyQ: ["Q"],
  KeyW: ["W"],
  KeyE: ["E"],
  KeyR: ["R"],
  KeyT: ["T"],
  KeyY: ["Y"],
  KeyU: ["U"],
  KeyI: ["I"],
  KeyO: ["O"],
  KeyP: ["P"],
  BracketLeft: ["["],
  BracketRight: ["]"],
  Backslash: ["\\", "/"],
  Delete: ["Del"],
  CapsLock: ["Caps"],
  KeyA: ["A"],
  KeyS: ["S"],
  KeyD: ["D"],
  KeyF: ["F"],
  KeyG: ["G"],
  KeyH: ["H"],
  KeyJ: ["J"],
  KeyK: ["K"],
  KeyL: ["L"],
  Semicolon: [";"],
  Quote: ["'"],
  Enter: ["Enter"],
  ShiftLeft: ["Shift"],
  KeyZ: ["Z"],
  KeyX: ["X"],
  KeyC: ["C"],
  KeyV: ["V"],
  KeyB: ["B"],
  KeyN: ["N"],
  KeyM: ["M"],
  Comma: ["."],
  Period: [","],
  Slash: ["/"],
  ArrowUp: ["▲"],
  ShiftRight: ["Shift"],
  ControlLeft: ["Ctrl"],
  MetaLeft: ["Win"],
  AltLeft: ["Alt"],
  Space: ["Space"],
  AltRight: ["Alt"],
  ControlRight: ["Ctrl"],
  ArrowLeft: ["◄"],
  ArrowDown: ["▼"],
  ArrowRight: ["►"],
};

let Keyboard = {
  virtMonitor: null,
  virtKeyboard: null,
  isCapsOn: false,
  isShiftOn: false,

  init() {
    let virtArea = document.createElement("div");
    let virtMonitor = document.createElement("textarea");
    let virtKeyboard = document.createElement("div");

    this.virtMonitor = virtMonitor; // remember virtMonitor in object
    this.virtKeyboard = virtKeyboard; // remember virtKeyboard in object

    virtArea.className = "virt-area";
    virtMonitor.className = "virt-area__monitor";
    virtKeyboard.className = "virt-area__keyboard";

    document.body.append(virtArea);
    virtArea.append(virtMonitor, virtKeyboard);

    this.makeKeyboard(enKeyboard);
  },

  makeKeyboard(layout) {
    let keyboardKeys = Object.keys(layout);
    let keyboardSymbols = Object.values(layout);
    for (let i = 0; i < keyboardKeys.length; i++) {
      this.createKeyboardKey(keyboardKeys[i], keyboardSymbols[i]);
    }
  },

  createKeyboardKey(keyCode, symbols) {
    let [primaryKey, secondaryKey] = symbols;

    let keyboardKey = document.createElement("div");
    let symbolPrimary = document.createElement("span");
    let symbolSecondary = document.createElement("span");

    keyboardKey.className = "keyboard__key";
    keyboardKey.setAttribute("id", `key-${keyCode.toLowerCase()}`);
    symbolPrimary.className = "keyboard__symbol keyboard__symbol_primary";
    symbolSecondary.className = "keyboard__symbol keyboard__symbol_secondary";

    this.virtKeyboard.append(keyboardKey);
    keyboardKey.append(symbolPrimary, symbolSecondary);

    symbolPrimary.innerHTML = primaryKey;
    symbolSecondary.innerHTML = !secondaryKey ? "" : secondaryKey;

    switch (keyCode) {
      case "ControlLeft":
      case "MetaLeft":
      case "AltLeft":
      case "AltRight":
      case "ControlRight":
        break;
      case "Delete":
        keyboardKey.addEventListener("click", () => {
          this.deleteInActivePos(keyCode);
        });
        break;
      case "Backspace":
        keyboardKey.addEventListener("click", () => {
          this.deleteInActivePos(keyCode);
        });
        break;
      case "Tab":
        keyboardKey.addEventListener("click", () => {
          this.insertInActivePos("	");
        });
        break;
      case "CapsLock":
        keyboardKey.addEventListener("click", () => {
          this.isCapsOn = !this.isCapsOn;
        });
        break;
      case "Enter":
        keyboardKey.addEventListener("click", () => {
          this.insertInActivePos("\n");
        });
        break;
      case "ShiftLeft":
      case "ShiftRight":
        keyboardKey.addEventListener("click", () => {
          this.isShiftOn = !this.isShiftOn;
        });
        break;
      case "Space":
        keyboardKey.addEventListener("click", () => {
          this.insertInActivePos(" ");
        });
        break;
      case "ArrowUp":
        keyboardKey.addEventListener("click", () => {
          this.changeActivePos(keyCode);
        });
        break;
      case "ArrowRight":
        keyboardKey.addEventListener("click", () => {
          this.changeActivePos(keyCode);
        });
        break;
      case "ArrowDown":
        keyboardKey.addEventListener("click", () => {
          this.changeActivePos(keyCode);
        });
        break;
      case "ArrowLeft":
        keyboardKey.addEventListener("click", () => {
          this.changeActivePos(keyCode);
        });
        break;
      default:
        keyboardKey.addEventListener("click", (e) => {
          let keySymbol = primaryKey.toLowerCase();
          if (this.isCapsOn) {
            // if caps is on then key change to upperCase and check for having a second key
            keySymbol = primaryKey.toUpperCase();
          }
          if (this.isShiftOn) {
            // if shift is on then looking on case, if lower need to make to upper and check for having a second key else make to lower
            if (primaryKey.toLowerCase() == keySymbol) {
              if (secondaryKey) keySymbol = secondaryKey;
              if (!secondaryKey) keySymbol = primaryKey.toUpperCase();
              this.isShiftOn = e.shiftKey || false;
            } else {
              keySymbol = primaryKey.toLowerCase();
              this.isShiftOn = e.shiftKey || false;
            }
          }
          this.insertInActivePos(keySymbol);
        });
        break;
    }
  },

  insertInActivePos(keySymbol) {
    let virtMonitor = this.virtMonitor;
    let selectStart = virtMonitor.selectionStart;
    let selectEnd = virtMonitor.selectionEnd;
    if (selectStart === selectEnd) {
      virtMonitor.value =
        virtMonitor.value.slice(0, selectStart) +
        keySymbol +
        virtMonitor.value.slice(selectStart); // insert start existing part - add symbol - insert existing part after added symbol
      virtMonitor.focus(); // focus on monitor
      selectStart++;
      virtMonitor.setSelectionRange(selectStart, selectStart); // set position for cursor after added symbol in textarea
    } else {
      virtMonitor.value =
        virtMonitor.value.slice(0, selectStart) +
        keySymbol +
        virtMonitor.value.slice(selectEnd); // insert start existing part - change selected to new symbol - insert rest part after selection
      selectStart++;
      virtMonitor.setSelectionRange(selectStart, selectStart);
      virtMonitor.focus();
    }
  },

  deleteInActivePos(keyCode) {
    let virtMonitor = this.virtMonitor;
    let selectStart = virtMonitor.selectionStart;
    let selectEnd = virtMonitor.selectionEnd;
    if (selectStart === selectEnd) {
      if (keyCode === "Delete") {
        virtMonitor.value =
          virtMonitor.value.slice(0, selectStart) +
          virtMonitor.value.slice(selectStart + 1); // insert existing part + insert rest part but taked after current
        virtMonitor.focus();
        virtMonitor.setSelectionRange(selectStart, selectStart);
      }
      if (keyCode === "Backspace") {
        virtMonitor.value =
          virtMonitor.value.slice(0, selectStart - 1) +
          virtMonitor.value.slice(selectStart); // insert existing part - (1 symbol) + insert rest part after current
        virtMonitor.focus();
        --selectStart;
        virtMonitor.setSelectionRange(selectStart, selectStart);
      }
    } else {
      virtMonitor.value =
        virtMonitor.value.slice(0, selectStart) +
        virtMonitor.value.slice(selectEnd); // insert existing part before selection + insert rest part after selection
      virtMonitor.focus();
      virtMonitor.setSelectionRange(selectStart, selectStart);
    }
  },

  changeActivePos(keyCode) {
    let virtMonitor = this.virtMonitor;
    let selectStart = virtMonitor.selectionStart;
    virtMonitor.focus();
    if (keyCode == "ArrowUp") {
    }
    if (keyCode == "ArrowRight") {
      selectStart++;
      virtMonitor.setSelectionRange(selectStart, selectStart);
    }
    if (keyCode == "ArrowDown") {
    }
    if (keyCode == "ArrowLeft") {
      selectStart--;
      virtMonitor.setSelectionRange(selectStart, selectStart);
    }
  },
};

Keyboard.init();