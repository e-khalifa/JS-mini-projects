var canvas2 = document.getElementById('c2');
var fan = canvas2.getContext('2d');
var startFan = document.getElementById("start_fan");
var turnedOn = false;
var clockwise = true;
var interval;
var currentBlade;


startFan.addEventListener("click", function () {
    if (turnedOn) {
        clearInterval(interval);
        turnedOn = false;
        startFan.innerText = "Start Fan"
    } else {
        currentBlade = currentBlade || 0;
        interval = setInterval(function () {
            var direction = clockwise ? 1 : -1;
            if (currentBlade >= 10) {
                clockwise = !clockwise;
                currentBlade = 0;
            } else {
                fan.clearRect(0, 0, canvas2.width, canvas2.height);
                for (var i = 0; i <= currentBlade; i++) {
                    fan.save();
                    fan.translate(canvas2.width / 2, canvas2.height / 2);
                    fan.rotate((Math.PI * 2 / 10) * i * direction);
                    fan.fillStyle = "lightBlue";
                    fan.fillRect(-5, 15, 180, 45);
                    fan.restore();
                }
                currentBlade++;
            }
        }, 100);
        turnedOn = true;
        startFan.innerText = "Stop Fan"
    }
});
