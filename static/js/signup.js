$(document).ready(function () {
  $(document).on("click", "#submit", submitSignup);
});

function submitSignup() {
  const id = $("#id").val();
  const password = $("#password").val();
  const passwordCheck = $("#password_check").val();
  const name = $("#name").val();
  const birth = $("#birth").val();
  const tel = $("#tel").val();
  const email = $("#email").val();
  const address = $("#address").val();
  validation(id, password, passwordCheck, name, birth, tel, email, address);
  $.ajax({
    url: "http://localhost:8888/signup",
    type: "POST",
    data: {
      id: id,
      password: password,
      passwordCheck: passwordCheck,
      name: name,
      birth: birth,
      tel: tel,
      email: email,
      address: address,
    },
    dataType: "text",
    success: (text) => {
      console.log(text);
      alert("회원 가입이 완료되었습니다.");
      $("#signup_form")[0].reset();
      document.location.href = "/";
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function validation(id, password, passwordCheck, name, birth, tel, email, address) {
  if (isEmpty(id, password, passwordCheck, name, birth, tel, email, address)) {
    alert("모든 입력값을 작성해주세요.");
    return false;
  }
  if (!validator.equals(password, passwordCheck)) {
    alert("비밀번호 확인이 일치하지 않습니다.");
    return false;
  }
  if (!validator.isMobilePhone(tel, "ko-KR")) {
    alert("유효한 한국 휴대폰 번호가 아닙니다.");
    return false;
  }
  if (!validator.isEmail(email)) {
    alert("유효한 이메일 주소가 아닙니다.");
    return false;
  }
  return true;
}

function isEmpty(id, password, passwordCheck, name, birth, tel, email, address) {
  if (
    validator.isEmpty(id) ||
    validator.isEmpty(password) ||
    validator.isEmpty(name) ||
    validator.isEmpty(birth) ||
    validator.isEmpty(tel) ||
    validator.isEmpty(email) ||
    validator.isEmpty(address)
  ) {
    return true;
  }
  return false;
}
