let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load images
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "./images/bird.png";
bg.src = "./images/bg.png";
fg.src = "./images/fg.png";
pipeNorth.src = "./images/pipeNorth.png";
pipeSouth.src = "./images/pipeSouth.png";

// some variable
const gap = 100;
let constant = pipeNorth.height + gap;

let bX = 10;
let bY = 150;
const gravity = 1;
let score = 0;

// Audio
let flyAudio = new Audio();
let scoreAudio = new Audio();

flyAudio.src = "sounds/fly.mp3";
scoreAudio.src = "sounds/score.mp3";
// event listener
document.addEventListener("keydown", moveUp);
function moveUp() {
  bY -= 25;
  flyAudio.play();
}

// pipe
const pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images
const draw = function() {
  ctx.drawImage(bg, 0, 0);
  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;
    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // collision conditions
    if (
      (bX + bird.width >= pipe[i].x &&
        bX + bird.width <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // reload the page
    }

    // score
    if (pipe[i].x == 5) {
      score++;
      scoreAudio.play();
    }
  } // end of for loop

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  bY += gravity;

  // score print style
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}; // end of draw function

draw();
