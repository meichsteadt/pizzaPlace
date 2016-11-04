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

function Payment(cardHolder, cardType, cardNumber, securityNumber){
	this.cardHolder = cardHolder;
  this.cardType = cardType;
  this.cardNumber = cardNumber;
  this.securityNumber = securityNumber;
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

Address.prototype.fullAddress = function () {
  return "" + this.street + ", " + this.city + ", " + this.state + " " + this.zip;
};

Payment.prototype.lastFour = function() {
    var last = "";
    for(var i = 4; i>0;i--) {
      last+=this.cardNumber.charAt(this.cardNumber.length - i);
    }
    return last;
}

Pizza.prototype.getPrice = function () {
  var total = 0;
  if(this.size === "Small") {
    total+= 10;
  }
  else if(this.size === "Medium") {
    total+= 12;
  }
  else if(this.size === "Large") {
    total+= 14;
  }
  if(this.extra) {
    total+= 3;
  }
  return total;
};

$(function(){
  var order = [];
  var guest = new Customer("");
  $('form#orderForm').submit(function(event){
    event.preventDefault();
    var size = $('#size').val();
    var sauce = $('#sauce').val();
    var toppings = [];
    var toppingsString = "";
    var extra = false;
    $("input:checkbox[name=toppings]:checked").each(function(){
      toppings.push($(this).val());
    });
    if(toppings.length > 3) {
      extra = true;
    }
    toppings.forEach(function(topping) {
      toppingsString += ", " +topping;
    })
    var pizza = new Pizza(size, toppings, sauce, extra);
    order.push(pizza);
    guest.order.push(pizza);
    guest.getTotal();
    if(toppings.length === 0) {
      toppingsString = ", plain"
    }
    $('.order').append("<li>1x: <em>$" + pizza.price + "</em> " + pizza.size + toppingsString + " pizza with " +pizza.sauce + "</li>");
    $('.total').html("Total: <em>$" + guest.total + "</em>");
    $('#next').show();
    $('.thin').show();
    $('#displayOrder').show();
    reset();
  })
  $('#next').click(function() {
    $('#orderForm').hide();
    $('#paymentInfo').show();
    $('#checkoutButton').show();
    $('#next').hide();
    $('.intro').hide();
  });
  $('form#paymentInfo').submit(function(event) {
    event.preventDefault();
    var name = $('input#name').val();
    var address = $('input#address').val();
    var city = $('input#city').val();
    var state = $('input#state').val();
    var zip = $('input#zip').val();
    var name = new Customer(name);
    var address = new Address(address, city, state, parseInt(zip));
    var cardName = $('#cardName').val();
    var cardType = $('#cardType').val();
    var cardNumber = $('#cardNumber').val();
    var securityNumber = parseInt($('#securityNumber').val());
    // if(cardNumber.length !== 16) {
    //   $('.cardNumberError').html("<em>Please make sure to enter 16 digits</em>");
    // }
    // else {
      var newPayment = new Payment(cardName, cardType, cardNumber, securityNumber);
      name.address.push(address);
      name.payment.push(newPayment);
      name.order = order;
      if($("input:checkbox[name=secondAddress]:checked").val()) {
        address = $('input#addressBilling').val();
        city = $('input#cityBilling').val();
        state = $('input#stateBilling').val();
        zip = $('input#zipBilling').val();
        var billingAddress = new Address(address, city, state, parseInt(zip));
      }
    // }
    name.address.push(billingAddress);
    $('.customerName').text(name.name);
    $('.customerAddress').text(name.address[0].fullAddress());
    $('.customerPayment').text("Payment: " + name.payment[0].cardType + " card ending in " + name.payment[0].lastFour());
    $('#confirmation').show();
    $('#paymentInfo').hide();
    $('#displayOrder').hide();
  });
  $('.what').click(function(){
    $('.explain').toggle();
  })
  $('#secondAddress').click(function() {
    $('.secondAddress').slideToggle();
  })
  function reset() {
    $('#size option[value="Small"]').prop("selected",true);
    $('#sauce option[value="Marinara"]').prop("selected",true);
    $("input:checkbox[name=toppings]").each(function(){
      $(this).prop('checked', false);
    });
    $("input:checkbox[value=Cheese]").prop("checked", true);
  }


})
