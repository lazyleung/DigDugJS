
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "55px Arial";
ctx.textAlign = "center";
ctx.fillText("Dig Dug", 300, 70);
// Draw selectable options
ctx.font = "40px Arial";
ctx.fillText("Play", 300, 370);
ctx.fillText("High Scores", 300, 450);
// Draw selection rectangle
ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
ctx.fillRect(170, 320, 250, 70);

