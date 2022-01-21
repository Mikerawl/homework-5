var today = moment().format("MMMM Do YYYY");
console.log(today);
$("#currentDay").text(today);

// var hours = ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9']

var saveBtn = document.querySelectorAll(".saveBtn");
var day = document.getElementById("day");

function dailyPlanner() {
    var row;
    var hours = [
        "8 am",
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
    var time = "8 am";
    // for (i = 0; i < hours.length; i++)

    hours.forEach((hours) => {
        row += `<div class="row">
        <div class="time-block">${hours}</div>
        <input class="text-input" value="" placeholder="event entry">
          <div class="saveBtn">save</div> 
          
      </div>`;
    });
    day.innerHTML = row;

}
dailyPlanner();

// Function for changing the colors of the particular time slots.  This will utilize boolean values for past and future times.
// First get current time
function highLighting() {
    var now = new Date();
    var currentHour = now.getHours();

    var saveBtns = document.querySelectorAll(".saveBtn");

    saveBtns.forEach((saveBtn) => {
        timeBtn = saveBtn.classList;

        inputTime = saveBtn.previousElementSibling.classList;

        timeClass = saveBtn.previousElementSibling.previousElementSibling.classList;

        timeText = saveBtn.previousElementSibling.previousElementSibling.innerHTML;

        var hour = moment(timeText, ["h:mm A"]).format("HH");

        console.log("text", hour);

        if (hour < currentHour) {
            timeBtn.add("past");
            inputTime.add("past");
            timeClass.add("past");
        } else if (hour == currentHour) {
            timeBtn.add("present");
            inputTime.add("present");
            timeClass.add("present");
        } else {
            timeBtn.add("future");
            inputTime.add("future");
            timeClass.add("future");
        }
    });
}
highLighting();

// add ids to the hour rows
function addEventID() {
    var saveData = document.getElementsByClassName("saveBtn");
    let length = saveData.length;
    for (i = 0; i < length; i++) {
        saveData[i].id = "saveBtnid-" + (i + 1);
    }
}
addEventID();
// Information needs to added local storage
function storeData() {
    document.querySelectorAll(".saveBtn").forEach((element) => {
        console.log('element', element)

        element.addEventListener('click', (event) => {
            var entryId = element.id;
        });
    });
}

storeData();