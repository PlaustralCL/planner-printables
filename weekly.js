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

window.onload = function () {
  //console.log("loaded!");
  //buildMonthTable();
  //populateMonthDates();
};
