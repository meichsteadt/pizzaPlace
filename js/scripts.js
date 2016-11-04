function Customer(name) {
	this.name = name;
  this.address = [];
  this.payment = [];
  this.order = [];
  this.total = 0;
}

function Address(street, city, state, zip) {
	this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip
}

function Payment(cardHolder, type, cardNumber, securityNumber){
	this.cardHolder = cardHolder;
  this.type = type;
  this.cardNumber = cardNumber;
  this.securityNumber = securityNumber;
  this.preferredPayment = false;
}

function Pizza(size, toppings, sauce, extra) {
  this.size = size;
  this.toppings = toppings;
  this.sauce = sauce;
  this.extra = extra;
  this.price = this.getPrice();
}

function Side(name, price){
  this.name = name;
  this.price = price;
}

Customer.prototype.getTotal = function () {
  var orderTotal = 0;
  this.order.forEach(function(orderItem) {
    orderTotal+=orderItem.price;
  });
  this.total = orderTotal;
};

// Pizza.prototype.addToppings = function (topping) {
//   this.toppings = topping;
// };

Pizza.prototype.getPrice = function () {
  var total = 0;
  if(this.size === "small") {
    total+= 10;
  }
  else if(this.size === "medium") {
    total+= 12;
  }
  else if(this.size === "large") {
    total+= 14;
  }
  if(this.extra) {
    total+= 3;
  }
  return total;
};


var luke = new Customer("Luke Keysboe");
luke.address.push(new Address("1234 main st.", "Milwaukie", "OR", 97400));
luke.order.push(new Pizza("medium", "regular", false));
luke.payment.push(new Payment(luke.name, "Visa", 123456789011121314, 111));
luke.order.push(new Side("breadsticks", 3));
luke.getTotal();


$(function(){
  var order = [];
  $('form').submit(function(event){
    event.preventDefault();
    var size = $('#size').val();
    var sauce = $('#sauce').val();
    var toppings = [];
    var extra = false;
    $("input:checkbox[name=toppings]:checked").each(function(){
      toppings.push($(this).val());
    });
    if(toppings.length > 3) {
      extra = true;
    }
    order.push(new Pizza(size, toppings, sauce, extra));
    console.log(order);
    reset();
  })
  $('#checkoutButton').click(function() {
    $('form').hide();
    $('#checkout').show();
    var name = $('input#name').val();
    var address = $('input#address').val();
    var city = $('input#city').val();
    var state = $('input#state').val();
    var zip = $('input#zip').val();
    var name = new Customer(name);
    var address = new Address(address, city, state, parseInt(zip));
    name.address.push(address);
  })
  function reset() {
    $('#size').val('');
    $('#sauce').val('');
    $("input:checkbox[name=toppings]").each(function(){
      $(this).prop('checked', false);
    });
  }


})
