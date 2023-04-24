let enKeyboard = {
  row1: [
    ['`','~'],
    ['1', '!'],
    ['2', '@'],
    ['3', '#'],
    ['4', '$'],
    ['5', '%'],
    ['6', ':'],
    ['7', '?'],
    ['8', '*'],
    ['9', '('],
    ['0', ')'],
    ['-', '_'],
    ['=', '+'],
    ['Backspace'],
  ],
  row2: [
    ['Tab'],
    ['Q'],
    ['W'],
    ['E'],
    ['R'],
    ['T'],
    ['Y'],
    ['U'],
    ['I'],
    ['O'],
    ['P'],
    ['['],
    [']'],
    ['\\', '/'],
    ['Del'],
  ],
  row3: [
    ['Caps'],
    ['A'],
    ['S'],
    ['D'],
    ['F'],
    ['G'],
    ['H'],
    ['J'],
    ['K'],
    ['L'],
    [';'],
    ['\''],
    ['Enter'],
  ],
  row4: [
    ['Shift'],
    ['Z'],
    ['X'],
    ['C'],
    ['V'],
    ['B'],
    ['N'],
    ['M'],
    [','],
    ['.'],
    ['/'],
    ['▲'],
    ['Shift'],
  ],
  row5: [
    ['Ctrl'],
    ['Win'],
    ['Alt'],
    ['Space'],
    ['Alt'],
    ['Ctrl'],
    ['◄'],
    ['▼'],
    ['►'],
  ],
}

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