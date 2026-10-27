function setup() {
  createCanvas(500,650);
  noLoop();
}

function draw() {
  //背景底色
  background(247,160,190);
  noStroke();

  //背景圆点（橙色+米白）
  for(let x=0;x<width;x+=125){
    for(let y=0;y<height;y+=130){
      fill(242,100,45);
      circle(x+30,y+30,85);
      fill(252,238,220);
      circle(x+95,y+95,85);
    }
  }

  //黑色长头发
  fill(0);
  rect(110,90,280,120);
  beginShape();
  vertex(110,210);
  vertex(20,660);
  vertex(240,660);
  vertex(240,210);
  endShape();
  beginShape();
  vertex(390,210);
  vertex(480,660);
  vertex(260,660);
  vertex(260,210);
  endShape();

  //脸（米白色）
  fill(252,238,220);
  rect(170,210,160,300);

  //黄色耳环
  fill(255,225,0);
  ellipse(150,370,45,30);
  ellipse(350,370,45,30);

  //衣服：深红外搭、粉色内搭
  fill(115,15,35);
  rect(170,510,160,140);
  fill(247,160,190);
  rect(210,510,80,140);

  //衣服白色扣子
  fill(255);
  circle(250,545,22);
  circle(250,590,22);
  circle(250,635,22);

  //高领
  fill(115,15,35);
  rect(190,480,120,45);

  //眼睛
  fill(80,80,85);
  circle(215,285,42);
  circle(285,285,42);
  fill(255);
  circle(225,278,8);
  circle(295,278,8);

  //眼镜框
  noFill();
  stroke(120,120,125);
  strokeWeight(3);
  circle(215,285,85);
  circle(285,285,85);
  line(257,285,243,285);

  //嘴唇
  noStroke();
  fill(175,25,75);
  rect(210,385,80,10);
  arc(250,400,70,35,0,PI);
}