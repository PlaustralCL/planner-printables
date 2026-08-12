const date = new Date();
let year = date.getFullYear();

const daysInMonth = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31
};

 /* Build the table that will hold the dates for a month.
 * The table will have 6 rows to ensure there are enough, but
 * only 7 days are needed since that is constant.
 * @parame monthNum {int} the number corresponding to the month. January is 0.
 */
function buildMonthTable(monthNum) {
  const tableBodyId = `month${monthNum}-body`;
  const tableBody = document.getElementById(tableBodyId);
  for (let row = 1; row <= 6; row++) {
    const newRow = document.createElement("tr");
    newRow.id = `row${month}${row}`;
    
    for (let col = 0; col < 7; col++) {
      const newCell = document.createElement("td");
      const cellId = `cell${month}${row}${col}`;
      newCell.id = cellId;
      newCell.textContent = cellId;
      newRow.append(newCell);
    }
    tableBody.append(newRow);
  }
}

/* Add the four-digit year to the month names.
 * @parame monthNum {int} the number corresponding to the month. January is 0.
*/
function addYearToMonthName(monthNum) {
  const monthNameId = `month${monthNum}-name`;
  const monthNameElement = document.getElementById(monthNameId);
  const monthName = monthNameElement.textContent.split(" ")[0];
  monthNameElement.textContent = `${monthName} ${year}`;  
}

/* Add the dates to a month table. If the date is the current day,
 * the date is hightlighted.
 * @param date {string} is a date representing a day in the month.
 * This will be used to find the appropriate year and month.
 */
function populateMonthDates(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const startDate = new Date(year, month, 1);

  let workingDate = startDate;
  for (let row = 1; row <= 6; row++) {
    for (let cell = 0; cell < 7; cell++) {
      const currentCell = document.getElementById(`cell${month}${row}${cell}`);
      if (month === workingDate.getMonth() && workingDate.getDay() === cell) {
        currentCell.textContent = workingDate.getDate();
        workingDate.setDate(workingDate.getDate() + 1);
      } else {
        currentCell.textContent = "";
        if (cell == 0 && workingDate.getDate >= 28) {
          currentCell.classList.add('hide');
        }
      }
    }
  }
}

/*
 * Add a class to change the height of the week row based on the
 * number of rows in the month.
 */
function sizeWeeklyRows(month) {
  for (let row = 1; row <= 6; row++) {
    rowId = `row${month}${row}`;
    rowElement = document.getElementById(`row${month}${row}`);
    const monthStartDate = new Date(year, month, 1);
    const monthStartDay = monthStartDate.getDay();

    rowElement.classList.remove('long-month-tr');
    rowElement.classList.remove('short-month-tr');
    if ((daysInMonth[month] == 31 && (monthStartDay == 5 ||  monthStartDay == 6)) ||
        (daysInMonth[month] == 30 && monthStartDay == 6)) {
      rowElement.classList.add('long-month-tr');
    } else {
      rowElement.classList.add('short-month-tr')
    }
  }
}

/* Fills in the dates for the entire year
 * @param year {string} the year that will be used for all the dates
 */
function populateYear(year) {
  const yearTitle = document.getElementById("year-title");
  yearTitle.textContent = year;
  for (month = 0; month < 12; month++) {
    populateMonthDates(new Date(year, month, 1));
  }
}

function addYear() {
  year += 1;
  console.log(year);
  for (month = 0; month < 12; month++) {
    populateMonthDates(new Date(year, month, 1));
    sizeWeeklyRows(month);
    addYearToMonthName(month);    
  }
}

function subtractYear() {
  year -= 1;
  console.log(year);
  for (month = 0; month < 12; month++) {
    populateMonthDates(new Date(year, month, 1));
    sizeWeeklyRows(month);
    addYearToMonthName(month);    
  }
}

window.onload = function () {
  const date = new Date();
  const year = date.getFullYear();
  for (month = 0; month < 12; month++) {
    addYearToMonthName(month);
    buildMonthTable(month);
    populateMonthDates(new Date(year, month, 1));
    sizeWeeklyRows(month);
  }
};
