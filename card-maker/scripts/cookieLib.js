function setCookie(cookieName, cookieValue, expDate) {
    if (arguments.length < 2 || arguments.length > 3 || typeof cookieName !== 'string')
        throw new Error('Function setCookie requires 2 to 3 STRING parameters');
    if (expDate) {
        document.cookie = `${cookieName}=${cookieValue};expires=${expDate}`
    } else {
        document.cookie = `${cookieName}=${cookieValue}`
    }
}
function getCookie(cookieName) {
    if (arguments.length !== 1 || typeof cookieName !== 'string')
        throw new Error('function getCookie requires 1 STRING parameter');
    let cookieObj = allCookieList();
    return cookieObj[cookieName];
}

function allCookieList() {
    var cookieObj = {};
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let keyVal = cookies[i].split("=");
        cookieObj[keyVal[0]] = keyVal[1];
    }
    return cookieObj;
}

function hasCookie(cookieName) {
    return getCookie(cookieName) !== null;
}

function deleteCookie(cookieName) {
    let oldDate = new Date();
    oldDate.setFullYear(1900);
    return setCookie(cookieName, '', oldDate);
}
