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


    let table = document.getElementById("productionTable");


    let row = table.insertRow();


    row.insertCell(0).innerText = date;
    row.insertCell(1).innerText = unit;
    row.insertCell(2).innerText = line;
    row.insertCell(3).innerText = style;
    row.insertCell(4).innerText = target;
    row.insertCell(5).innerText = production;
    row.insertCell(6).innerText =
        efficiency.toFixed(2) + "%";


    alert("Production record saved successfully!");
}