var canvas3 = document.getElementById('c3');
var circle = canvas3.getContext('2d');
var switchBtn = document.getElementById("switch_btn");
var count = 0;

var gradient = circle.createConicGradient(Math.PI, canvas3.width / 2, canvas3.height / 2)
gradient.addColorStop(0, 'yellow');
gradient.addColorStop(0.2, 'green');
gradient.addColorStop(0.4, 'blue');
gradient.addColorStop(0.5, 'purple');
gradient.addColorStop(0.6, 'red');
gradient.addColorStop(0.8, 'orange');
gradient.addColorStop(1, 'yellow');

function drawCircle(start, end) {
    circle.clearRect(0, 0, canvas3.width, canvas3.height);
    circle.beginPath();
    circle.arc(canvas3.width / 2, canvas3.height / 2, 150, start, end);
    circle.fillStyle = gradient;
    circle.fill();
    if (count > 0) {
        circle.fillStyle = "red";
        circle.font = "30px Arial";
        circle.fillText(count, canvas3.width - 50, 50);
    }
}
drawCircle(0, Math.PI);

var bottom = true;
switchBtn.addEventListener("click", function () {
    count = 0;
    var cInterval = setInterval(function () {
        if (count >= 10) {
            clearInterval(cInterval);
            drawCircle(0, Math.PI * 2);
        } else {
            if (bottom) {
                drawCircle(Math.PI, Math.PI * 2);
                bottom = false;
                count++;
            } else {
                drawCircle(0, Math.PI);
                bottom = true;
                count++;
            }
        }
    }, 100)
})
