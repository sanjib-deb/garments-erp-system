function calculateEfficiency() {

    let target = document.getElementById("target").value;

    let production = document.getElementById("production").value;


    if (target == 0 || target == "") {

        document.getElementById("efficiency").innerText = "0%";

        return;
    }


    let efficiency = (production / target) * 100;


    document.getElementById("efficiency").innerText =
        efficiency.toFixed(2) + "%";

}