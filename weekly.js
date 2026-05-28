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

function buildMonthTable() {
  const tableBody = document.getElementById("table-body");
  for (let row = 1; row <= 6; row++) {
    const newRow = document.createElement("tr");
    newRow.id = `row${row}`;
    for (let col = 0; col < 7; col++) {
      const newCell = document.createElement("td");
      const cellId = `cell${row}${col}`;
      newCell.id = cellId;
      newCell.textContent = cellId;
      newRow.append(newCell);
    }
    tableBody.append(newRow);
  }
}

function populateMonthDates() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDate = new Date(year, month, 1);

  const monthHeader = document.getElementById("month-header");
  monthHeader.textContent = date.toLocaleString("default", { month: "long" });

  let workingDate = startDate;
  for (let row = 1; row <= 6; row++) {
    for (let cell = 0; cell < 7; cell++) {
      const currentCell = document.getElementById(`cell${row}${cell}`);
      if (month === workingDate.getMonth() && workingDate.getDay() === cell) {
        currentCell.textContent = workingDate.getDate();
        workingDate.setDate(workingDate.getDate() + 1);
      } else {
        currentCell.textContent = "";
      }
    }
  }
}

function setMondayDate(startDate) {
  console.log(startDate);
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
  headerText = `${months[mondayMonth]} ${mondayFullYear}`;
  header1 = document.getElementById("header-month-1");
  header1.textContent = headerText;
  header2 = document.getElementById("header-month-2");
  header2.textContent = headerText;
}

function setWeeklyDates() {
  // Add dates to the days in the weekly lines
  workingDate = mondayFullDate;
  console.log(startDate);
  for (i = 1; i < 8; i++) {
    const dayId = document.getElementById(`day${i % 7}`);
    currentValue = dayId.textContent;
    dayId.textContent = `${workingDate.getDate()} ${currentValue}`;
    workingDate.setDate(workingDate.getDate() + 1);
  }
}

function addWeek() {

}

function subtractWeek() {

}

window.onload = function () {
  //console.log("loaded!");
  //buildMonthTable();
  //populateMonthDates();

  startDate = new Date(2026, 4, 22); // 5/22/26

  setMondayDate(startDate);
  setMonthHeaders();
  setWeeklyDates();
};
