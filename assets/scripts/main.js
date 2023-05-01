if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'en');
}

const exceptions = [
  'Backspace',
  'Tab',
  'Delete',
  'CapsLock',
  'Enter',
  'ShiftLeft',
  'ArrowUp',
  'ShiftRight',
  'ControlLeft',
  'AltLeft',
  'Space',
  'AltRight',
  'ControlRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
];

const enKeyboard = {
  Backquote: ['`', '~'],
  Digit1: ['1', '!'],
  Digit2: ['2', '@'],
  Digit3: ['3', '#'],
  Digit4: ['4', '$'],
  Digit5: ['5', '%'],
  Digit6: ['6', '^'],
  Digit7: ['7', '&'],
  Digit8: ['8', '*'],
  Digit9: ['9', '('],
  Digit0: ['0', ')'],
  Minus: ['-', '_'],
  Equal: ['=', '+'],
  Backspace: ['Backspace'],
  Tab: ['Tab'],
  KeyQ: ['Q'],
  KeyW: ['W'],
  KeyE: ['E'],
  KeyR: ['R'],
  KeyT: ['T'],
  KeyY: ['Y'],
  KeyU: ['U'],
  KeyI: ['I'],
  KeyO: ['O'],
  KeyP: ['P'],
  BracketLeft: ['['],
  BracketRight: [']'],
  Backslash: ['\\', '|'],
  Delete: ['Del'],
  CapsLock: ['Caps'],
  KeyA: ['A'],
  KeyS: ['S'],
  KeyD: ['D'],
  KeyF: ['F'],
  KeyG: ['G'],
  KeyH: ['H'],
  KeyJ: ['J'],
  KeyK: ['K'],
  KeyL: ['L'],
  Semicolon: [';'],
  Quote: ['\''],
  Enter: ['Enter'],
  ShiftLeft: ['Shift'],
  KeyZ: ['Z'],
  KeyX: ['X'],
  KeyC: ['C'],
  KeyV: ['V'],
  KeyB: ['B'],
  KeyN: ['N'],
  KeyM: ['M'],
  Comma: ['.'],
  Period: [','],
  ShiftRight: ['Shift'],
  ArrowUp: ['▲'],
  Slash: ['/'],
  ControlLeft: ['Ctrl'],
  ChangeLang: ['RU'],
  AltLeft: ['Alt'],
  Space: ['Space'],
  AltRight: ['Alt'],
  ControlRight: ['Ctrl'],
  ArrowLeft: ['◄'],
  ArrowDown: ['▼'],
  ArrowRight: ['►'],
};

const ruKeyboard = {
  Backquote: ['Ё'],
  Digit1: ['1', '!'],
  Digit2: ['2', '"'],
  Digit3: ['3', '№'],
  Digit4: ['4', ';'],
  Digit5: ['5', '%'],
  Digit6: ['6', ':'],
  Digit7: ['7', '?'],
  Digit8: ['8', '*'],
  Digit9: ['9', '('],
  Digit0: ['0', ')'],
  Minus: ['-', '_'],
  Equal: ['=', '+'],
  Backspace: ['Backspace'],
  Tab: ['Tab'],
  KeyQ: ['Й'],
  KeyW: ['Ц'],
  KeyE: ['У'],
  KeyR: ['К'],
  KeyT: ['Е'],
  KeyY: ['Н'],
  KeyU: ['Г'],
  KeyI: ['Ш'],
  KeyO: ['Щ'],
  KeyP: ['З'],
  BracketLeft: ['Х'],
  BracketRight: ['Ъ'],
  Backslash: ['\\', '/'],
  Delete: ['Del'],
  CapsLock: ['Caps'],
  KeyA: ['Ф'],
  KeyS: ['Ы'],
  KeyD: ['В'],
  KeyF: ['А'],
  KeyG: ['П'],
  KeyH: ['Р'],
  KeyJ: ['О'],
  KeyK: ['Л'],
  KeyL: ['Д'],
  Semicolon: ['Ж'],
  Quote: ['Э'],
  Enter: ['Enter'],
  ShiftLeft: ['Shift'],
  KeyZ: ['Я'],
  KeyX: ['Ч'],
  KeyC: ['С'],
  KeyV: ['М'],
  KeyB: ['И'],
  KeyN: ['Т'],
  KeyM: ['Ь'],
  Comma: ['Б'],
  Period: ['Ю'],
  ShiftRight: ['Shift'],
  ArrowUp: ['▲'],
  Slash: ['.', ','],
  ControlLeft: ['Ctrl'],
  ChangeLang: ['EN'],
  AltLeft: ['Alt'],
  Space: ['Space'],
  AltRight: ['Alt'],
  ControlRight: ['Ctrl'],
  ArrowLeft: ['◄'],
  ArrowDown: ['▼'],
  ArrowRight: ['►'],
};

const Keyboard = {
  virtMonitor: null,
  virtKeyboard: null,
  isCapsOn: false,
  isShiftOn: false,

  init() {
    const virtArea = document.createElement('div');
    const virtMonitor = document.createElement('textarea');
    const virtKeyboard = document.createElement('div');

    this.virtMonitor = virtMonitor;
    this.virtKeyboard = virtKeyboard;

    virtArea.className = 'virt-area';
    virtMonitor.className = 'virt-area__monitor';
    virtKeyboard.className = 'virt-area__keyboard';

    document.body.append(virtArea);
    virtArea.append(virtMonitor, virtKeyboard);

    if (localStorage.getItem('lang') === 'en') this.makeKeyboard(enKeyboard);
    if (localStorage.getItem('lang') === 'ru') this.makeKeyboard(ruKeyboard);
  },

  makeKeyboard(layout) {
    const keyboardKeys = Object.keys(layout);
    const keyboardSymbols = Object.values(layout);
    for (let i = 0; i < keyboardKeys.length; i += 1) {
      this.createKeyboardKey(keyboardKeys[i], keyboardSymbols[i]);
    }
  },

  createKeyboardKey(keyCode, symbols) {
    const [primaryKey, secondaryKey] = symbols;

    const keyboardKey = document.createElement('div');
    const symbolPrimary = document.createElement('span');
    const symbolSecondary = document.createElement('span');

    keyboardKey.setAttribute('id', `key-${keyCode.toLowerCase()}`);
    keyboardKey.className = 'keyboard__key';
    symbolPrimary.className = 'keyboard__symbol keyboard__symbol_primary';
    symbolSecondary.className = 'keyboard__symbol keyboard__symbol_secondary';

    this.virtKeyboard.append(keyboardKey);
    keyboardKey.append(symbolPrimary, symbolSecondary);

    symbolPrimary.innerHTML = primaryKey;
    symbolSecondary.innerHTML = !secondaryKey ? '' : secondaryKey;

    keyboardKey.addEventListener('mousedown', () => {
      keyboardKey.classList.add('keyboard__key_active');
      setTimeout(
        () => keyboardKey.classList.remove('keyboard__key_active'),
        250,
      );
    });

    switch (keyCode) {
      case 'ControlLeft':
      case 'AltLeft':
      case 'AltRight':
      case 'ControlRight':
        break;
      case 'Delete':
        keyboardKey.addEventListener('click', () => {
          this.deleteInActivePos(keyCode);
        });
        break;
      case 'Backspace':
        keyboardKey.addEventListener('click', () => {
          this.deleteInActivePos(keyCode);
        });
        break;
      case 'Tab':
        keyboardKey.addEventListener('click', () => {
          this.insertInActivePos('\t');
        });
        break;
      case 'CapsLock': {
        const indicator = document.createElement('span');
        indicator.className = 'capslock-indicator';
        keyboardKey.append(indicator);
        keyboardKey.addEventListener('click', () => {
          this.isCapsOn = !this.isCapsOn;
          indicator.classList.toggle('capslock-indicator_active');
        });
        break;
      }
      case 'Enter':
        keyboardKey.addEventListener('click', () => {
          this.insertInActivePos('\n');
        });
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        keyboardKey.addEventListener('click', () => {
          this.isShiftOn = !this.isShiftOn;
        });
        break;
      case 'ChangeLang':
        keyboardKey.addEventListener('click', () => {
          const lang = keyboardKey.querySelector('.keyboard__symbol_primary').textContent;
          this.changeLang(lang);
        });
        break;
      case 'Space':
        keyboardKey.addEventListener('click', () => {
          this.insertInActivePos(' ');
        });
        break;
      default:
        keyboardKey.addEventListener('click', (e) => {
          let keySymbol = primaryKey.toLowerCase();
          if (this.isCapsOn) {
            keySymbol = primaryKey.toUpperCase();
          }
          if (this.isShiftOn || e.shiftKey) {
            if (primaryKey.toLowerCase() === keySymbol) {
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
    const { virtMonitor } = this;
    let selectStart = virtMonitor.selectionStart;
    const selectEnd = virtMonitor.selectionEnd;
    if (selectStart === selectEnd) {
      virtMonitor.value = virtMonitor.value.slice(0, selectStart)
                          + keySymbol
                          + virtMonitor.value.slice(selectStart);
      virtMonitor.focus();
      selectStart += 1;
      virtMonitor.setSelectionRange(selectStart, selectStart);
    } else {
      virtMonitor.value = virtMonitor.value.slice(0, selectStart)
                          + keySymbol
                          + virtMonitor.value.slice(selectEnd);
      selectStart += 1;
      virtMonitor.setSelectionRange(selectStart, selectStart);
      virtMonitor.focus();
    }
  },

  deleteInActivePos(keyCode) {
    const { virtMonitor } = this;
    let selectStart = virtMonitor.selectionStart;
    const selectEnd = virtMonitor.selectionEnd;
    if (selectStart === selectEnd) {
      if (keyCode === 'Delete') {
        virtMonitor.value = virtMonitor.value.slice(0, selectStart)
                            + virtMonitor.value.slice(selectStart + 1);
        virtMonitor.focus();
        virtMonitor.setSelectionRange(selectStart, selectStart);
      }
      if (keyCode === 'Backspace') {
        virtMonitor.value = virtMonitor.value.slice(0, selectStart - 1)
                            + virtMonitor.value.slice(selectStart);
        virtMonitor.focus();
        selectStart -= 1;
        virtMonitor.setSelectionRange(selectStart, selectStart);
      }
    } else {
      virtMonitor.value = virtMonitor.value.slice(0, selectStart)
                          + virtMonitor.value.slice(selectEnd);
      virtMonitor.focus();
      virtMonitor.setSelectionRange(selectStart, selectStart);
    }
  },

  changeLang(lang) {
    let keyboardKeys;
    let keyboardSymbols;
    let keyboardKey;
    if (lang === 'RU') {
      keyboardKeys = Object.keys(ruKeyboard);
      keyboardSymbols = Object.values(ruKeyboard);
      localStorage.setItem('lang', lang.toLowerCase());
    }
    if (lang === 'EN') {
      keyboardKeys = Object.keys(enKeyboard);
      keyboardSymbols = Object.values(enKeyboard);
      localStorage.setItem('lang', lang.toLowerCase());
    }
    keyboardKeys.forEach((keyCode, i) => {
      if (exceptions.indexOf(keyCode) !== -1) {
        return;
      }
      const [primaryKey, secondaryKey] = keyboardSymbols[i];
      keyboardKey = document.getElementById(`key-${keyCode.toLowerCase()}`);
      keyboardKey.querySelector('.keyboard__symbol_primary').textContent = primaryKey;
      keyboardKey.querySelector('.keyboard__symbol_secondary').textContent = secondaryKey;
    });
  },

  setPhysListeners() {
    document.addEventListener('keydown', (e) => {
      const idPhysKey = `key-${e.code.toLowerCase()}`;
      if (document.getElementById(idPhysKey)) {
        if (!e.repeat) {
          document
            .getElementById(idPhysKey)
            .classList.add('keyboard__key_active');
        }
        if (e.code === 'CapsLock' && !e.repeat) {
          document.getElementById(idPhysKey).click();
        } else if (((e.code === 'ShiftLeft' || e.code === 'ShiftRight') || (e.code === 'AltLeft' && e.shiftKey))
                  && e.altKey && !e.repeat) {
          document.getElementById('key-changelang').click();
        } else if (e.ctrlKey) {
          return false;
        } else {
          e.preventDefault();
          if (e.shiftKey) Keyboard.isShiftOn = true;
          if (e.shiftKey && e.altKey) return false;
          document.getElementById(idPhysKey).click();
        }
      }
      return false;
    });

    document.addEventListener('keyup', (e) => {
      const idPhysKey = `key-${e.code.toLowerCase()}`;
      if (document.getElementById(idPhysKey)) {
        document
          .getElementById(idPhysKey)
          .classList.remove('keyboard__key_active');
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
          Keyboard.isShiftOn = false;
        }
      }
    });
  },
};

Keyboard.init();
Keyboard.setPhysListeners();

function info() {
  const langInfo = document.createElement('span');
  langInfo.className = 'virt-area__info';
  document.querySelector('.virt-area').append(langInfo);
  langInfo.textContent = '?';

  langInfo.addEventListener('click', () => {
    // eslint-disable-next-line no-alert
    alert('To change language press shift + alt \nThis keyboard was made on Windows');
  });
}

info();
