let tBody = document.getElementById("usersTbody");
function editTd(tdId, value, newWin) {
    return newWin.document.getElementById(tdId).innerText = value;
}
let result = fetch('https://jsonplaceholder.typicode.com/users/')
result
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        data.forEach(function (user) {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.company.name}</td>
                <td>${user.website}</td>
            `;

            tBody.appendChild(row);

            row.addEventListener('click', function () {
                let = newWin = window.open("../html/user_info.html", "", "width=600,height=500");
                newWin.onload = function () {
                    editTd("userNameHeading", user.name, newWin)
                    editTd("idR", user.id, newWin);
                    editTd("nameR", user.name, newWin);
                    editTd("userR", user.username, newWin);
                    editTd("emailR", user.email, newWin);
                    editTd("addressR", user.address.street, newWin);
                    editTd("companyR", user.company.name, newWin);
                    editTd("phoneR", user.phone, newWin);
                    editTd("websiteR", user.website, newWin);
                }
            });
        });
    })
    .catch(function (error) {
        document.getElementById("tDiv").style.display = "none";
        document.getElementById("errorMsg").innerText = error;
    });

