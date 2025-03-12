# fife-cup-matches-calculator
Match calculator for Fantacalcio FIFE cup matches based on Node.js

## Set-up environment
Run this commands in order. If you don't have nvm installed, check the suggested node version inside .nvmrc file

nvm use
npm install

## Local development
To develop locally or just generate the files in your local environment, you have to run this commands.
Replace :competition with 'GROUP_STAGE' | 'EUROPA_LEAGUE' | 'CHAMPIONS_LEAGUE' and round with a valid integer

npm run start:dev-server
curl -X GET http://localhost:3000/calculate/:competition/:round

