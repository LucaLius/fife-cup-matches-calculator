# fife-cup-matches-calculator
Match calculator for Fantacalcio FIFE cup matches based on Node.js.
This readme explain how to set up locally the develop environment and make a calculation.

## Specifications
This is a project based node.js and very simple HTML/CSS/JS. There are Jest unit tests for almost all the functionalities.
Server side is managed by node.js and expose services with Express. Holds also the configurations (hard-coded in files for the moment).
Client side for the moment have a single HTML page that call the services exposed.

The folder structure is:
 
/project-root 
├── integration-test/ # Integration test related resources 
├── src/ # Source Code (quite a mess, something like /gui could be extracted)
│ ├── calendar-importer/          # Creates match combinations, it doesn't import anything. RENAME AND REFACTOR
│ ├── config/                     # Hard-coded configurations (teams, groups, stages, ...). MOVE THEM INTO MORE FLEXIBLE SYSTEM!
│ ├── enums/                      # Typescript enums
│ ├── excel-utils/                # Wrapper for the excel parsing dependecies
│ ├── gui/                        # Basic Frontend
│ ├── match-calculator/           # From two JSON TeamInfo returns the match esit info
│ ├── models/                     # Typescript models
│ ├── output-files-generator/     # Holds response excel templates and code to fill them with real values
│ ├── teams-info-importer/        # Reads input files and returns JSON based team informations
│ ├── app.ts                      # Base Express.js file, declares all endpoints
│ └── index.ts                    # Legacy application entry points, now should be the "logics" layer directly called by app.ts
├── test/ # Unit test related resources 
└── tmp/ # Input files source - Output files destination

## Set-up environment
Run this commands in order. If you don't have nvm installed, check the suggested node version inside .nvmrc file

nvm use
npm install

## Local development / generation
To develop locally or just generate the files in your local environment, you have to:

1 - run this command:

npm run start-environment:macos (for macOS users)
npm run start-environment:windows (for Windows users)

then, your browser should be open the generator page. If you see a page with configuration and inputs, you're almost ready.

2 - Put your files with matches result inside this directory (delete all the previous content):
  tmp/input-files/team-files

3 - You'll probably need to update some paths in this file with your actual directories locations:
  src/config/variables.config.ts

4 - For group stage, you only need to define the groups and the match day combinations are automatically defined. For the elimination phase you probably have to edit some TBD team in Cup competitions based on the last results. For both those tasks you need to edit one of these files:
  src/config/group-stage-group-list.config.ts
  src/config/europa-league-round-list.config.ts
  src/config/champions-league-round-list.config.ts

5 - Fill the inputs and it will generate the files under tmp/output-files/team-files directory. You can directly download the .zip file with the button on the page.

