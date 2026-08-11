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
    if (daysInMonth[monthNum] == 31) {
      newRow.classList.add('long-month-tr');
    }
    
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
  const today = new Date();
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
    addYearToMonthName(month);    
  }
}

function subtractYear() {
  year -= 1;
  console.log(year);
  for (month = 0; month < 12; month++) {
    populateMonthDates(new Date(year, month, 1));
    addYearToMonthName(month);    
  }
}

window.onload = function () {
  const date = new Date();
  const year = date.getFullYear();
  // const yearTitle = document.getElementById("year-title");
  // yearTitle.textContent = year;
  for (month = 0; month < 12; month++) {
    addYearToMonthName(month);
    buildMonthTable(month);
    populateMonthDates(new Date(year, month, 1));
  }
};
