först ska man pusha info till githup med git add och git push 
sedan ska vi skreva kommando för att bygga dist mappen för publicering  ng build --configuration production --base-href=/huda_taddabur/

sedan ska vi skciaka dem för publicering   npx angular-cli-ghpages --dir=dist/huda_taddabur/browser --no-silent 

