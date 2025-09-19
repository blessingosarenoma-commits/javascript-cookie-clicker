let cookie = 0;
const cookieElement = document.getElementById("cookie");
const countElement = document.getElementById("count");
cookieElement.addEventListener("click", function () {
  cookie = cookie + 1;
  countElement.textContent = cookies;
});
