// ==================================================
// 1. EDITING RECORD INDEX
// ==================================================

let editingIndex = null;


// ==================================================
// 2. CALCULATE EFFICIENCY
// ==================================================

function calculateEfficiency() {

    let target =
        document.getElementById("target").value;

    let production =
        document.getElementById("production").value;


    if (target == "" || target == 0) {

        document.getElementById("efficiency").innerText =
            "0%";

        return;
    }


    let efficiency =
        (production / target) * 100;


    document.getElementById("efficiency").innerText =
        efficiency.toFixed(2) + "%";

}


// ==================================================
// 3. SAVE NEW PRODUCTION RECORD
// ==================================================

function saveProduction() {

    let date =
        document.getElementById("date").value;

    let unit =
        document.getElementById("unit").value;

    let line =
        document.getElementById("line").value;

    let style =
        document.getElementById("style").value;

    let target =
        document.getElementById("target").value;

    let production =
        document.getElementById("production").value;


    // Check Required Fields

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


    // Calculate Efficiency

    let efficiency =
        (production / target) * 100;


    // Create Production Record

    let record = {

        date: date,
        unit: unit,
        line: line,
        style: style,
        target: target,
        production: production,
        efficiency: efficiency.toFixed(2)

    };


    // Get Existing Records

    let records =
        JSON.parse(
            localStorage.getItem("productionRecords")
        ) || [];


    // Add New Record

    records.push(record);


    // Save Records to Local Storage

    localStorage.setItem(
        "productionRecords",
        JSON.stringify(records)
    );


    // Refresh Table

    displayRecords();


    // Refresh Dashboard

    updateDashboard();


    alert("Production record saved successfully!");

}


// ==================================================
// 4. DISPLAY PRODUCTION RECORDS
// ==================================================

function displayRecords(filteredRecords = null) {

    let records =
    filteredRecords !== null
        ? filteredRecords
        : JSON.parse(
            localStorage.getItem("productionRecords")
        ) || [];


    let table =
        document.getElementById("productionTable");


    // Clear Existing Table

    table.innerHTML = "";


    // Display Each Record

    records.forEach(function(record, index) {

        let row =
            table.insertRow();


        row.insertCell(0).innerText =
            record.date;

        row.insertCell(1).innerText =
            record.unit;

        row.insertCell(2).innerText =
            record.line;

        row.insertCell(3).innerText =
            record.style;

        row.insertCell(4).innerText =
            record.target;

        row.insertCell(5).innerText =
            record.production;

        row.insertCell(6).innerText =
            record.efficiency + "%";


        // Action Column

        let actionCell =
            row.insertCell(7);


        // Edit Button

        let editButton =
            document.createElement("button");

        editButton.innerText =
            "Edit";


        editButton.onclick = function() {

            editProduction(index);

        };


        // Delete Button

        let deleteButton =
            document.createElement("button");

        deleteButton.innerText =
            "Delete";


        deleteButton.onclick = function() {

            deleteProduction(index);

        };


        // Add Buttons to Action Cell

        actionCell.appendChild(editButton);

        actionCell.appendChild(deleteButton);

    });

}


// ==================================================
// 5. EDIT PRODUCTION RECORD
// ==================================================

function editProduction(index) {

    let records =
        JSON.parse(
            localStorage.getItem("productionRecords")
        ) || [];


    let record =
        records[index];


    // Load Record into Form

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


    // Calculate Current Efficiency

    calculateEfficiency();


    // Remember Editing Record

    editingIndex = index;


    // Show Update Button

    document.getElementById("updateButton").style.display =
        "inline-block";


    // Hide Save Button

    document.getElementById("saveButton").style.display =
        "none";

}


// ==================================================
// 6. UPDATE EXISTING PRODUCTION RECORD
// ==================================================

function updateProduction() {

    let records =
        JSON.parse(
            localStorage.getItem("productionRecords")
        ) || [];


    // Check Editing Record

    if (editingIndex === null) {

        return;
    }


    let date =
        document.getElementById("date").value;

    let unit =
        document.getElementById("unit").value;

    let line =
        document.getElementById("line").value;

    let style =
        document.getElementById("style").value;

    let target =
        document.getElementById("target").value;

    let production =
        document.getElementById("production").value;


    // Check Required Fields

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


    // Calculate New Efficiency

    let efficiency =
        (production / target) * 100;


    // Update Existing Record

    records[editingIndex] = {

        date: date,
        unit: unit,
        line: line,
        style: style,
        target: target,
        production: production,
        efficiency: efficiency.toFixed(2)

    };


    // Save Updated Records

    localStorage.setItem(
        "productionRecords",
        JSON.stringify(records)
    );


    // Reset Editing Mode

    editingIndex = null;


    // Hide Update Button

    document.getElementById("updateButton").style.display =
        "none";


    // Show Save Button

    document.getElementById("saveButton").style.display =
        "inline-block";


    // Refresh Table

    displayRecords();


    // Refresh Dashboard

    updateDashboard();


    alert("Production record updated successfully!");

}


// ==================================================
// 7. DELETE PRODUCTION RECORD
// ==================================================

function deleteProduction(index) {

    let records =
        JSON.parse(
            localStorage.getItem("productionRecords")
        ) || [];


    // Confirmation

    let confirmDelete =
        confirm(
            "Are you sure you want to delete this record?"
        );


    if (confirmDelete) {

        // Delete Record

        records.splice(index, 1);


        // Save Updated Records

        localStorage.setItem(
            "productionRecords",
            JSON.stringify(records)
        );


        // Refresh Table

        displayRecords();


        // Refresh Dashboard

        updateDashboard();

    }

}


// ==================================================
// 8. UPDATE DASHBOARD KPI
// ==================================================

function updateDashboard() {

    let records =
        JSON.parse(
            localStorage.getItem("productionRecords")
        ) || [];


    let totalTarget = 0;

    let totalProduction = 0;

    let lines = [];


    // Calculate KPI Data

    records.forEach(function(record) {

        totalTarget +=
            Number(record.target);


        totalProduction +=
            Number(record.production);


        // Find Unique Lines

        if (!lines.includes(record.line)) {

            lines.push(record.line);

        }

    });


    // Calculate Overall Efficiency

    let overallEfficiency = 0;


    if (totalTarget > 0) {

        overallEfficiency =
            (totalProduction / totalTarget) * 100;

    }


    // Display Total Target

    document.getElementById("totalTarget").innerText =
        totalTarget.toLocaleString();


    // Display Total Production

    document.getElementById("totalProduction").innerText =
        totalProduction.toLocaleString();


    // Display Overall Efficiency

    document.getElementById("overallEfficiency").innerText =
        overallEfficiency.toFixed(2) + "%";


    // Display Active Lines

    document.getElementById("activeLines").innerText =
        lines.length;

}


// ==================================================
// 9. LOAD DATA WHEN PAGE OPENS
// ==================================================

displayRecords();

updateDashboard();

// ==================================================
// 10. FILTER PRODUCTION RECORDS
// ==================================================

function filterRecords() {

    let filterDate =
        document.getElementById("filterDate").value;

    let filterUnit =
        document.getElementById("filterUnit").value;


    let records =
        JSON.parse(
            localStorage.getItem("productionRecords")
        ) || [];


    let filteredRecords = records.filter(function(record) {

        let dateMatch =
            filterDate == "" ||
            record.date == filterDate;


        let unitMatch =
            filterUnit == "" ||
            record.unit == filterUnit;


        return dateMatch && unitMatch;

    });


    displayRecords(filteredRecords);

}

// ==================================================
// 11. CLEAR PRODUCTION FILTERS
// ==================================================

function clearFilters() {

    document.getElementById("filterDate").value = "";

    document.getElementById("filterUnit").value = "";


    displayRecords();

}