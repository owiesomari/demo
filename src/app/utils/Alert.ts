export class Alert {
    public setupAlertDiv(type: string, title: string, text: string) {
        var alertTitle = (document.getElementById("alertTitle") as HTMLDivElement)
        var alertText = (document.getElementById("alertText") as HTMLDivElement)
        var alertDiv = (document.getElementById("alertDiv") as HTMLDivElement)
        alertTitle.innerText = title;
        alertText.innerText = text;
        if (type == "s") {
            alertDiv.style.background = "#67CF94"
            alertDiv.style.border = "2px solid green"
            alertDiv.style.color = "#fff"
        }
        else {
            alertDiv.style.background = "#f8d7da"
            alertDiv.style.border = "2px solid red"
            alertDiv.style.color = "black"

        }
        alertDiv.style.display = "block";
        setTimeout(function () {
            alertDiv.style.display = "none";
        }, 3000);
    }
}