let answer = generateRandomNumber();
let attempts = 0;

function generateRandomNumber() {
  const digits = [...Array(10).keys()]; // [0, 1, 2, ..., 9]
  const result = [];
  while (result.length < 4) {
    const index = Math.floor(Math.random() * digits.length);
    result.push(digits[index]);
    digits.splice(index, 1);
  }
  return result.join('');
}

function checkGuess() {
  const guessInput = document.getElementById('guessInput');
  const message = document.getElementById('message');
  const historyList = document.getElementById('historyList');
  const guess = guessInput.value;

  // Validate input
  if (!/^\d{4}$/.test(guess)) {
    alert('Please enter exactly 4 digits.');
    return;
  }
  if (new Set(guess).size !== 4) {
    alert('Digits must not repeat.');
    return;
  }

  attempts++;
  const result = compareGuess(guess, answer);
  const listItem = document.createElement('li');
  listItem.textContent = `${guess} => ${result}`;
  historyList.appendChild(listItem);

  if (result === '4A0B') {
    alert(`Congratulations! You guessed correctly in ${attempts} attempts.`);
    resetGame();
  }

  guessInput.value = ''; // Clear input
}

function compareGuess(guess, answer) {
  let A = 0;
  let B = 0;

  for (let i = 0; i < 4; i++) {
    if (guess[i] === answer[i]) {
      A++;
    } else if (answer.includes(guess[i])) {
      B++;
    }
  }
  return `${A}A${B}B`;
}

function resetGame() {
  answer = generateRandomNumber();
  attempts = 0;
  document.getElementById('historyList').innerHTML = '';
}
