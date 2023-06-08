const input_date = document.getElementById("day");
const input_month = document.getElementById("month");
const input_year = document.getElementById("year");

const day = document.getElementById("DD");
const month = document.getElementById("MM");
const year = document.getElementById("YY");

const date = new Date();
let dayNow = date.getDate();
let monthNow = 1 + date.getMonth();
let yearNow = date.getFullYear();

const form = document.querySelector("form");

const days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validateInput() {
  const userInputs = document.querySelectorAll("input");
  let val_flag = true;
  userInputs.forEach((input) => {
    const parent = input.parentElement;
    if (!input.value) {
      input.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required";
      val_flag = false;
    } else if (input_month.value > 12) {
        input_month.style.borderColor = "red";
        input_month.parentElement.querySelector("small").innerText = "Entered month must be valid";
        val_flag = false;
    } else if (input_date.value > 31) {
        input_date.style.borderColor = "red";
        input_date.parentElement.querySelector("small").innerText =
          "Entered day must be valid";
        val_flag = false;
    } else if (input_year.value > yearNow){
        input_year.style.borderColor = "red";
        input_year.parentElement.querySelector("small").innerText =
          "Year must not be in the future";
        val_flag = false;
    } else {
      input.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
      val_flag = true;
    }
  });
  return val_flag;
}

function submitBtnHandle(e) {
  e.preventDefault();
  if (validateInput()) {
    if (input_date.value > dayNow) {
      dayNow = dayNow + days_in_months[monthNow - 1];
      monthNow = monthNow - 1;
    }
    if (input_month.value > monthNow) {
      monthNow = monthNow + 12;
      yearNow = yearNow - 1;
    }

    const resulting_day = dayNow - input_date.value;
    const resulting_month = monthNow - input_month.value;
    const resulting_year = yearNow - input_year.value;

    day.innerHTML = resulting_day;
    month.innerHTML = resulting_month;
    year.innerHTML = resulting_year;
  }
}

form.addEventListener("submit", submitBtnHandle);