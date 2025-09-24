const startButton = document.getElementsByClassName('slider');
const newPage = document.getElementById('new-page');
const header = document.getElementById('header');
const number = document.getElementById("number");
const enterButton = document.getElementById('number-button')
const canvas = document.getElementById('color-wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const resultDialogue = document.getElementById('result-dialogue');
//adding event listeners to the toggle button
startButton.addEventListener('click', function(){
    newPage.remove('hidden');
    setTimeout(()=> {
        header.classList.add('show');
        number.classList.add('show');
        enterButton.classList.add('show');

    },2000); // to ensure page is visible before animating
});



let angle = 0;
let spinning = false;

// Define color sections
const colors = [
  { name: 'Red', start: 0, end: 5 },
  { name: 'Blue', start: 6, end: 10 },
  { name: 'Green', start: 11, end: 15 },
  { name: 'Yellow', start: 16, end: 20 },
  { name: 'Purple', start: 21, end: 25 },
];

// Draw color wheel
function drawColorWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle * Math.PI / 180);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  const angleSection = 360 / colors.length;
  for (let i = 0; i < colors.length; i++) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, (i * angleSection * Math.PI) / 180, ((i + 1) * angleSection * Math.PI) / 180);
    ctx.fillStyle = getColor(i);
    ctx.fill();
  }
  ctx.restore();
}

function getColor(index) {
  switch (index) {
    case 0:
      return 'red';
    case 1:
      return 'blue';
    case 2:
      return 'green';
    case 3:
      return 'yellow';
    case 4:
      return 'purple';
  }
}

// Spin wheel
function spinWheel() {
  spinning = true;
  const spinInterval = setInterval(() => {
    angle += 10;
    drawColorWheel();
    if (angle >= 360 * 5) {
      clearInterval(spinInterval);
      spinning = false;
      const randomNumber = Math.floor(Math.random() * 26);
      const winningColor = colors.find((color) => randomNumber >= color.start && randomNumber <= color.end);
      const userGuess = parseInt(guessInput.value);
      const userColor = colors.find((color) => userGuess >= color.start && userGuess <= color.end);
      if (userColor && userColor.name === winningColor.name) {
        resultDialogue.textContent = 'Congratulations!🎉';
      } else {
        resultDialogue.textContent = 'Oops, try again next time!☹';
      }
      resultDialogue.style.display = 'block';
      setTimeout(() => {
        resultDialogue.style.display = 'none';
      }, 2000);
    }
  }, 16); // 16ms = 60fps
}

spinButton.addEventListener('click', () => {
  if (!spinning) {
    guessInput.style.display = 'block';
    spinWheel();
  }
});

drawColorWheel();