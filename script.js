// Assignment code here
const passwordCrit = {};
const passChars = ['lowercase', 'uppercase', 'numeric', 'special'];
const passCharsCrit = [];

const lowerCaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; // 26
const upperCaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 10
const numericChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specialChars = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']; // 33

const passCharList = [];

const generatedPassword = [];

const randomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const passwordLengthPrompt = () => {
  const passLength = prompt("How many characters should the password be? Please enter a value between 8 and 128.");
    
  if (!passLength || parseInt(passLength) < 8 || parseInt(passLength) > 128) {
    alert("Please enter a valid length between 8 and 128 characters!");
    return passwordLengthPrompt();
  } else {
    passwordCrit.length = parseInt(passLength);
  }
};

const passwordCharPrompt = () => {
  alert("Which character type(s) should the password include? Please choose at least one of the following: lowercase, uppercase, numeric, or special characters.");
  
  for (const type of passChars) {
    const charPrompt = () => {
      const charChoice = prompt("Should the password include " + type + " characters?", "Yes or No");
      
      if (!charChoice || charChoice.toLowerCase() !== "no" && charChoice.toLowerCase() !== "yes") {
        alert('Please enter "yes" or "no"!');
    
        return charPrompt();
      } else if (charChoice.toLowerCase() === "yes") {
        passCharsCrit.push(type);
      }
    };
    
    charPrompt();
  }
  
  if (passCharsCrit.length == 0) {
    alert("You must choose at least one of the character types!");
    
    passwordCharPrompt();
  }
  
  if (passCharsCrit.includes('lowercase')) {
    passCharList.push(...lowerCaseChars);
  } if (passCharsCrit.includes('uppercase')) {
    passCharList.push(...upperCaseChars);
  } if (passCharsCrit.includes('numeric')) {
    passCharList.push(...numericChars);
  } if (passCharsCrit.includes('special')) {
    passCharList.push(...specialChars);
  }
};

passwordLengthPrompt();

passwordCharPrompt();

const generatePassword = () => {
  while (passwordCrit.length > 0) {
    generatedPassword.push(passCharList[randomInteger(0, passCharList.length)]);
    
    passwordCrit.length--;
  }

  return generatedPassword.join('');
};

// Get references to the #generate element
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
const writePassword = () => {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");
  
  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);