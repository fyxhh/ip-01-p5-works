let ballOffsetX = 0;
let ballOffsetY = 0;
let speedX = 2.5;
let speedY = 2;
let eyeMaxOffset = 12;

// ===== 眉毛跟随的界限（防止鼠标移到最左/最右时眉毛压到眼睛上）=====
let browMove = 8;        // 鼠标横移时眉毛最多位移多少像素
let browBaseY = -34;     // 眉毛的基准位置（相对眼睛中心的纵向偏移）
let browTopY = -40;      // 眉毛最高只能到哪（越负越靠上）
let browBottomY = -29;   // 眉毛最低只能到哪（再往下就贴到眼睛了）

// ===== 眨眼动画参数（点一下鼠标眨一次眼）=====
let blinkStartTime = -1;      // 眨眼开始时刻（毫秒），-1 表示当前不在眨眼
let blinkDuration = 220;      // 一次眨眼的完整时长（毫秒）
let blinkCloseRatio = 0.45;   // 0.45 之前是闭眼过程，之后是睁眼过程
let blinkMinScale = 0.06;     // 闭到最紧时眼睛的纵向缩放（0.06 约等于一条缝）
let blinkLineOn = 0.55;       // 闭合程度超过这个值时补一条眼睑线

function setup() {
  createCanvas(380, 570);
  noStroke();
}

// 点一下鼠标（或在手机上点一下屏幕）就眨一次眼
function mousePressed() {
  blinkStartTime = millis();
}

// 计算眨眼进度：0 = 完全睁开，1 = 完全闭上
function blinkAmount() {
  if (blinkStartTime < 0) {
    return 0;
  }
  let t = (millis() - blinkStartTime) / blinkDuration;
  if (t >= 1) {
    blinkStartTime = -1;
    return 0;
  }
  if (t < blinkCloseRatio) {
    // 闭眼阶段：0 → 1，用 smoothstep 让收得快一点
    let p = t / blinkCloseRatio;
    return p * p * (3 - 2 * p);
  }
  // 睁眼阶段：1 → 0
  let p = (t - blinkCloseRatio) / (1 - blinkCloseRatio);
  return 1 - p * p * (3 - 2 * p);
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

  // 眨眼时把眼白、瞳孔、高光一起纵向压扁（以眼睛中心为轴）
  let blink = blinkAmount();
  let eyeScaleY = 1 - blink * (1 - blinkMinScale);

  push();
  translate(0, eyeCenterY);
  scale(1, eyeScaleY);
  translate(0, -eyeCenterY);

  fill(255);
  circle(leftEyeX, eyeCenterY, 42);
  circle(rightEyeX, eyeCenterY, 42);

  fill(0);
  circle(leftEyeX + offX, eyeCenterY + offY, 26);
  circle(rightEyeX + offX, eyeCenterY + offY, 26);

  fill(255);
  circle(leftEyeX + offX + 7, eyeCenterY + offY - 7, 12);
  circle(rightEyeX + offX + 7, eyeCenterY + offY - 7, 12);

  pop();

  noFill();
  stroke(120, 120, 125);
  strokeWeight(3);
  circle(leftEyeX, eyeCenterY, 85);
  circle(rightEyeX, eyeCenterY, 85);

  // 快闭上时补一条眼睑线，让"闭眼"更清楚
  if (blink > blinkLineOn) {
    stroke(115, 15, 35);
    strokeWeight(3);
    line(leftEyeX - 16, eyeCenterY, leftEyeX + 16, eyeCenterY);
    line(rightEyeX - 16, eyeCenterY, rightEyeX + 16, eyeCenterY);
  }

  noStroke();
  fill(175, 25, 75);
  rect(cx - 40, 385, 80, 10);
  arc(cx, 400, 70, 35, 0, PI);

  fill(0);
  // 眉毛跟随鼠标左右抬高/压低，但用 constrain 卡在上下界限内，不会压到眼睛
  let browMoveVal = map(mouseX, 0, width, -browMove, browMove);
  let leftBrowY = constrain(eyeCenterY + browBaseY + browMoveVal, eyeCenterY + browTopY, eyeCenterY + browBottomY);
  let rightBrowY = constrain(eyeCenterY + browBaseY - browMoveVal, eyeCenterY + browTopY, eyeCenterY + browBottomY);
  arc(leftEyeX, leftBrowY, 36, 18, PI, 0);
  arc(rightEyeX, rightBrowY, 36, 18, PI, 0);
}
