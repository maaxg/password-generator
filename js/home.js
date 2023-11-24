const slider = document.getElementById("slider");
const sliderValue = document.getElementById("character-length");
const copyPassword = document.getElementById("copy-password");
const form = document.getElementById("form");

const UPPERCASE_CHAR_CODES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHAR_CODES = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHAR_CODES = "0123456789";
const SYMBOL_CHAR_CODES = "!@#$%^&*()_+";

copyPassword.addEventListener("click", (evt) => {
  evt.preventDefault();
  const password = document.getElementById("password");

  navigator.clipboard.writeText(password.innerText);
  alert("Password copied to clipboard");
});

slider.addEventListener("input", (e) => {
  sliderValue.innerText = e.target.value;
  slider.classList.add("bg-color");
});

function generatePassword(upperCase, lowerCase, numbers, symbols) {
  const length = document.getElementById("slider").value;
  const password = document.getElementById("password");

  let charCodes = "";
  if (upperCase) {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  }
  if (lowerCase) {
    charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
  }
  if (numbers) {
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  }
  if (symbols) {
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  }

  let passwordCharacters = "";
  for (let i = 0; i < length; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters += characterCode;
  }

  password.innerText = passwordCharacters;
}

function defineStrengthLevel(upperCase, lowerCase, numbers, symbols) {
  const strengthLevel = document.getElementById("strength-level");
  const bars = document.querySelectorAll(".strength-bar");

  bars.forEach((bar) => {
    bar.classList.remove("strength-bar-strong");
    bar.classList.remove("strength-bar-medium");
    bar.classList.remove("strength-bar-weak");
  });

  let strengthLevelValue = 0;
  if (upperCase) {
    strengthLevelValue += 1;
  }
  if (lowerCase) {
    strengthLevelValue += 1;
  }
  if (numbers) {
    strengthLevelValue += 1;
  }
  if (symbols) {
    strengthLevelValue += 1;
  }

  switch (strengthLevelValue) {
    case 2: {
      strengthLevel.innerText = "WEAK";
      break;
    }
    case 3: {
      strengthLevel.innerText = "MEDIUM";
      break;
    }
    case 4: {
      strengthLevel.innerText = "STRONG";
      break;
    }
    default: {
      strengthLevel.innerText = "TOO WEAK";
      break;
    }
  }

  for (let i = 0; i < strengthLevelValue; i++) {
    if (strengthLevelValue === 4) {
      bars[i].classList.add("strength-bar-strong");
    }
    if (strengthLevelValue === 3) {
      bars[i].classList.add("strength-bar-medium");
    }
    if (strengthLevelValue === 2) {
      bars[i].classList.add("strength-bar-weak");
    }
  }

  //strengthLevel.innerText = strengthLevelValue;
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const upperCase = document.getElementById("upper-case").checked;
  const lowerCase = document.getElementById("lower-case").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  if (!upperCase && !lowerCase && !numbers && !symbols) {
    alert("Please select atleast one option");
    return;
  }
  defineStrengthLevel(upperCase, lowerCase, numbers, symbols);
  generatePassword(upperCase, lowerCase, numbers, symbols);
});
