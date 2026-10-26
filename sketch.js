let ballOffsetX = 0;
let ballOffsetY = 0;
let speedX = 2.5;
let speedY = 2;
let eyeMaxOffset = 12;

function setup() {
  createCanvas(380, 570);
  noStroke();
}

function draw() {
  background(247, 160, 190);

  ballOffsetX += speedX;
  ballOffsetY += speedY;

  if (ballOffsetX > 30 || ballOffsetX < -30) {
    speedX *= -1;
  }
  if (ballOffsetY > 35 || ballOffsetY < -35) {
    speedY *= -1;
  }

  let orangeScale = map(mouseX, 0, width, 1.1, 0.25);
  let whiteScale = map(mouseX, 0, width, 0.25, 1.1);

  for (let x = 0; x < width; x += 125) {
    for (let y = 0; y < height; y += 130) {
      fill(242, 100, 45);
      circle(x + 30 + ballOffsetX, y + 30 + ballOffsetY, 85 * orangeScale);
      fill(252, 238, 220);
      circle(x + 95 + ballOffsetX, y + 95 + ballOffsetY, 85 * whiteScale);
    }
  }

  let cx = width / 2;

  fill(0);
  rect(cx - 140, 90, 280, 120);

  beginShape();
  vertex(cx - 140, 210);
  vertex(cx - 190, 570);
  vertex(cx - 50, 570);
  vertex(cx - 50, 210);
  endShape();

  beginShape();
  vertex(cx + 140, 210);
  vertex(cx + 190, 570);
  vertex(cx + 50, 570);
  vertex(cx + 50, 210);
  endShape();

  fill(252, 238, 220);
  rect(cx - 80, 210, 160, 300);

  fill(255, 225, 0);
  ellipse(cx - 105, 370, 45, 30);
  ellipse(cx + 105, 370, 45, 30);

  fill(115, 15, 35);
  rect(cx - 80, 510, 160, 60);
  fill(247, 160, 190);
  rect(cx - 40, 510, 80, 60);

  fill(255);
  circle(cx, 545, 22);
  circle(cx, 565, 22);
  circle(cx, 585, 22);

  fill(115, 15, 35);
  rect(cx - 60, 480, 120, 45);

  let leftEyeX = cx - 35;
  let rightEyeX = cx + 35;
  let eyeCenterY = 285;

  let dx = mouseX - leftEyeX;
  let dy = mouseY - eyeCenterY;
  let distVal = sqrt(dx * dx + dy * dy);
  let offX = 0;
  let offY = 0;

  if (distVal > 0) {
    offX = constrain((dx / distVal) * eyeMaxOffset, -eyeMaxOffset, eyeMaxOffset);
    offY = constrain((dy / distVal) * eyeMaxOffset, -eyeMaxOffset, eyeMaxOffset);
  }

  fill(255);
  circle(leftEyeX, eyeCenterY, 42);
  circle(rightEyeX, eyeCenterY, 42);

  fill(0);
  circle(leftEyeX + offX, eyeCenterY + offY, 26);
  circle(rightEyeX + offX, eyeCenterY + offY, 26);

  fill(255);
  circle(leftEyeX + offX + 7, eyeCenterY + offY - 7, 12);
  circle(rightEyeX + offX + 7, eyeCenterY + offY - 7, 12);

  noFill();
  stroke(120, 120, 125);
  strokeWeight(3);
  circle(leftEyeX, eyeCenterY, 85);
  circle(rightEyeX, eyeCenterY, 85);

  noStroke();
  fill(175, 25, 75);
  rect(cx - 40, 385, 80, 10);
  arc(cx, 400, 70, 35, 0, PI);

  fill(0);
  let browOffset = map(mouseX, 0, width, -8, 8);
  arc(leftEyeX, eyeCenterY - 32 + browOffset, 36, 18, PI, 0);
  arc(rightEyeX, eyeCenterY - 32 - browOffset, 36, 18, PI, 0);
}