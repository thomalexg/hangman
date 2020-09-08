import Game from './game.js';
import How from './how.js';
import { sound } from './../data/sound.js';

const Home = (_ => {

// cache the DOM
const $hangman = document.querySelector(".hangman");

const render = _ => {
    let markup = '';
    markup += `
    <h1 class="hangman__title">Hangman</h1>
    <button class="button start">New Game</button>
    <button class="button instructions">Instructions</button>
    `
    $hangman.innerHTML = markup;
}

const listeners = _ => {
document.querySelector(".start").addEventListener("click", _ => {
    Game.init();
    sound.click.play();
})
document.querySelector(".instructions").addEventListener("click", _ => {
    How.init();
    sound.click.play();
})
}

const init = _ => {
    render();
    listeners();    
}
    return {
        init
    }
})();

export default Home;