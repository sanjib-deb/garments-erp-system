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


    records.forEach(function(record) {

        let row = table.insertRow();


        row.insertCell(0).innerText = record.date;
        row.insertCell(1).innerText = record.unit;
        row.insertCell(2).innerText = record.line;
        row.insertCell(3).innerText = record.style;
        row.insertCell(4).innerText = record.target;
        row.insertCell(5).innerText = record.production;
        row.insertCell(6).innerText =
            record.efficiency + "%";

    });

}

displayRecords();