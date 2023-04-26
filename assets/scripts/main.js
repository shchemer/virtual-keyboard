let enKeyboard = {
'Backquote': ["`", "~"],
'Digit1': ["1", "!"],
'Digit2': ["2", "@"],
'Digit3': ["3", "#"],
'Digit4': ["4", "$"],
'Digit5': ["5", "%"],
'Digit6': ["6", ":"],
'Digit7': ["7", "?"],
'Digit8': ["8", "*"],
'Digit9': ["9", "("],
'Digit0': ["0", ")"],
'Minus': ["-", "_"],
'Equal': ["=", "+"],
'Backspace': ["Backspace"],
'Tab': ["Tab"],
'KeyQ': ["Q"],
'KeyW': ["W"],
'KeyE': ["E"],
'KeyR': ["R"],
'KeyT': ["T"],
'KeyY': ["Y"],
'KeyU': ["U"],
'KeyI': ["I"],
'KeyO': ["O"],
'KeyP': ["P"],
'BracketLeft': ["["],
'BracketRight': ["]"],
'Backslash': ["\\", "/"],
'Delete': ["Del"],
'CapsLock': ["Caps"],
'KeyA': ["A"],
'KeyS': ["S"],
'KeyD': ["D"],
'KeyF': ["F"],
'KeyG': ["G"],
'KeyH': ["H"],
'KeyJ': ["J"],
'KeyK': ["K"],
'KeyL': ["L"],
'Semicolon': [";"],
'Quote': ["'"],
'Enter': ["Enter"],
'ShiftLeft': ["Shift"],
'KeyZ': ["Z"],
'KeyX': ["X"],
'KeyC': ["C"],
'KeyV': ["V"],
'KeyB': ["B"],
'KeyN': ["N"],
'KeyM': ["M"],
'Comma': ["."],
'Period': [","],
'Slash': ["/"],
'ArrowUp': ["▲"],
'ShiftRight': ["Shift"],
'ControlLeft': ["Ctrl"],
'MetaLeft': ["Win"],
'AltLeft': ["Alt"],
'Space': ["Space"],
'AltRight': ["Alt"],
'ControlRight': ["Ctrl"],
'ArrowLeft': ["◄"],
'ArrowDown': ["▼"],
'ArrowRight': ["►"],
};

let body = document.querySelector("body");
let virtArea = document.createElement("div");
let virtMonitor = document.createElement("textarea");
let virtKeyboard = document.createElement("div");

virtArea.className = "virt-area";
virtMonitor.className = "virt-area__monitor";
virtKeyboard.className = "virt-area__keyboard";

body.append(virtArea);
virtArea.append(virtMonitor, virtKeyboard);

function makeKeyboard(layout) {
  let keyboardRows = Object.keys(layout);
  let keyboardRowsLength = keyboardRows.length;
  for (let i = 0; i < keyboardRowsLength; i++) {
    let keyboardRow = createKeyboardRow();
    for (let key of layout[keyboardRows[i]]) {
      createKeyboardKey(keyboardRow, key);
    }
  }
}

function createKeyboardRow() {
  let keyboardRow = document.createElement("div");
  keyboardRow.className = "keyboard__row";
  virtKeyboard.append(keyboardRow);
  return keyboardRow;
}

function createKeyboardKey(keyboardRow, key) {
  let [primaryKey, secondaryKey] = key;

  let keyboardKey = document.createElement("div");
  let symbolPrimary = document.createElement("span");
  let symbolSecondary = document.createElement("span");

  keyboardKey.className = "keyboard__key";
  symbolPrimary.className = "keyboard__symbol keyboard__symbol_primary";
  symbolSecondary.className = "keyboard__symbol keyboard__symbol_secondary";

  keyboardRow.append(keyboardKey);
  keyboardKey.append(symbolPrimary, symbolSecondary);

  symbolPrimary.innerHTML = primaryKey;
  symbolSecondary.innerHTML = (!secondaryKey) ? '' : secondaryKey;
}

makeKeyboard(enKeyboard);