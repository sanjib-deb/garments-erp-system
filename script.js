let editingIndex = null;
function calculateEfficiency() {

    let target = document.getElementById("target").value;
    let production = document.getElementById("production").value;

    if (target == "" || target == 0) {

        document.getElementById("efficiency").innerText = "0%";

        return;
    }

    let efficiency = (production / target) * 100;

    document.getElementById("efficiency").innerText =
        efficiency.toFixed(2) + "%";
}


function saveProduction() {

    let date = document.getElementById("date").value;
    let unit = document.getElementById("unit").value;
    let line = document.getElementById("line").value;
    let style = document.getElementById("style").value;
    let target = document.getElementById("target").value;
    let production = document.getElementById("production").value;


    if (
        date == "" ||
        line == "" ||
        style == "" ||
        target == "" ||
        production == ""
    ) {

        alert("Please fill all required fields.");

        return;
    }


    let efficiency = (production / target) * 100;


    let record = {

        date: date,
        unit: unit,
        line: line,
        style: style,
        target: target,
        production: production,
        efficiency: efficiency.toFixed(2)

    };


    let records =
        JSON.parse(localStorage.getItem("productionRecords")) || [];


    records.push(record);


    localStorage.setItem(
        "productionRecords",
        JSON.stringify(records)
    );


    displayRecords();


    alert("Production record saved successfully!");
}

function displayRecords() {

    let records =
        JSON.parse(localStorage.getItem("productionRecords")) || [];

    let table =
        document.getElementById("productionTable");

    table.innerHTML = "";


    records.forEach(function(record, index) {

        let row = table.insertRow();

        row.insertCell(0).innerText = record.date;
        row.insertCell(1).innerText = record.unit;
        row.insertCell(2).innerText = record.line;
        row.insertCell(3).innerText = record.style;
        row.insertCell(4).innerText = record.target;
        row.insertCell(5).innerText = record.production;
        row.insertCell(6).innerText =
            record.efficiency + "%";


        let actionCell = row.insertCell(7);


        let editButton =
            document.createElement("button");

        editButton.innerText = "Edit";

        editButton.onclick = function() {
            editProduction(index);
        };


        let deleteButton =
            document.createElement("button");

        deleteButton.innerText = "Delete";

        deleteButton.onclick = function() {
            deleteProduction(index);
        };


        actionCell.appendChild(editButton);

        actionCell.appendChild(deleteButton);

    });

}

displayRecords();

function editProduction(index) {

    let records =
        JSON.parse(localStorage.getItem("productionRecords")) || [];

    let record = records[index];


    document.getElementById("date").value =
        record.date;

    document.getElementById("unit").value =
        record.unit;

    document.getElementById("line").value =
        record.line;

    document.getElementById("style").value =
        record.style;

    document.getElementById("target").value =
        record.target;

    document.getElementById("production").value =
        record.production;


    calculateEfficiency();


    editingIndex = index;


    document.getElementById("updateButton").style.display =
        "inline-block";


    document.getElementById("saveButton").style.display =
        "none";

}

function deleteProduction(index) {

    let records =
        JSON.parse(localStorage.getItem("productionRecords")) || [];

    let confirmDelete =
        confirm("Are you sure you want to delete this record?");

    if (confirmDelete) {

        records.splice(index, 1);

        localStorage.setItem(
            "productionRecords",
            JSON.stringify(records)
        );

        displayRecords();

    }

}

function updateProduction() {

    let records =
        JSON.parse(localStorage.getItem("productionRecords")) || [];


    if (editingIndex === null) {

        return;
    }


    let date = document.getElementById("date").value;
    let unit = document.getElementById("unit").value;
    let line = document.getElementById("line").value;
    let style = document.getElementById("style").value;
    let target = document.getElementById("target").value;
    let production = document.getElementById("production").value;


    if (
        date == "" ||
        line == "" ||
        style == "" ||
        target == "" ||
        production == ""
    ) {

        alert("Please fill all required fields.");

        return;
    }


    let efficiency = (production / target) * 100;


    records[editingIndex] = {

        date: date,
        unit: unit,
        line: line,
        style: style,
        target: target,
        production: production,
        efficiency: efficiency.toFixed(2)

    };


    localStorage.setItem(
        "productionRecords",
        JSON.stringify(records)
    );


    editingIndex = null;


    document.getElementById("updateButton").style.display =
        "none";


    document.getElementById("saveButton").style.display =
        "inline-block";


    displayRecords();


    alert("Production record updated successfully!");

}