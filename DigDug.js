var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Draw Title screen
ctx.font = "55px Arial";
ctx.textAlign = "center";
ctx.fillText("Dig Dug", 300, 70);
ctx.font = "40px Arial";
ctx.fillText("Play", 300, 370);
ctx.fillText("High Scores", 300, 450);
