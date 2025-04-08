const pageSettings = {
  competitionGroupStageSelected: true,
  groupStage: {
    teamesPerGroup: 4,
    groups: [
      {
        id: 'A',
        teams: [],
      },
      {
        id: 'B',
        teams: [],
      }
    ]
  }
}

window.pageSettings = pageSettings;

fetch(`http://localhost:3000/config`)
  .then(response => response.json())
  .then(data => {
    initPage(data.config);
  })
  .catch(error => {
    console.error("Error:", error);
  });


function initPage(config) {
  window.pageSettings.config = config;
}


