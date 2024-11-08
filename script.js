Score = 0;
cross = true;

audio = new Audio('music.mp3')
audiogo = new Audio('gameover.mp3')
setTimeout(() => {
    audio.play()    
}, 1000);

document.onkeydown = function (e) {
  console.log("key code is: ", e.keyCode);
  if (e.keyCode == 38) {
    dino = document.querySelector(".dino");
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }
};

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 39) {
    // 39 is the keyCode for the right arrow key
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 250 + "px"; // Move dino 112px to the right
  }
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 37) {
    // 39 is the keyCode for the right arrow key
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px"; // Move dino 112px to the right
  }
});

setInterval(() => {
  // Select elements
  const dino = document.querySelector(".dino");
  const gameOver = document.querySelector(".gameOver");
  const obstacle = document.querySelector(".obstacle");

  // Get positions
  const dx = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
  const dy = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  const ox = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("top")
  );

  // Calculate offsets
  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);

  // Check for collision
  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over - Reload to Try Again";
    obstacle.classList.remove("obstacleAni"); // Removed the dot (.) from the class name
    audiogo.play();
    setTimeout(() => {
        audio.pause();
        audiogo.pause();
    }, 1000);
  } 
    else if (offsetX < 145 && cross) {
    Score += 1; 
    updateScore(Score); // Update the score display
    cross = false; // Prevent further increments until reset
    setTimeout(() => {
      cross = true; // Reset the cross variable after 1 second
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(window.getComputedStyle(dino).getPropertyValue("animation-duration"));
      newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);

    aniDur = parseFloat(
      window.getComputedStyle(dino).getPropertyValue("animation-duration")
    );
    newDur = aniDur - 0.1;
    obstacle.style.animationDuration = newDur + "s";
  }
}, 100);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
