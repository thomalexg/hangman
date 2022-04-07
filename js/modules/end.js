const End = (() => {
  const render = (boolean, word) => {
    const $hangman = document.querySelector('.hangman');
    let result;
    if (boolean) {
      result = 'win';
      var markup = `
        <h1 class="hangman__title">GAME OVER</h1>
        <p class="result"> You ${result}! <br> Herlichen Glückwunsch zu einem Gutschein zum Trampolinspringen! Happy Birthday :) </p>
        <button class="button hangman__trigger">Main Menu</button>
        `;
    } else {
      result = 'loose';
      var markup = `
        <h1 class="hangman__title">GAME OVER</h1>
        <p class="result"> You ${result}! <br> Probier es nochmal wenn du ein Geburtstagsgeschenk willst ;P</p>
        <button class="button hangman__trigger">Main Menu</button>
        `;
    }

    $hangman.innerHTML = markup;
  };

  return {
    render,
  };
})();

export default End;
