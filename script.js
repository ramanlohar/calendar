let table = document.getElementById("table");
let Manthname = document.getElementById("Manthname");
let headingyear = document.getElementById("headingyear");
var Count = 1;

const prev = document.getElementById("prev");
const next = document.getElementById("next");

date = new Date();
var currentday = date.getDate();
var currentmonth = date.getMonth() + 1;
var currentyear = date.getFullYear();


next.addEventListener("click", () => {
  currentmonth = currentmonth + 1;
  if(currentmonth>12){
    currentmonth = 1
    currentyear++;
  }
  refresh();
});

prev.addEventListener("click", () => {
  currentmonth -= 1;
  if(currentmonth<1){
    currentmonth = 12
    currentyear--;
  }
  refresh();
});

function refresh() {
  const Year = currentyear;
  var month = currentmonth;
  const day = "1";
  // 2024-1-1
  inputDate = Year + "-" + month + "-" + day;

  const monthName = getMonthName(inputDate);
  const daysofmmonth = getDaysInMonth(inputDate);
  const dayOfWeek1 = getDayOfWeek(inputDate);

  Manthname.innerText = monthName + " " + Year;
  headingyear.innerText = "Calendar " + Year;

  if (dayOfWeek1 >= 5) {
    var rundays = 6;
  } else {
    var rundays = 5;
  }

  Count = 1; // Reset Count to start from 1 for the new month
  table.innerHTML = `<tr>
  <th>Sun</th>
  <th>Mon</th>
  <th>Tue</th>
  <th>Wed</th>
  <th>Thu</th>
  <th>Fri</th>
  <th>Sat</th>
</tr>`; // Clear the existing calendar
  create(rundays, month, Year, daysofmmonth,currentday);
}

function create(rundays, month, Year, daysofmmonth,currentday) {
  for (let i = 1; i <= rundays; i++) {
    let ctr = document.createElement("tr");
    ctr.classList.add("ctr");

    table.appendChild(ctr);

    for (let index = 0; index < 7; index++) {
      const dayOfWeek = getDayOfWeek(Year + "-" + month + "-" + Count);
      let ctd = document.createElement("td");

      if (index >= dayOfWeek && Count <= daysofmmonth) {
        if(Count == currentday){
            ctd.style.color = "white"
            ctd.style.backgroundColor = "#007bffa8"
            ctd.style.borderRadius = "10px"
        }
        ctd.innerText = Count;
        Count++;
      }

      ctr.appendChild(ctd);
    }
  }
}

function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const dayOfWeekIndex = date.getDay();
  return dayOfWeekIndex;
}

function getDaysInMonth(ymd) {
  const inputDate = new Date(ymd);
  const year1 = inputDate.getFullYear();
  const month1 = inputDate.getMonth();
  return new Date(year1, month1 + 1, 0).getDate();
}

function getMonthName(dateString) {
  const date = new Date(dateString);
  const monthName = date.toLocaleString("default", { month: "long" });
  return monthName;
}

// create();
refresh() // Initially create the calendar for the current month
