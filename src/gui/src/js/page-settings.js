const pageSettings = {
  competitionGroupStageSelected: true,
  config: {
    teams: [],
    groupStage: {
      groups: []
    },
    europaLeague: {
      rounds: []
    },
    championsLeague: {
      rounds: []
    }
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


