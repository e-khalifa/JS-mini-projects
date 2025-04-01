
window.onload = function () {
    let cardBtn = document.getElementById("cBtn");
    let win;
    cardBtn.addEventListener("click", function () {
        setCookie("chosenCard", document.querySelector('input[name="card"]:checked').value);
        setCookie("msg", document.getElementById("msg").value);
        win = window.open("../html/cardResult.html", "_blank", "width=300,height=400");
    });
}
