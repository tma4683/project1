import { setupGround, updateGround } from "./ground.js";
import { setupAstro, updateAstro, getAstroRect } from "./astronaut.js";
import { setupRock, updateRock, getRockRects } from "./rock.js";
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");
const worldElem = document.querySelector("[data-world]");
const uname = document.querySelector("[data-uname]");
const name = document.querySelector("[data-name]");
const lastScore = document.querySelector("[data-lastscore]");
const params = new URLSearchParams(window.location.search);



setPixelWorldScale();
window.addEventListener("resize", setPixelWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

var userName=params.get('uname');
var firstName=params.get('first-name');
var lastName=params.get('last-name');
name.textContent = "Name: " + firstName + " " + lastName;
uname.textContent = "Username:" + " " + userName;



let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta, speedScale);
  updateAstro(delta, speedScale);
  updateRock(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupAstro();
  setupRock();
  startScreenElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

function updateScore(delta) {
  score += delta * 0.01; //for every 10s, score increases by 10
  scoreElem.textContent = "Score:" + Math.floor(score);
}

function updateSpeedScale(delta) {
  speedScale += delta * 0.0001;
}

function checkLose() {
  const astroRect = getAstroRect();
  return getRockRects().some((rect) => isCollision(rect, astroRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function handleLose() {
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide");
  }, 100);
  handleLastScore();
}

function handleLastScore(){
  localStorage.setItem('previousScore',score);
  var previousScore = localStorage.getItem('previousScore');
  console.log(Math.floor(previousScore));
  lastScore.innerHTML = "Last Score: " + Math.floor(previousScore);
}

function setPixelWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

