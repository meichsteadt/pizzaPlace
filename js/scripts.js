function Customer(name) {
	this.name = name;
  this.address = [];
  this.payment = {};
  this.order = [];
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
  this.securityNumber = secturityNumber;
}

function Pizza(size, sauce, extra) {
  this.size = size;
  this.toppings = [];
  this.sauce = sauce;
  this.extra = extra;
  //this.price = this.getPrice();
}

function Side(sideName, sidePrice){
  this.sideName = sideName;
  this.sidePrice = sidePrice;
}

Pizza.prototype.addToppings = function (topping) {
  this.toppings.push(topping);
};

var luke = new Customer("Luke Keysboe");
luke.address.push(new Address("1234 main st.", "Milwaukie", "OR", 97400));
luke.order.push(new Pizza("medium", "regular", false));
var toppings = ["cheese", "pepperoni", "bacon"];
toppings.forEach(function(topping) {
  luke.order[0].addToppings(topping);
})

console.log(luke.order);
