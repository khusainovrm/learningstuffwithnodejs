const request = new XMLHttpRequest();
const form = document.getElementById("submit");

form.addEventListener("click", (e) => {
  e.preventDefault();
  let registerForm = document.forms["registerForm"];
  let userName = registerForm.elements["userName"].value;
  let userAge = registerForm.elements["userAge"].value;
  let user = JSON.stringify({ userName, userAge });
  console.log(user);

  request.open("POST", "/user", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    // получаем и парсим ответ сервера
    let receivedUser = JSON.parse(request.response);
    console.log(receivedUser.userName, "-", receivedUser.userAge); // смотрим ответ сервера
  });
  request.send(user);
});
