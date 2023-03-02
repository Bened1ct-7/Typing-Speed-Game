const introDiv = document.querySelector(".intro");
const introBtn = document.querySelector(".intro button");
const h1 = document.querySelector(".word-div h1");
const scoreText = document.querySelector(".score");
const timeText = document.querySelector(".time");
const inputField = document.querySelector(".input-box input");
const timeBar = document.querySelector(".time-bar");
const remarkText = document.querySelector(".remark-div h3");
const alertBox = document.querySelector(".alert");
const alertBtn = alertBox.querySelector("button");

const remarks = ["Inevitable", "Amazing", "Worderful", "Superb"];

let score = 0,
  time = 5,
  wordIndex = 0,
  isPlaying = true,
  typing = false,
  isAlerting = false;

let index, word, letters;

const removeAttr = (arr, className) => {
  arr.forEach((item) => {
    item.classList.remove(className);
  });
};

const randomWord = (num) => {
  const random = Math.floor(Math.random() * num);
  return random;
};

const addRemark = () => {
  const remark = randomWord(remarks.length - 1);
  remarkText.textContent = remarks[remark];
};

const timeLeft = () => {
  setInterval(() => {
    if (time == 0) {
      isPlaying = false;
    }
    if (time > 0) {
      time--;
      timeBar.style.width = `${(time / 5) * 100}%`;
      timeText.textContent = time;
    }
  }, 1000);
};

setInterval(() => {
  if (isPlaying == false) {
    inputField.disabled = true;
    inputField.classList.add("disabled");
    if (isAlerting == false) {
      alertBox.classList.add("active");
      isAlerting = true;
    }
  }
}, 50);

const initGame = () => {
  isPlaying = true;
  scoreText.innerText = score;
  inputField.classList.remove("disabled");
  h1.innerHTML = "";
  inputField.value = "";
  inputField.focus();
  index = randomWord(words.length - 1);
  word = words[index].split("");
  word.forEach((letter) => (h1.innerHTML += `<span >${letter}</span>`));
  (time = 6), (wordIndex = 0);
  letters = h1.querySelectorAll("span");
  letters[0].classList.add("active");
  if (typing == false) {
    timeLeft();
    typing = true;
  }
};

const checkLetter = (char, index) => {
  letters = h1.querySelectorAll("span");
  if (char == letters[index].innerText) {
    return true;
  }
  return false;
};

const checkIndex = (ind) => {
  if (wordIndex < 0) {
    wordIndex = 0;
  }
  return wordIndex;
};

const checkForErrors = () => {
  letters = h1.querySelectorAll("span");
  let error = 0;
  letters.forEach((letter) => {
    if (letter.classList.contains("mistake")) {
      error++;
    }
  });
  return error;
};

const isTyping = (e) => {
  wordIndex = checkIndex(wordIndex);
  letters = h1.querySelectorAll("span");
  removeAttr(letters, "active");
  letters[wordIndex].classList.add("active");
  letter = letters[wordIndex];

  if (inputField.value.length - 1 > wordIndex) {
    return;
  }

  if (inputField.value.length < wordIndex) {
    letters[wordIndex - 1].classList.remove("correct", "mistake");
    removeAttr(letters, "active");
    letters[wordIndex - 1].classList.add("active");
    wordIndex--;
    return;
  }

  const typedChar = inputField.value.split("")[wordIndex];
  const className =
    checkLetter(typedChar, wordIndex) == true ? "correct" : "mistake";
  letters[wordIndex].classList.add(className);

  if (wordIndex == letters.length - 1) {
    if (checkForErrors() == 0) {
      removeAttr(letters, "active");
      removeAttr(letters, "correct");
      removeAttr(letters, "mistakes");
      inputField.value = "";
      addRemark();
      initGame();
      score += 20;
      scoreText.innerText = score;
    } else {
      e.preventDefault();
      wordIndex--;
      letters[wordIndex + 1].classList.remove("correct", "mistakes");
    }
    return;
  }

  wordIndex++;
};

inputField.addEventListener("input", isTyping);

alertBtn.addEventListener("click", () => {
  inputField.disabled = false;
  alertBox.classList.remove("active");
  (score = 0),
    (time = 5),
    (wordIndex = 0),
    (isPlaying = true),
    (isAlerting = false);
  inputField.focus();
  initGame();
});

introBtn.addEventListener("click", () => {
  introDiv.classList.add("active");
  setTimeout(() => initGame(), 1000);
  inputField.focus();
  setTimeout(() => {
    introDiv.style.display = "none";
  }, 3000);
});
