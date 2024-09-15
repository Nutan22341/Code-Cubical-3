// Retrieve the summary from localStorage and display it
const summaryText = localStorage.getItem("summary");
document.getElementById("summary-text").textContent = summaryText;
