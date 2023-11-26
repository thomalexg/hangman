import { sound } from './../data/sound.js';
import Board from './board.js';
import End from './end.js';
import Home from './home.js';

const Game = ((_) => {
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const wordcreater = (_) => {
    let wordlist =
      'apple ball africa europe bali mountain surfing book laptop smartphone college university developer javascript java gum postcard pencil poland';
    return wordlist.split(' ');
  };
  const words = wordcreater();
  let chosenWord;
  let guessingWord;
  let lives;
  let guesses;

  //cache the DOM
  const $hangman = document.querySelector('.hangman');

  const init = async (_) => {
    // 1. choose a word
    const word = await randomWord();
    chosenWord = word;
    // chosenWord = chooseWord();
    // 2. build out our own word to render
    guessingWord = Array(chosenWord.length).fill('_');
    guesses = [];
    lives = 7;
    // 3. show initial screen or page
    showInitPage();
    listeners();
    Board.init();
  };

  const listeners = (_) => {
    $hangman.addEventListener('click', (event) => {
      if (event.target.matches('.hangman__letter')) {
        sound.click.play();
        check(event.target.innerHTML);
      }
      if (event.target.matches('.hangman__trigger')) {
        sound.click.play();
        Home.init();
      }
    });
  };

  const isAlreadyTaken = (letter) => {
    return guesses.includes(letter);
  };
  const check = (guess) => {
    if (isAlreadyTaken(guess)) return;

    guesses.push(guess);

    //check if the guess exists in chosenword
    if (chosenWord.includes(guess)) {
      // update the guessing word
      updateGuessingWord(guess);
    } else {
      lives--;
      // render the board accordingly
      Board.setLives(lives);
    }
    render();
    // check if the game is over
    isGameOver();
  };

  const hasWon = (_) => guessingWord.join('') === chosenWord;

  const hasLost = (_) => lives <= 0;

  const isGameOver = (_) => {
    // if won, then alert("win");
    if (hasWon()) {
      sound.win.play();
      End.render(true, chosenWord);
    }
    // if lost, then alert("lost");
    if (hasLost()) {
      sound.lose.play();
      End.render(false, chosenWord);
    }
  };

  const render = (_) => {
    document.querySelector('.hangman__lives').innerHTML = lives;
    document.querySelector('.hangman__word').innerHTML = guessingWord.join('');
    document.querySelector('.hangman__letters').innerHTML = createLetters();
  };

  const updateGuessingWord = (letter) => {
    chosenWord.split('').forEach((elem, index) => {
      if (elem === letter) {
        guessingWord[index] = elem;
      }
    });
  };

  const showInitPage = (_) => {
    let markup = `
        <p class="hangman__stats">Lives:
            <span class="hangman__lives">${lives}</span>
        </p>
        <h1 class="hangman__title">Hangman</h1>
        <canvas class="hangman__board" height="155px"></canvas>
        <div class="hangman__word">${guessingWord.join('')}</div>
        <p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
        <ul class="hangman__letters">
            ${createLetters()}
        </ul>
        <button class="button hangman__trigger">Main Menu</button>
        `;
    $hangman.innerHTML = markup;
  };

  const createLetters = (_) => {
    let markup = ``;
    letters.forEach((letter) => {
      const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
      markup += `
          <li class="hangman__letter ${isActive}">${letter}</li>
          `;
    });
    return markup;
  };

  const randomWord = async () => {
    // const response = await fetch('https://random-words-api.vercel.app/word');
    // const parsed = await response.json();
    // const word = parsed[0].word.toLowerCase();
    const word = "professionelle Massage"
    return word;
  };

  const chooseWord = (_) => {
    let randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
  };

  return {
    init,
  };
})();

export default Game;
