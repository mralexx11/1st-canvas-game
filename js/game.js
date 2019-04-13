const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//Pictures
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "/img/bird.png";
bg.src = "/img/bg.png";
fg.src = "/img/fg.png";
pipeUp.src = "/img/pipeUp.png";
pipeBottom.src = "/img/pipeBottom.png";

//Sounds
let fly = new Audio();
let scr_audio = new Audio();

fly.src = "/audio/fly.mp3";
scr_audio.src = "/audio/score.mp3";

const gap = 90;

//Move up bird on any pressed key
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 30;
    fly.play();
}

// Creating blocks
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};

let score = 0;

//Base bird position 
let xPos = 10;
let yPos = 150;
const grav = 1.5;


function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, 52, 242);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap, 52, 378);

        pipe[i].x--;

        if (pipe[i].x ==   75) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height)  {
                    
                  if (confirm("Do you want to continue?")) {
                    location.reload(); //Reload if bird crash
                  } else{
                    close();
                  }
                   
                }

        if(pipe[i].x ==5) {
            score++;
            scr_audio.play();
        }
    }



    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos, 38, 26); // ctx.drawImage(image, dx, dy, dWidth, dHeight);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    // ctx.fillText("Влад и Франция", 10, 20 )

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;