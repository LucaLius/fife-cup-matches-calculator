# fife-cup-matches-calculator
Match calculator for Fantacalcio FIFE cup matches based on Node.js.
This readme explain how to set up locally the develop environment and make a calculation.

## Set-up environment
Run this commands in order. If you don't have nvm installed, check the suggested node version inside .nvmrc file

nvm use
npm install

## Local development
To develop locally or just generate the files in your local environment, you have to run this command:

npm run start-environment:macos (for macOS users)
npm run start-environment:windows (for Windows users)

then, your browser should be openin the generator page.
Put your files with matches result inside src/input-files/team-files directory (delete all the previous content).
You'll need to update paths in src/config/variables.config.ts with your actual directories locations.
If you want to edit some TBD team in Cup competitions, you need to edit src/config/europa-league-round-list.config.ts or src/config/champions-league-round-list.config.ts.
Fill the inputs and it will generate the files under src/output-files/team-files directory.

