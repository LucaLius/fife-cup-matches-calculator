function calculate() {
  const competition = document.getElementById("competition").value;
  const round = document.getElementById("round").value;

  if (!round) {
    alert("Please enter a valid round number.");
    return;
  }

  fetch(`http://localhost:3000/calculate/${competition}/${round}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("result").innerText = data.message;
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("result").innerText = "Error fetching data.";
    });
}