function pageSettings() {
  return {
    competitionGroupStageSelected: true,
    config: {
      teams: [],
      groupStage: { groups: [] },
      europaLeague: { rounds: [] },
      championsLeague: { rounds: [] }
    },
    init() {
      fetch("http://localhost:3000/config")
        .then(r => r.json())
        .then(data => {
          this.config = data.config;
        })
        .catch(console.error)
    }
  }
}

window.pageSettings = pageSettings;
