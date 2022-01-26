var today = moment().format("MMMM Do YYYY");
console.log(today);
$("#currentDay").text(today);

var saveBtns = document.querySelectorAll(".saveBtn");
var day = document.getElementById("day");

function dailyPlanner() {
  let row = "";
  var hours = [
    "8am",
    "9 am",
    "10 am",
    "11 am",
    "12 pm",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
    "6 pm",
    "7 pm",
    "8 pm",
    "9 pm",
  ];

  hours.forEach((hour) => {
    row += `<div class="row">
        <div class="time-block">${hour}</div>
        <input class="text-input" value="" placeholder="Input" value="">
       
        <button class="saveBtn">Save</button> 
   
      </div>`;
  });
  day.innerHTML = row;
}
dailyPlanner();

//for loop to add id's to save buttons
function addHour() {
  let saveBtnId = document.getElementsByClassName("saveBtn");
  let length = saveBtnId.length;
  for (i = 0; i < length; i++) {
    saveBtnId[i].id = "saveBtn-Id-" + (i + 1);
  }
}
addHour();

// Fills the entryies from local storage
function fill() {
  // get items from local storage
  var existingSchedule = JSON.parse(localStorage.getItem("allSchedules"));

  if (existingSchedule) {
    // go through each item from local storeage and match ids - insert entries in to input field
    existingSchedule.forEach((item) => {
      console.log("item", item);
      itemId = item.id;
      entry = item.entry;

      var itemFill = document.getElementById(`${itemId}`);
      var entryFill = itemFill.previousElementSibling;

      itemFill.previousElementSibling.value = entry;
    });
  } else {
  }
}
fill();

// Save to local storage
function saveEntries() {
  saveBtns = document.querySelectorAll(".saveBtn");

  // Listens for a click on all save buttons
  saveBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      // get items to be saved to localstorage
      let itemId = item.id;
      entry = item.previousElementSibling.value;

      var addEntry = {
        id: itemId,
        entry: entry,
      };

      // saving to local storage
      var existingSchedule =
        JSON.parse(localStorage.getItem("allSchedules")) || [];

      localStorage.setItem("addEntry", JSON.stringify(addEntry));
      existingSchedule.push(addEntry);
      localStorage.setItem("allSchedules", JSON.stringify(existingSchedule));
    });
  });
}
saveEntries();

// Sets color of box based on time
function getHours() {
  //  determine the current hour...
  let now = new Date();
  let currentHour = now.getHours();

  var timeBlock = document.querySelectorAll(".saveBtn");

  // for each time block evalute the time and se approrate colors
  timeBlock.forEach((time) => {
    timeBtn = time.classList;

    inputTime = time.previousElementSibling.classList;
    timeTime = time.previousElementSibling.previousElementSibling.classList;
    var hour = time.previousElementSibling.previousElementSibling.innerHTML;

    var day = moment(hour, ["h:mm A"]).format("HH");

    if (day < currentHour) {
      timeBtn.add("past");
      inputTime.add("past");
      timeTime.add("past");
    } else if (day == currentHour) {
      timeBtn.add("present");
      inputTime.add("present");
      timeTime.add("present");
    } else {
      timeBtn.add("future");
      inputTime.add("future");
      timeTime.add("future");
    }
  });
}
getHours();
