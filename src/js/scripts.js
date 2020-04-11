var $characterList = $('.character-list');

// start of IIFE
var characterRepository = (function() {
  var repository = [];
  var apiUrl = 'https://rickandmortyapi.com/api/character';

  // loads character list
  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON) {
      $.each(responseJSON.results, function(index, character) {
        character = {
          id: character.id,
          name: character.name,
          url: character.url,
        };
        add(character);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  // loads details for given character
  function loadDetails(character) {
    var characterUrl = character.url;
    return $.ajax(characterUrl, {dataType: 'json'}).then(function(responseJSON) {
      return responseJSON;
    }).then(function(details) {
      character.status = details.status;
      character.species = details.species;
      character.gender = details.gender;
      character.imageUrl = details.image;
    }).catch(function(e) {
      console.error(e);
    });
  }

  // adds character to repository
  function add(character) {
      repository.push(character);
  }

  // adds new item to main list
  function addListItem(character) {
    var $button = $('<button type="button" class="btn btn-primary btn-block list-group-item character-button" data-toggle="modal" data-target="#detailsModal">' + character.name + '</button>');
    $characterList.append($button);
    $button.on('click', function() {
      characterRepository.showDetails(character)
    })
  }

  // starts functions to display character details in modal
  function showDetails(character) {
    characterRepository.loadDetails(character).then(function () {

      // defines modal elements
      var $modalTitle = $('.modal-title');
      var $modalBody = $('.modal-body');
      var $characterNameElement = character.name;
      var $characterStatusElement = $('<p>Status: ' + character.status + '</p>');
      var $characterSpeciesElement = $('<p>Species: ' + character.species + '</p>');
      var $characterGenderElement = $('<p>Gender: ' + character.gender + '</p>');
      var $characterImageElement = $('<img src="' + character.imageUrl + '" alt="' + character.name + '">');

      // appends modal elements to DOM
      $modalTitle.empty();
      $modalBody.empty();

      $modalTitle.append($characterNameElement);
      $modalBody.append($characterImageElement);
      $modalBody.append($characterSpeciesElement);
      $modalBody.append($characterGenderElement);
      $modalBody.append($characterStatusElement);

    });
  }
  // end of modal & showDetails function

  function getAll() {
    return repository;
  }

  // returns functions from IIFE
  return {
    add: add,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    getAll: getAll
  };
}());

characterRepository.loadList().then(function() {
  characterRepository.getAll().forEach(function(character) {
    characterRepository.addListItem(character);
  });
});
