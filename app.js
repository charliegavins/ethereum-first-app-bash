var contractAddress = '0x1e9d5e4ed8ef31cfece10b4c92c9057f991f36bc';
var contractABI = [{"constant":false,"inputs":[{"name":"proposalHash","type":"bytes32"},{"name":"pro","type":"bool"}],"name":"vote","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"proposalHash","type":"bytes32"},{"indexed":false,"name":"pro","type":"bool"},{"indexed":false,"name":"addr","type":"address"}],"name":"LogVote","type":"event"}];

function init(){
  // Checks Web3 support
  if(typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
    console.log('make own web3');
    // If there's a web3 library loaded, then make your own web3
    web3 = new Web3(web3.currentProvider);
  } else if (typeof Web3 !== 'undefined') {
    // If there isn't then set a provider
    console.log('if no web3 library loaded set provider');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  } else if(typeof web3 == 'undefined') {
    // Alert the user he is not in a web3 compatible browser
    console.log('not web compatible');
    return;
  }

//gets parameter from the url
  proposal = decodeURI(getParameterByName('proposal'));

  // Load the contract
  web3.eth.getCode(contractAddress, function(e, r) {
    if (!e && r.length > 3){
        loadContract();
    }
  })

  function loadContract() {
    console.log('contract loaded');
    // load the contract to javascript
    ethervoteContract = web3.eth.contract(contractABI);
    ethervote = ethervoteContract.at(contractAddress);
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

init();
