const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [];
let revealedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(value) {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = value;
  card.addEventListener('click', () => onCardClick(card));
  return card;
}

function resetGame() {
  cards = [];
  revealedCards = [];
  matchedCards = [];
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  shuffle(values);

  for (const value of values) {
    const card = createCard(value);
    cards.push(card);
    gameBoard.appendChild(card);
  }
}

function hideCards() {
  for (const card of revealedCards) {
    card.classList.remove('matched');
    card.textContent = '';
  }
  revealedCards = [];
}

function checkMatch() {
  if (revealedCards.length === 2) {
    const [card1, card2] = revealedCards;
    if (card1.textContent === card2.textContent) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards.push(card1, card2);
    } else {
      setTimeout(hideCards, 1000);
    }
    revealedCards = [];
  }

  if (matchedCards.length === cards.length) {
    setTimeout(() => alert('Congratulations! You won the game!'), 200);
  }
}

function onCardClick(card) {
  if (!revealedCards.includes(card) && revealedCards.length < 2 && !card.classList.contains('matched')) {
    card.textContent = card.textContent; // Reveal the card value
    revealedCards.push(card);
    checkMatch();
  }
}

resetGame();
