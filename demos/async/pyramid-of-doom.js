// Not actually hooked up to any endpoint

fetch('http://endpoint.com/customer/22/orders').callback(function (orders) {
  // Some arbitrary id
  let order = orders[0];
  fetch('http://endpoint.com/orders/' + order.id + '/items').callback(function (items) {
    let item = items[0];
    fetch('http://endpoint.com/products/' + item.id).callback(function (product) {
      // And so on
    });
  });
});
