const downloadBtnId = 'downloadBtn';
const calculateBtnGroupStageId = 'calculateBtnGroupStage';
const calculateBtnEuropaLeagueId = 'calculateBtnEuropaLeague';
const calculateBtnChampionsLeagueId = 'calculateBtnChampionsLeague';
const button = document.getElementById(downloadBtnId);
button.style.display = 'none';


document.getElementById(calculateBtnGroupStageId).addEventListener('click', async function () {
  const round = document.getElementById("roundGroupStage").value;
  calculate('GROUP_STAGE', round);
});
document.getElementById(calculateBtnEuropaLeagueId).addEventListener('click', async function () {
  const round = document.getElementById("roundEuropaLeague").value;
  calculate('EUROPA_LEAGUE', round);
});
document.getElementById(calculateBtnChampionsLeagueId).addEventListener('click', async function () {
  const round = document.getElementById("roundChampionsLeague").value;
  calculate('CHAMPIONS_LEAGUE', round);
});

function calculate(competition, round) {
  const button = document.getElementById(downloadBtnId);

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