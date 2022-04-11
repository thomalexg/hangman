const End = (() => {
  const render = (boolean, word) => {
    const $hangman = document.querySelector('.hangman');
    let result;
    if (boolean) {
      result = 'win';
    } else {
      result = 'loose';
    }

    let markup = `
      <h1 class="hangman__title">GAME OVER</h1>
      <p class="result"> You ${result}! <br> The word was 👉 ${word}</p>
      <button class="button hangman__trigger">Main Menu</button>
      `;
    $hangman.innerHTML = markup;
  };

  return {
    render,
  };
})();

export default End;
