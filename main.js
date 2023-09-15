const keyNames = [
  "esc", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "del",
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "home",
  "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "end",
  "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter", "pgup",
  "lshift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "rshift", "up", "pgdn",
  "lctrl", "super", "lalt", "space", "ralt", "fn", "rctrl", "left", "down", "right"
];

const keys = document.querySelectorAll(".key");
keys.forEach((key, index) => {
  const keyName = keyNames[index];
  key.classList.add(`key_${keyName}`);
});

const escKey = document.querySelector('.key_esc');
const functionKeys = Array.from({ length: 12 }, (_, i) => document.querySelector(`.key_f${i + 1}`));
const deleteKey = document.querySelector('.key_del');

const capsLockKey = document.querySelector('.key_caps');
const leftShiftKey = document.querySelector('.key_lshift');
const rightShiftKey = document.querySelector('.key_rshift');
const leftCtrlKey = document.querySelector('.key_lctrl');
const rightCtrlKey = document.querySelector('.key_rctrl');
const leftAltKey = document.querySelector('.key_lalt');
const rightAltKey = document.querySelector('.key_ralt');
const winKey = document.querySelector('.key_super');
const spaceKey = document.querySelector('.key_space');

const upArrowKey = document.querySelector('.key_up')
const leftArrowKey = document.querySelector('.key_left')
const downArrowKey = document.querySelector('.key_down')
const rightArrowKey = document.querySelector('.key_right')

const homeKey = document.querySelector('.key_home');
const endKey = document.querySelector('.key_end');
const pgUpKey = document.querySelector('.key_pgup');
const pgDnKey = document.querySelector('.key_pgdn');

const body = document.querySelector('body');
const searchForm = document.getElementById('searchForm');
const textInput = document.querySelector('.text');

// Create an object to store the state of key modifiers
const modifierKeys = {
  Escape: escKey,
  Delete: deleteKey,
  CapsLock: capsLockKey,
  ShiftLeft: leftShiftKey,
  ShiftRight: rightShiftKey,
  ControlLeft: leftCtrlKey,
  ControlRight: rightCtrlKey,
  AltLeft: leftAltKey,
  AltRight: rightAltKey,
  OSLeft: winKey,
  Space: spaceKey,
  Home: homeKey,
  End: endKey,
  PageUp: pgUpKey,
  PageDown: pgDnKey,
  ArrowUp: upArrowKey,
  ArrowLeft: leftArrowKey,
  ArrowDown: downArrowKey,
  ArrowRight: rightArrowKey,
};

keys.forEach((key) => {
  const keyText = key.innerText.trim();
  const keySplit = keyText.split('\n');

  key.setAttribute('keyname', keySplit[0].charAt(0).toUpperCase() + keySplit[0].slice(1));

  if (keySplit.length > 1) {
    key.setAttribute('specialKeyname', keySplit[1]);
  }
});

function simulateKeyPress(key) {
  // key.classList.add('active');
  // setTimeout(() => {
  //   key.classList.remove('remove');
  // }, 200);

  const keyEvent = new KeyboardEvent('keydown', { key: key });
  document.dispatchEvent(keyEvent);
  setTimeout(() => {
    const keyEvent2 = new KeyboardEvent('keyup', { key: key });
    document.dispatchEvent(keyEvent2);
  }, 200);

  // console.log(key);

  // if (key.length === 1) {
  //   textInput.value += key;
  // } else if (key === 'Backspace') {
  //   textInput.value = textInput.value.slice(0, -1);
  // }

}

// Add click event listeners to the clickable keys
keys.forEach((key) => {
  key.addEventListener('click', () => {
    let keyName, specialKeyName;

    keyName = key.getAttribute('keyname');

    if (key.getAttribute('specialKeyname')) {
      specialKeyName = key.getAttribute('specialKeyname');
      simulateKeyPress(specialKeyName);
    } else {
      simulateKeyPress(keyName);
    }
  });
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Event listener for key modifiers
document.addEventListener('keydown', (e) => {
  // if ((e.ctrlKey || e.metaKey) && ['tab', 'pageup', 'pagedown', 'q', 'w', 'e', 'r', 't', 'u', 'i', 'o', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'b', 'n', 'm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].includes(e.key.toLowerCase())) {
  //   e.preventDefault();
  // }

  functionKeys.forEach((functionKey, index) => {
    if (e.code === `F${index + 1}`) {
      e.preventDefault();
    }
  });

  keys.forEach((key) => {
    let keyName, specialKeyName;

    keyName = key.getAttribute('keyname');

    if (keyName === "Control" || keyName === "Alt" || keyName === "Shift") return;

    if (key.getAttribute('specialKeyname')) {
      specialKeyName = key.getAttribute('specialKeyname');
      switch (e.key) {
        case specialKeyName:
        case specialKeyName.toLowerCase():
          key.classList.add('active');
          break;
      }
    }

    switch (e.key) {
      case keyName:
      case keyName.toLowerCase():
        key.classList.add('active');
        break;
    }
  });

  switch (e.code) {
    case 'ShiftLeft':
    case 'ShiftRight':
    case 'CapsLock':
    case 'ControlLeft':
    case 'ControlRight':
    case 'AltLeft':
    case 'AltRight':
    case 'OSLeft':
    case 'Escape':
    case 'PageUp':
    case 'PageDown':
    case 'Space':
    case 'Delete':
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowDown':
    case 'ArrowRight':
      modifierKeys[e.code].classList.add('active');
      break;
  }

  functionKeys.forEach((functionKey, index) => {
    if (e.code === `F${index + 1}`) {
      functionKey.classList.add('active');
    }
  });
});

document.addEventListener('keyup', (e) => {
  keys.forEach((key) => {
    let keyName, specialKeyName;

    keyName = key.getAttribute('keyname');

    if (keyName === "Control" || keyName === "Alt" || keyName === "Shift") return;

    if (key.getAttribute('specialKeyname')) {
      specialKeyName = key.getAttribute('specialKeyname');
      switch (e.key) {
        case specialKeyName:
        case specialKeyName.toLowerCase():
          key.classList.remove('active');
          key.classList.add('remove');
          setTimeout(() => {
            key.classList.remove('remove');
          }, 200);
      }
    }

    switch (e.key) {
      case keyName:
      case keyName.toLowerCase():
        key.classList.remove('active');
        key.classList.add('remove');
        setTimeout(() => {
          key.classList.remove('remove');
        }, 200);
    }
  });

  switch (e.code) {
    case 'ShiftLeft':
    case 'ShiftRight':
    case 'CapsLock':
    case 'ControlLeft':
    case 'ControlRight':
    case 'AltLeft':
    case 'AltRight':
    case 'OSLeft':
    case 'Escape':
    case 'PageUp':
    case 'PageDown':
    case 'Space':
    case 'Delete':
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowDown':
    case 'ArrowRight':
      modifierKeys[e.code].classList.remove('active');
      modifierKeys[e.code].classList.add('remove');
      setTimeout(() => {
        modifierKeys[e.code].classList.remove('remove');
      }, 200);
      break;
  }

  functionKeys.forEach((functionKey, index) => {
    if (e.code === `F${index + 1}`) {
      functionKey.classList.remove('active');
      functionKey.classList.add('remove');
      setTimeout(() => {
        functionKey.classList.remove('remove');
      }, 200);
    }
  });
});

function updateDateTime() {
  const displayElement = document.querySelector('.display-inner');
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const dateTimeString = `${hours}:${minutes}:${seconds}`;
  displayElement.textContent = dateTimeString + "\nCMMhero";
}

// Update the date and time every second (1000 milliseconds)
setInterval(updateDateTime, 1000);

// Call the function immediately to display the initial time
updateDateTime();

textInput.focus();
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = textInput.value.trim();

  if (!isValidUrl(query)) {
    searchForm.action = 'https://duckduckgo.com/';
    searchForm.submit();
  }
});

function isValidUrl(url) {
  const pattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;

  if (pattern.test(url)) {
    // Check if the URL starts with "http://" or "https://"
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // If not, prepend "https://"
      url = 'https://' + url;
    }
    window.location.href = url; // Set window.location.href to the valid URL
    return url;
  } else {
    return false;
  }
}
