$(document).ready(() => {
  $.ajax({
    url: "http://localhost:8888/orderlist/all",
    type: "GET",
    dataType: "json",
    success: (orderLists) => {
      for (const { id, date } of orderLists[0]) {
        const localDate = new Date(date).toLocaleString();
        const html = `
        <tr>
            <td>${id}</td>
            <td>${localDate}</td>
        </tr>
        `;
        $("#order_list").append(html);
      }
    },
    error: (err) => {
      console.error("Error: " + err);
    },
  });
});
