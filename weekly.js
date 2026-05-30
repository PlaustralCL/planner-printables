const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

mondayFullDate = new Date();

function buildMonthTable(calendarId) {
  const tableBody = document.getElementById(`${calendarId}-table-body`);
  for (let row = 1; row <= 6; row++) {
    const newRow = document.createElement("tr");
    newRow.id = `row${calendarId}${row}`;
    for (let col = 0; col < 7; col++) {
      const newCell = document.createElement("td");
      const cellId = `cell${calendarId}${row}${col}`;
      newCell.id = cellId;
      newCell.textContent = cellId;
      newRow.append(newCell);
    }
    tableBody.append(newRow);
  }
}

function populateMonthDates(calendarId) {
  const year = mondayFullDate.getFullYear();
  let month = mondayFullDate.getMonth();
  if (calendarId === "calendar2") {
    month += 1;
  }
  const startDate = new Date(year, month, 1);
  console.log(`${calendarId}: ${month}`);

  const monthHeader = document.getElementById(`${calendarId}-header`);
  monthHeader.textContent = startDate.toLocaleString("default", { month: "long" });

  let workingDate = startDate;
  for (let row = 1; row <= 6; row++) {
    for (let cell = 0; cell < 7; cell++) {
      const currentCell = document.getElementById(`cell${calendarId}${row}${cell}`);
      if (month === workingDate.getMonth() && workingDate.getDay() === cell) {
        currentCell.textContent = workingDate.getDate();
        workingDate.setDate(workingDate.getDate() + 1);
        //currentCell.classList.add("current-week");
      } else {
        currentCell.textContent = "";
      }

      sundayFullDate = new Date(year, month, mondayFullDate.getDate());
      sundayFullDate.setDate(mondayFullDate.getDate() + 7);
      if (currentCell.textContent != "" && workingDate > mondayFullDate && workingDate <= sundayFullDate) {
        console.log(mondayFullDate);
        currentCell.classList.add("current-week");
      } else {
        currentCell.classList.remove("current-week");
      }
    }
  }
}

function setMondayDate(startDate) {
  mondayFullDate = startDate;
  day = mondayFullDate.getDay();
  if (day === 0) {
    mondayFullDate.setDate(startDate.getDate() - 6);
  } else if (day != 1) {
    mondayFullDate.setDate(startDate.getDate() - (day - 1));
  }
}

function setMonthHeaders() {
  mondayMonth = mondayFullDate.getMonth();
  mondayFullYear = mondayFullDate.getFullYear();
  headerText1 = `${months[mondayMonth]} ${mondayFullYear}`;
  header1 = document.getElementById("header-month-1");
  header1.textContent = headerText1;

  sundayFullDate = new Date(mondayFullYear, mondayMonth, mondayFullDate.getDate()); // Place holder date
  sundayFullDate.setDate(sundayFullDate.getDate() + 6);
  sundayMonth = sundayFullDate.getMonth();
  sundayYear = sundayFullDate.getFullYear();
  headerText2 = `${months[sundayMonth]} ${sundayYear}`;
  header2 = document.getElementById("header-month-2");
  header2.textContent = headerText2;
}

function setWeeklyDates() {
  // Add dates to the days in the weekly lines
  //workingDate = mondayFullDate;
  workingDate = new Date(mondayFullDate.getFullYear(), mondayFullDate.getMonth(), mondayFullDate.getDate());
  for (i = 1; i < 8; i++) {
    const dayId = document.getElementById(`day${i % 7}`);
    currentValue = dayId.textContent;
    dayName = currentValue.split(" ")[1];
    dayId.textContent = `${workingDate.getDate()} ${dayName}`;
    workingDate.setDate(workingDate.getDate() + 1);
  }
}

function addWeek() {
  mondayFullDate.setDate(mondayFullDate.getDate() + 7);
  setMonthHeaders();
  setWeeklyDates();

  populateMonthDates("calendar1");
  populateMonthDates("calendar2");
}

function subtractWeek() {
  mondayFullDate.setDate(mondayFullDate.getDate() - 7);
  setMonthHeaders();
  setWeeklyDates();

  populateMonthDates("calendar1");
  populateMonthDates("calendar2");
}

window.onload = function () {
  //console.log("loaded!");
  //buildMonthTable();
  //populateMonthDates();

  startDate = new Date(2026, 4, 22); // 5/22/26

  setMondayDate(startDate);
  setMonthHeaders();
  setWeeklyDates();

  buildMonthTable("calendar1");
  populateMonthDates("calendar1");

  buildMonthTable("calendar2");
  populateMonthDates("calendar2");
};
