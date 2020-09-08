const Game = (_ => {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
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
       let randomNumber =  Math.floor(Math.random() * words.length);
       return words[randomNumber];
    }

    const init = _ => {
        //1. choose a word
        chosenWord = chooseWord();
        //2. buils out our guessing word to render
        guessingWord = Array(chosenWord.length).fill("_");
        //console.log(chosenWord);
        //console.log(guessingWord);
        guesses = [];
        lives = 7;
        // render page
        showInitPage();
    }

    return {
        init
    }
})();

export default Game;