var $characterList = $('.character-list');

// start of IIFE
var characterRepository = (function() {
    var repository = [];
    var apiUrl = 'https://rickandmortyapi.com/api/character';

// loads entire list
    function loadList() {
      return $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON) {
        $.each(responseJSON.results, function(index, character) {
          var character = {
            id: character.id,
            name: character.name,
            url: character.url,
          };
          add(character);
        });
      });
    };

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
    };

// adds character to repository
    function add(character) {
      if (
        (typeof character) === 'object' &
        (typeof character.name) === 'string'
      ) {
        repository.push(character);
      } else {
        console.log('entry for ' + character.name + ' failed validation');
        console.log(character);
        console.log(character.name);
        console.log(character.status);
        console.log(character.id);
      }
    };

    // starts functions to display character details in modal
    function showDetails(character) {
      characterRepository.loadDetails(character).then(function () {

        // defines modal elements
        var $modalContainer = $('#modal-container');
        var $modal = $('<div class="modal"></div>');
        var $closeButtonElement = $('<button class="modal-close">Close</button>');
        var $characterNameElement = $('<h1>' + character.name + '</h1>');
        var $characterStatusElement = $('<p>Status: ' + character.status + '</p>');
        var $characterSpeciesElement = $('<p>Species: ' + character.species + '</p>');
        var $characterGenderElement = $('<p>Gender: ' + character.gender + '</p>');
        var $characterImageElement = $('<img src="' + character.imageUrl + '" alt="' + character.name + '">');

        // adds event listeners & hideDetails function to close modal
        $closeButtonElement.on('click', function(event) {
          hideDetails();
        });
        $modalContainer.on('click', function(event) {
          hideDetails();
        });
        $(window).on('keydown', function(e) {
          if (e.key === 'Escape') {
            hideDetails();
          }
        });
        function hideDetails() {
          $modalContainer.removeClass('is-visible');
        }

        // appends modal elements to DOM
        $modalContainer.empty();
        $modal.empty();
        $modal.append($characterNameElement);
        $modal.append($characterImageElement);
        $modal.append($characterSpeciesElement);
        $modal.append($characterGenderElement);
        $modal.append($characterStatusElement);
        $modal.append($closeButtonElement);
        $modalContainer.append($modal);

        // makes modal visible
        $modalContainer.addClass('is-visible');
      });
    };
    // end of modal & showDetails function


    // adds new item to main list
    function addListItem(character) {
      var $listItem = $('<li></li>');
      var $button = $('<button class="character-button">'+character.name+'</button>');
      $characterList.append($listItem);
      $listItem.append($button);
      $button.on('click', function(event) {
        characterRepository.showDetails(character)
      })
    };

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

var $mainTitle = $('<h1>Rick and Morty Knowledgebase</h1>');
$('header').append($mainTitle);
