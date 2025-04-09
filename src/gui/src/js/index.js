const downloadBtnId = 'downloadBtn';
const calculateBtnId = 'calculateBtn';
const button = document.getElementById(downloadBtnId);
button.style.display = 'none';


document.getElementById(calculateBtnId).addEventListener('click', async function () {
  calculate();
});

function calculate() {
  const button = document.getElementById(downloadBtnId);
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
      button.style.display = 'inline-block';
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("result").innerText = "Error fetching data.";
      button.style.display = 'none';
    });
}

document.getElementById(downloadBtnId).addEventListener('click', async function () {
  const button = document.getElementById(downloadBtnId);

  try {
    const response = await fetch('http://localhost:3000/download-excel');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.zip'; // Name of the file
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Hide the button after successful download
    button.style.display = 'none';
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
});