$(document).ready(function () {
    function hideAllBut(selectedWin) {
        $(".win").hide(50);
        $(selectedWin).show(100);
    }
    //=====================About=============================
    $("#about").click(function () {
        hideAllBut("#aboutWin")
    });

    //=====================Gallery=============================
    $("#gallery").click(function () {
        hideAllBut("#galleryWin");
    });

    var imgs = [
        "../assets/1.jpg",
        "../assets/2.jpg",
        "../assets/3.jpg",
        "../assets/4.jpg",
        "../assets/5.jpg",
        "../assets/6.jpg",
        "../assets/7.jpg",
        "../assets/8.jpg",
    ]
    var currentI = 0;
    function updateImg() {
        $("#myImg").fadeOut(500, function () {
            $("#myImg").attr("src", imgs[currentI]);
            $("#myImg").fadeIn(500);
        });
    }
    $("#left").click(function () {
        if (currentI > 0) {
            currentI--;
            updateImg();
        }
    });
    $("#right").click(function () {
        if (currentI < imgs.length - 1) {
            currentI++;
            updateImg();
        }
    });

    //=====================Services=============================
    $("#service").click(function () {
        $(".win").hide(100);
        $("#item1,#item2,#item3").hide();

        $("#serviceWin").show(100, function () {
            $("#item1").slideDown(100, function () {
                $("#item2").slideDown(200, function () {
                    $("#item3").slideDown(300);
                });
            });
        });
    });

    //=====================Complain=============================
    $("#complain").click(function () {
        hideAllBut("#formWin");
        $("#userName").val("");
        $('#email').val("");
        $('#phone').val("");
        $('#formWin #complain').val("");
    });
    $("#formWin #send").click(function () {
        var userName = $("#userName").val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var complain = $('#formWin #complain').val();
        $('#formWin').hide(100);
        $("#resultWin").show(100, function () {
            $(this).html(`
                <p>Your Complain is: <b>${complain}</b></p>
                <p>Your Name is: <b>${userName}</b></p>
                <p>Your Email is: <b>${email}</b></p>
                <p>Your Phone is: <b>${phone}</b></p>
                <br>
                <button id="back">Back to edit</button>
            `);
        });
    });

    $('#resultWin').on('click', '#back', function () {
        $('#resultWin').hide(100);
        $('#formWin').show(100);
    });
})