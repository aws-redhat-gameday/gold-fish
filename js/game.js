const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'rhacm-card',
  'rhamq-card',
  'rhods-card',
  'rhquay-card',
  'rhaap-card',
  'rh3scale-card',
  'rhel-card',
  'rhopenshift-card',
  'rhmta-card',
  'rhfuse-card',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';


var animate;
var is_start = true;
var bodyRect;
var elemRect;

function init(imageId) {
  imgObj = document.getElementById(imageId);
  // imgObj.style.position= 'relative'; 
  imgObj.style.left = '0px';
  imgObj.style.bottom = '0px';
  bodyRect = document.body.getBoundingClientRect();

  return imgObj;
}

function end() {
  clearTimeout(animate);
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);

    document.getElementsByTagName('header')[0].style.visibility = 'hidden';
    document.getElementsByTagName('header')[0].style.display = 'none';

    document.getElementById('grid').classList.add('animate__hinge');
    setTimeout(()=>{}, 500);

    document.getElementById('logo-game').style.visibility = 'visible';
    document.getElementById('logo-game').style.display = 'block';

    document.getElementById('win').style.visibility = 'visible';
    document.getElementById('win').style.display = 'block';

    document.getElementById('goldfish').style.visibility = 'visible';
    document.getElementById('goldfish').style.display = 'block';

    document.getElementById('yacht').style.visibility = 'hidden';
    document.getElementById('yacht').style.display = 'none';

    document.getElementById('credits').style.visibility = 'visible';

    const yacht = init('yacht');
    moveRight(yacht);
    setTimeout(end, 60000);
  }
}

const moveRight = () => {
  imgObj.style.visibility = 'visible';
  imgObj.style.display = 'block';

  elemRect = imgObj.getBoundingClientRect();
  var offset = elemRect.right - bodyRect.right;// check how far the image to the rightmost of boby in pixel
  if (offset >= 0) {
    imgObj.style.left = '0px';
  }
  imgObj.style.left = parseInt(imgObj.style.left) + 10 + 'px';
  animate = setTimeout(moveRight, 20);
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');
  checkEndGame();

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';
    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');

  const backClasseNames = ['back-1', 'back-2'];
  const back = createElement('div', 'face ' + backClasseNames[randomIntFromInterval(0, 1)]);

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
