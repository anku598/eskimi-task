let score = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
}

function handleElementInteraction() {
  score += 10;
  updateScore();
}

function createAndAnimateElement() {
  const element = document.createElement("div");
  element.classList.add("element");
  element.style.width = "50px";
  element.style.height = "50px";
  element.style.backgroundColor = randomColor();
  element.style.position = "absolute";
  element.style.top = randomInt(50, 550) + "px";
  element.style.left = randomInt(50, 250) + "px";
  element.addEventListener("click", () => {
    handleElementInteraction();
    element.remove();
  });
  document.getElementById("banner").appendChild(element);

  gsap.to(element, {
    x: randomInt(-100, 100),
    y: randomInt(-100, 100),
    rotation: 360,
    duration: 3,
    repeat: -1,
    ease: "power1.inOut",
  });
}

const numElements = randomInt(2, 10);
for (let i = 0; i < numElements; i++) {
  createAndAnimateElement();
}

const scoreDisplay = document.createElement("div");
scoreDisplay.id = "score";
scoreDisplay.classList.add("score");
updateScore();
document.getElementById("banner").appendChild(scoreDisplay);
