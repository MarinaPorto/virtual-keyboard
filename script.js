const keyboardKeys = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', "Delete"],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'IntlBackslash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'OSLeft', 'AltLeft', "Space", 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
]

const keyboard = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Back'],
  ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Delete"],
  ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", 'Enter'],
  ['Shift &#8679', "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '&#5123', 'Shift &#8679'],
  ['Ctrl', 'Win', 'Alt', "Space", 'Alt', '&#5130', '&#5121', '&#5125', 'Ctrl'],
]

const keyboardRu = [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Back'],
  ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Delete"],
  ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'Enter'],
  ['Shift &#8679', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '&#5123', 'Shift &#8679'],
  ['Ctrl', 'Win', 'Alt', "Space", 'Alt', '&#5130', '&#5121', '&#5125', 'Ctrl'],
]

const keyboardRuShift = [
  ["Ё", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Back'],
  ['Tab', "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", "Delete"],
  ['CapsLock', "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", 'Enter'],
  ['Shift &#8679', "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", '&#5123', 'Shift &#8679'],
  ['Ctrl', 'Win', 'Alt', "Space", 'Alt', '&#5130', '&#5121', '&#5125', 'Ctrl'],
]

const keyboardShift = [
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Back'],
  ['Tab', "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Delete"],
  ['CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "'", 'Enter'],
  ['Shift &#8679', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", '&#5123', 'Shift &#8679'],
  ['Ctrl', 'Win', 'Alt', "Space", 'Alt', '&#5130', '&#5121', '&#5125', 'Ctrl'],
]


document.body.innerHTML = `<div class="wrapper">
<textarea class="use-keyboard-input" placeholder="Click here"></textarea>
<p class="text">Клавиатура создана в операционной системе Windows <br> Для переключения языка комбинация: левыe ctrl + alt</p>
<div class="keybord-wrapper"></div>
</div>`

let divWrapper = document.querySelector(".wrapper")
let keyboardWrapper = document.querySelector(".keybord-wrapper")
let textarea = document.querySelector(".use-keyboard-input")
let cursorPosition = 0;
let capsLockStatus = false;
let shiftStatus = false;
let languageStatus = false;
let language = localStorage.getItem('language') !== null ? localStorage.getItem('language') : "eng";

if (language === "ru") {
  createKeyboardLayout(keyboardRu)
} else {
  createKeyboardLayout(keyboard)
}

document.addEventListener('mousedown', event => {
  if (event.target.id === "shiftLeft" && !languageStatus) {
    createKeyboardLayout(keyboardShift)
    document.querySelector('.keybord_row .keyboard-btn[data = "ShiftLeft"]').classList.add('btn-active');
  } else if (event.target.id === "shiftRight" && !languageStatus) {
    createKeyboardLayout(keyboardShift)
    document.querySelector('.keybord_row .keyboard-btn[data = "ShiftRight"]').classList.add('btn-active');
  } else if (event.target.id === "shiftRight" && languageStatus) {
    createKeyboardLayout(keyboardRuShift)
    document.querySelector('.keybord_row .keyboard-btn[data = "ShiftRight"]').classList.add('btn-active');
  } else if (event.target.id === "shiftLeft" && languageStatus) {
    createKeyboardLayout(keyboardRuShift)
    document.querySelector('.keybord_row .keyboard-btn[data = "ShiftLeft"]').classList.add('btn-active');
  }
})

document.addEventListener('mouseup', (event) => {
  if (event.target.id === "shiftLeft" || event.target.id === "shiftRight") {
    document.querySelector('.keybord_row .keyboard-btn[data = "ShiftLeft"]').classList.remove('btn-active');
    createKeyboardLayout(keyboard)
  }
  if (event.target.id === "shiftLeft" && languageStatus || event.target.id === "shiftRight" && languageStatus) {
    document.querySelector('.keybord_row .keyboard-btn[data = "ShiftLeft"]').classList.remove('btn-active');
    createKeyboardLayout(keyboardRu)
  }
})

document.addEventListener("keydown", function (event) {
  if (event.code === "ShiftLeft" && !languageStatus || event.code === "ShiftRight" && !languageStatus) {
    createKeyboardLayout(keyboardShift)
  } else if ((event.code === "ShiftLeft" && languageStatus) || (event.code === "ShiftRight" && languageStatus)) {
    createKeyboardLayout(keyboardRuShift)
  }
  document.querySelector('.keybord_row .keyboard-btn[data = "' + event.code + '"]').classList.add('btn-active');
  if (event.ctrlKey && event.code === "AltLeft" && !languageStatus) {
    createKeyboardLayout(keyboardRu);
    document.querySelector('.keybord_row .keyboard-btn[data = "' + event.code + '"]').classList.add('btn-active');
    languageStatus = true
    localStorage.setItem('language', "ru");
  } else if (event.ctrlKey && event.code === "AltLeft" && languageStatus) {
    createKeyboardLayout(keyboard);
    languageStatus = false
    localStorage.setItem('language', "eng");
  }
})

document.addEventListener("keyup", function (event) {
  if (event.code === "ShiftLeft" && !languageStatus || event.code === "ShiftRight" && !languageStatus) {
    createKeyboardLayout(keyboard)
  } else if (event.code === "ShiftLeft" && languageStatus || event.code === "ShiftRight" && languageStatus) {
    createKeyboardLayout(keyboardRu)
  }
})

document.addEventListener("keyup", function (event) {
  if (event.code === "CapsLock") {
    if (capsLockStatus === false) {
      upperText()
    } else {
      lowerCase()
    }
  }
  else {
    document.querySelector('.keybord_row .keyboard-btn[data = "' + event.code + '"]').classList.remove('btn-active');
  }
})

function getCursorPosition(text) {
  let start = textarea.selectionStart;
  let end = textarea.selectionEnd;
  let spaceSimbol = text
  let newText = textarea.value.substring(0, start) + spaceSimbol + textarea.value.substring(end)
  textarea.value = newText
  textarea.focus();
  textarea.selectionEnd = (start == end) ? (end + spaceSimbol.length) : end;
}

function upperText() {
  capsLockStatus = true
  document.querySelector('.keybord_row .keyboard-btn[data = "CapsLock"]').classList.add('btn-active-caps');
  const listDataElements = keyboardWrapper.querySelectorAll("[data-key]")
  listDataElements.forEach((el => {
    el.innerHTML = el.innerHTML.toUpperCase()
  }))
}

function lowerCase() {
  capsLockStatus = false
  const listDataElements = keyboardWrapper.querySelectorAll("[data-key]")
  listDataElements.forEach((el => {
    el.innerHTML = el.innerHTML.toLowerCase()
  }))
  document.querySelector('.keybord_row .keyboard-btn[data = "CapsLock"]').classList.remove('btn-active-caps');
  document.querySelector('.keybord_row .keyboard-btn[data = "CapsLock"]').classList.remove('btn-active');
}

function pressCaps() {
  let capsBtn = document.getElementById('caps')
  capsBtn.addEventListener('click', () => {
    if (capsLockStatus === false) {
      upperText()
    } else if (capsLockStatus === true) {
      lowerCase()
    }
  })
}

function createKeyboardLayout(keyboard) {
  let virtualKeyboardRow = "";
  let keyboardBtn = "";
  keyboard.forEach((row, rowIndex) => {
    virtualKeyboardRow += '<div class = "keybord_row">'
    row.forEach((key, keyIndex) => {
      if (key === "CapsLock") {
        keyboardBtn = '<div class="keyboard-btn" id="caps"  data = "' + keyboardKeys[rowIndex][keyIndex] + '">' + `${key}` + '</div>'
        virtualKeyboardRow += keyboardBtn;
      } else if (keyboardKeys[rowIndex][keyIndex].includes("Key")) {
        keyboardBtn = '<div class="keyboard-btn"  data = "' + keyboardKeys[rowIndex][keyIndex] + '"  data-key = "key">' + `${key}` + '</div>'
        virtualKeyboardRow += keyboardBtn;
      } else if (keyboardKeys[rowIndex][keyIndex] === "ShiftLeft") {
        keyboardBtn = '<div class="keyboard-btn" id="shiftLeft"  data = "' + keyboardKeys[rowIndex][keyIndex] + '">' + `${key}` + '</div>'
        virtualKeyboardRow += keyboardBtn;
      } else if (keyboardKeys[rowIndex][keyIndex] === "ShiftRight") {
        keyboardBtn = '<div class="keyboard-btn" id="shiftRight"  data = "' + keyboardKeys[rowIndex][keyIndex] + '">' + `${key}` + '</div>'
        virtualKeyboardRow += keyboardBtn;
      } else if (keyboardKeys[rowIndex][keyIndex] === "Space") {
        keyboardBtn = '<div class="keyboard-btn space" id="space"  data = "' + keyboardKeys[rowIndex][keyIndex] + '">' + `${key}` + '</div>'
        virtualKeyboardRow += keyboardBtn;
      } else if (keyboardKeys[rowIndex][keyIndex] === "Enter") {
        keyboardBtn = '<div class="keyboard-btn" id="enter"  data = "' + keyboardKeys[rowIndex][keyIndex] + '">' + `${key}` + '</div>'
        virtualKeyboardRow += keyboardBtn;
      } else {
        keyboardBtn = '<div class="keyboard-btn" data = "' + keyboardKeys[rowIndex][keyIndex] + '">' + `${key}` + '</div>'
        virtualKeyboardRow += keyboardBtn;
      }

    })
    virtualKeyboardRow += '</div>'
  })
  keyboardWrapper.innerHTML = virtualKeyboardRow
  pressBtns()
  pressCaps()
}

function pressBtns() {
  document.querySelectorAll('.keybord_row .keyboard-btn').forEach(element => {
    element.addEventListener('mousedown', function (event) {
      document.querySelectorAll('.keybord_row .keyboard-btn').forEach(element => {
        element.classList.remove('btn-active');
      });
      this.classList.add('btn-active');
    })
    element.addEventListener('mouseup', function (event) {
      document.querySelectorAll('.keybord_row .keyboard-btn').forEach(element => {
        element.classList.remove('btn-active');
      });
    })
  })

  document.querySelectorAll('.keybord_row .keyboard-btn').forEach(element => {
    element.addEventListener('click', function (event) {
      let keyValue = this.innerText
      if (keyValue === "Space") {
        getCursorPosition(" ")
      } else if (keyValue === "Enter") {
        getCursorPosition('\n')
      }
      else if (keyValue === 'Back') {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let newText = textarea.value.slice(0, end - 1) + textarea.value.substring(end)
        textarea.value = newText
        textarea.focus();
        textarea.selectionEnd = (start == end) ? (end - 1) : end;
      }
      else if (keyValue === "Delete") {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let newText = textarea.value.slice(0, end) + textarea.value.substring(end + 1)
        textarea.value = newText
        textarea.focus();
        textarea.selectionEnd = (start == end) ? (end) : end;
      } else if (keyValue === "Tab") {
        getCursorPosition('    ')
      }
      else if (keyValue === 'CapsLock' || keyValue === 'Win' || keyValue === 'Alt' || keyValue === 'Ctrl') {
        textarea.value += ""
      }
      else {
        getCursorPosition(keyValue)
      }
    })
  })
}

