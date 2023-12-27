$(document).on("click", "#submit", submitLogin);

function submitLogin() {
  const id = $("#id").val();
  const password = $("#password").val();
  isEmpty(id, password);
  $.ajax({
    url: "http://localhost:8888/login/progress",
    type: "POST",
    data: {
      id: id,
      password: password,
    },
    dataType: "text",
    success: (text) => {
      document.location.href = "/";
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function isEmpty(id, password) {
  if (validator.isEmpty(id) || validator.isEmpty(password)) {
    return false;
  }
  return true;
}
