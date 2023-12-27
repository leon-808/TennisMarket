$(document).ready(() => {
  getProducts();
  isLogin();
});

const getProducts = () => {
  return $.ajax({
    url: "http://localhost:8888/main/products",
    type: "GET",
    dataType: "json",
    success: (products) => {
      for (const { id, name, url } of products[0]) {
        const html = productCardHtml(id, name, url);
        $("#card_list").append(html);
      }
    },
    error: (err) => {
      $("#card_list").append("<p style='font-size:3rem;'>500 Error Σ(； ･`д･´)</p>");
    },
  });
};

const getJwtFromCookie = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "jwt") {
      return value;
    }
  }
  return null;
};

const isLogin = () => {
  const token = getJwtFromCookie();
  return $.ajax({
    url: "http://localhost:8888/main/login",
    type: "POST",
    headers: { authorization: "Bearer " + token },
    dataType: "text",
    success: (id) => {
      console.log(id);
      $("#login_sentence").html(id);
    },
    error: (err) => {
      console.log(err);
    },
  });
};

const productCardHtml = (id, name, url) => {
  return `
  <div class="card">
  <img src="/img/${url}" class="card-img">
  <p class="card-title" productId="${id}">${name}</p>
  <input type="button" value="order" class="card-button"
  onclick="orderOnMain(this)">
  </div>
  `;
};

const orderOnMain = (thisTag) => {
  // 각 상품의 order 버튼을 기준으로 이전 p 태그의 attr 을 가져옵니다.
  const productId = $(thisTag).prev().attr("productId");
  const productName = $(thisTag).prev().text();
  const dateTime = new Date().toLocaleDateString();

  $.ajax({
    url: "http://localhost:8888/main/order",
    type: "POST",
    data: {
      productId: productId,
    },
    dataType: "text",
    success: () => {
      alert(`${dateTime}\n${productName}\n주문이 완료되었습니다.`);
    },
    error: (err) => {
      alert("서버 문제로 인하여 주문되지 않았습니다.");
    },
  });
};
