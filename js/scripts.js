var $characterList = $('.character-list');

var characterRepository = (function() {
    var repository = [];
    var apiUrl = 'https://rickandmortyapi.com/api/character';

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

    function showDetails(character) {
      characterRepository.loadDetails(character).then(function () {
        console.log(character);
      });
    };

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

var $mainTitle = $('<')
