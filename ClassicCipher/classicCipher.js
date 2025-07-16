
// Toggle key input field based on cipher choice
function toggleKeyInput() {
    const cipher = document.getElementById("cipher").value;
    const keyInput = document.getElementById("keyInput");
    if (cipher === 'atbash') {
        keyInput.style.display = 'none';
    } 
    else {
        keyInput.style.display = 'inline-block';
    }
}

// Caesar Cipher
function caesar(text, shift, decrypt = false) {
    //If decrypting, invert the shift value
    if (decrypt) {
        shift = -shift;
    }

    return text.replace(/[a-z]/gi, (char) => {
        //Determine if the character is uppercase or lowercase
        let base;
        if (char <= 'Z') {
          base = 65; //Uppercase
        } 
        else {
          base = 97; //Lowercase
        }
        //Encrypt or decrypt character
        return String.fromCharCode(((char.charCodeAt(0) - base + shift + 26) % 26) + base);
    });
}

//Atbash Cipher
function atbash(text) {
    // If the character is a letter (capital or lowercase)
    return text.replace(/[a-z]/gi, (char) => {
        //Determine if the character is uppercase or lowercase
        let base;
        if (char <= 'Z') {
          base = 65; //Uppercase
        } 
        else {
          base = 97; //Lowercase
        }
        //Encrypt or decrypt character
        return String.fromCharCode(25 - (char.charCodeAt(0) - base) + base);
    });
}

// Vigenère Cipher
function vigenere(text, key, decrypt = false) {
    key = key.toLowerCase().replace(/[^a-z]/g, '');
    if (!key.length) return text;

    let result = '', keyIndex = 0;

    //Loop through each character in the input text
    for (let i = 0; i < text.length; i++) {
        const c = text[i];

        //If the character is a letter (capital or lowercase)
        if (c.match(/[a-z]/i)) {
          // Determine if the character is uppercase or lowercase
          let base;
          if (c <= 'Z') {
            base = 65; //Uppercase
          } 
          else {
            base = 97; //Lowercase
          }

        //Get the shift amount from the corresponding key character
        //Convert key character to 0–25 range (a=0, b=1, ..., z=25)
        const keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 97;
        keyIndex++;

        //Determine the direction of the shift
        let shift;
        if (decrypt) {
          shift = -keyCharCode; //Reverse shift for decryption
        } 
        else {
          shift = keyCharCode; //Forward shift for encryption
        } 

        //Encrypt or decrypt the character
        const newChar = String.fromCharCode(((c.charCodeAt(0) - base + shift + 26) % 26) + base);
        result += newChar; // Add processed character to result
      } 
      else {
        result += c; // Non-alphabetic characters stay unchanged
      }
    }
  //Return final string
  return result;
}

// Main functions for encryption and decryption
function encrypt() {
    const text = document.getElementById("inputText").value;
    const cipher = document.getElementById("cipher").value;
    const key = document.getElementById("keyInput").value;
    let result = "";

    if (cipher === "caesar") {
        const shift = parseInt(key) || 0;
        result = caesar(text, shift, false);
    } 
    else if (cipher === "atbash") {
        result = atbash(text);
    } 
    else if (cipher === "vigenere") {
        result = vigenere(text, key, false);
    }

    document.getElementById("output").textContent = result;
}

// Decryption function
function decrypt() {
    const text = document.getElementById("inputText").value;
    const cipher = document.getElementById("cipher").value;
    const key = document.getElementById("keyInput").value;
    let result = "";

    if (cipher === "caesar") {
        const shift = parseInt(key) || 0;
        result = caesar(text, shift, true);
    } 
    else if (cipher === "atbash") {
        result = atbash(text); 
    } 
    else if (cipher === "vigenere") {
        result = vigenere(text, key, true);
    }

    document.getElementById("output").textContent = result;
}

// Initialize UI
toggleKeyInput();
