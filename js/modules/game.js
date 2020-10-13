import Home from "./home.js";
import {
    sound
} from './../data/sound.js'

const Game = (_ => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const wordcreater = _ => {
        let wordlist = ("apple ball africa europe bali mountain surfing book laptop smartphone college university developer javascript java gum postcard pencil poland");
        return wordlist.split(" ");
    }
    const words = wordcreater();
    let chosenWord;
    let guessingWord;
    let lives;
    let guesses;

    //cache the DOM
    const $hangman = document.querySelector(".hangman");

    const init = _ => {
        //1. choose a word
        chosenWord = chooseWord();
        //console.log(chosenWord);
        //2. buils out our guessing word to render
        guessingWord = Array(chosenWord.length).fill("_");
        console.log(chosenWord);
        //console.log(guessingWord);
        guesses = [];
        lives = 7;
        // render page
        showInitPage();
        listeners();
    }

    const listeners = _ => {
        $hangman.addEventListener("click", e => {
            if (e.target.matches(".hangman__letter")) {
                sound.click.play();
                check(e.target.innerHTML);
                //console.log(e.target.innerHTML);
            }

            if (e.target.matches(".hangman__trigger")) {
                Home.init();
                sound.click.play();
            }
        })
    }

    const isAlreadyTaken = letter => {
        return guesses.includes(letter);
    }


    const check = guess => {
        if (chosenWord.includes(guess)) {
            console.log("guessed right")
        } else {
            console.log("oops");
            lives--;
        }
    }
    //const check = guess => {
    //    console.log("check");
    //    if (isAlreadyTaken(guess)) return;
    //
    //    guesses.push(guess);
    //
    //    //check if the guess exists in chosenWord
    //    if (chosenWord.includes(guess)) {
    //        // update guessing word
    //        console.log("hi");
    //        updateGuessingWord(guess);
    //        console.log(guessingWord);
    //    } else {
    //        lives--
    //        // render the board
    //
    //    }
    //    // render();
    //    // check if game is over
    //}

    const updateGuessingWord = guess => {
        console.log("updateGuessingWord")
    }

    //  const updateGuessingWord = letter => {
    //      console.log("update guess works as well")
    //      chosenWord.split("").forEach((elem, index) => {
    //          if (elem === letter) {
    //              console.log("elem=letter")
    //              guessingWord[index] = elem;
    //          }
    //      }); 
    //  }

    const showInitPage = _ => {
        let markup = `
        <p class="hangman__stats">Lives:
            <span class="hangman__lives">${lives}</span>
        </p>
        <h1 class="hangman__title">Hangman</h1>
        <canvas class="hangman__board" height="155px"></canvas>
        <div class="hangman__word">${guessingWord.join("")}</div>
        <p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
        <ul class="hangman__letters">
        ${createLetters()}
        </ul>
        <button class="button hangman__trigger"> Main Menu</button>
        `
        return $hangman.innerHTML = markup;
    }

    const createLetters = _ => {
        let markup = ``;
        for (let letter of letters) {
            markup += `
            <li class="hangman__letter"> ${letter} </li>
            `
        }
        return markup;
    }






    const chooseWord = _ => {
        let randomNumber = Math.floor(Math.random() * words.length);
        return words[randomNumber];
    }



    return {
        init
    }
})();

export default Game;