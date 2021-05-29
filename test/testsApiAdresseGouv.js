const axios = require('axios');

// récupère l'adresse en ligne de commande
// appel du fichier "adresse code postal ville"
// node testsApiAdresseGouv.js "6 place jean jaures 10000 Troyes" "uv"

let adresse = "16 avenue Gabriel Peri 51430 Tinqueux";
if (process.argv[2] != null) adresse = process.argv[2];

// transforme la chaine adresse en composant pour à insérer dans une api
function transformerAdresse(tmpAdr) {
  let result = tmpAdr.replace(/ /g, '+')
  return result
}

var adr = transformerAdresse(adresse)

var adresseGouv = {
  method: 'get',
  url: 'https://api-adresse.data.gouv.fr/search/?q='+adr,
  headers: { }
};


axios(adresseGouv)
.then(function (adress) {

    var lat = JSON.stringify(adress.data.features[0].geometry.coordinates[0]);
    var lng = JSON.stringify(adress.data.features[0].geometry.coordinates[1]);
    
    var openUV = {
      method: 'get',
      url: 'https://api.openuv.io/api/v1/uv?lat='+lat+'&lng='+lng,
      headers: { 
        'x-access-token': '572f686f07b8f0751e767b33c17e9c15'
      }
    };

    axios(openUV)
    .then(function (uv) {
      let variable = "uv";
      console.log(JSON.stringify(uv.data.result));
    })
    .catch(function (error2) {
      console.log(error2);
    });
  })
.catch(function (error) {
  console.log(error);
});
