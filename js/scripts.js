// business logic
var ticketArray = [];
var Ticket = function(movieName, age, time, price) {
  this.movieName = movieName;
  this.age = age;
  this.time = time;
  this.price = price;
  this.imgFile = findImage(movieName);
}

var findImage = function(movieName) {
  if (movieName === "Ocean's Eleven") {
    return "img/oceansEleven.jpeg";
  } else if (movieName === "The Incredibles 2") {
    return "img/incredibles2.jpeg";
  } else if (movieName === "Up") {
    return "img/up.jpeg";
  } else {
    return "img/michaelClayton.jpg"
  }
}

var priceCalculation = function(inputtedMovie, inputtedAge, inputtedTime, inputtedType) {
  var price = 10;
  if (inputtedMovie === "Ocean's Eleven") {
    price -= 2;
  }
  if (inputtedMovie === "The Incredibles 2") {
    price += 2;
  }
  if (inputtedAge === "60+" || inputtedAge === "Under 13") {
    price -= 2;
  }
  if (inputtedTime === "11:00" || inputtedTime === "3:00") {
    price -= 2;
  }

  if (inputtedType === "3D") {
    price += 5;
  }

  if (inputtedType === "IMAX") {
    price += 7;
  }
  return price;
}

var tax = function(inputPrice) {
  inputPrice = (0.095 * inputPrice).toFixed(2);
  return inputPrice;
}
// user logic
$(document).ready(function() {
  var total = 0;
  $('button#buy').click(function() {
    $("#outputTotal").show();
    total = 0;
    var inputtedMovie = $("#movie").val();
    var inputtedAge = $("#age").val();
    var inputtedTime = $("#time").val();
    var inputtedType = $("#type").val();
    var newTicket = new Ticket(inputtedMovie, inputtedAge, inputtedTime, priceCalculation(inputtedMovie, inputtedAge, inputtedTime, inputtedType));
    ticketArray.push(newTicket);
    $("#output").text("");
    $("#outputTotal").text("");
    for (var i = 0; i < ticketArray.length; i++) {

    $("#output").append("<div class='ticketImage'>Movie: " + ticketArray[i].movieName + "<br>Time Showing: " + ticketArray[i].time + "<br>Ticket Price: $" + ticketArray[i].price + ".00" + "</div>");
    var img = $('<img />',
                  {class:'ticketImage',
                   src: ticketArray[i].imgFile
                 }).appendTo($("#output"));
    total += ticketArray[i].price;
  }
    $("#outputTotal").append("<hr>Subtotal: $" + total + ".00")
    $("#outputTotal").append("<br>Tax: $" + tax(total));
    total = parseFloat(total) + parseFloat(tax(total));
    $("#outputTotal").append("<br><strong>Total Price: $" + total + "</strong>");

    // select element input grab - for later *
  });
});
