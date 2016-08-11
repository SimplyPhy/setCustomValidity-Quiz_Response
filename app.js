
/************* Simple validation app for "Building High Conversion Web Forms" quiz  **********/

// regex pattern variables
var reqSym = new RegExp('[\!\@\#\$\%\^\&\*]'),
    reqNum = new RegExp('[0-9]'),
    reqLow = new RegExp('[a-z]'),
    reqUpp = new RegExp('[A-Z]'),
    reqNone = new RegExp('[^A-z0-9\!\@\#\$\%\^\&\*]');

var charReqItem = document.getElementById("charReq"),
    symReqItem = document.getElementById("symReq"),
    noneReqItem = document.getElementById("noneReq"),
    numReqItem = document.getElementById("numReq"),
    lowReqItem = document.getElementById("lowReq"),
    uppReqItem = document.getElementById("uppReq");

var errorMessages = [
  "•Password must be between 16 and 100 characters long",
  "•Password must contain one of the listed symbols",
  "•Password contains illegal characters",
  "•Password must contain a number",
  "•Password must contain a lowercase letter",
  "•Password must contain an uppercase letter"
];

var allErrors = "";

var firstPasswordInput = document.querySelector('#first'),
    secondPasswordInput = document.querySelector('#second'),
    passTwoLabel = document.querySelector('#passTwo'),
    requirements = document.querySelectorAll('li');
    submit = document.querySelector('#submit');

// instantiate password vars
var passOne,
    passTwo,
    oneEqualsTwo = false;


firstPasswordInput.oninput = function(){

  passOne = firstPasswordInput.value;

  if(passOne.length > 15 && passOne.length < 101) {
    charReqItem.style.color = 'green';
  } else {
    charReqItem.style.color = 'orange';
  }

  if (reqSym.test(passOne)) {
    symReqItem.style.color = 'green';
  } else {
    symReqItem.style.color = 'orange';
  }

  if (reqNum.test(passOne)) {
    numReqItem.style.color = 'green';
  } else {
    numReqItem.style.color = 'orange';
  }

  if (reqLow.test(passOne)) {
    lowReqItem.style.color = 'green';
  } else {
    lowReqItem.style.color = 'orange';
  }

  if (reqUpp.test(passOne)) {
    uppReqItem.style.color = 'green';
  } else {
    uppReqItem.style.color = 'orange';
  }

  if (reqNone.test(passOne)) {
    noneReqItem.style.color = 'orange';
  } else {
    noneReqItem.style.color = 'green';
  }

  if (passOne === passTwo) {
    oneEqualsTwo = true;
    passTwoLabel.style.color = 'black';
  } else {
    oneEqualsTwo = false;
    passTwoLabel.style.color = 'orange';
  }

};

secondPasswordInput.oninput = function(){
  passTwo = secondPasswordInput.value;

  if (passTwo === passOne){
      oneEqualsTwo = true;
      passTwoLabel.style.color = 'black';
  } else {
      oneEqualsTwo = false;
      passTwoLabel.style.color = 'orange';
  }
};

// initiate error var
var error;

submit.onclick = function () {
  error = false;

  if (oneEqualsTwo !== true) {
      allErrors += "•Passwords must match \n";
      error = true;
  }

  for (var i = 0; i < requirements.length; i++){
    if(requirements[i].style.color === "orange") {

      allErrors += (errorMessages[i] + "\n");
      error = true;
    }
  }
  secondPasswordInput.setCustomValidity(allErrors);
  allErrors = "";

  if(error === false) {
    var congratsH3 = document.createElement('h3');
    var congratsText = document.createTextNode("You're awesome!!!");
    congratsH3.appendChild(congratsText);
    congratsH3.setAttribute('id', 'congrats');
    congratsH3.style.color = 'green';
    var form = document.querySelector('form');
    console.log(congratsH3);
    form.appendChild(congratsH3);

    setTimeout(function(){
      secondPasswordInput.setCustomValidity("");
    },4000);
  }
};

// aA1!asdfasdfasdf    <-- use this for easy testing of correct input