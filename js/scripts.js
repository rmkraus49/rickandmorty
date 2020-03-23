var $characterList = $('.character-list');

var characterRepository = (function() {
    var repository = [];
    var apiUrl = 'https://rickandmortyapi.com/api/character';

    function loadList() {
      $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON) {
        $.each(responseJSON.results, function(index, item) {
          var character = {
            id: item.id,
            name: item.name,
            status: item.status,
            species: item.species,
            gender: item.gender
          };
          add(character);
        });
      });
      };

    function add(character) {
      if (
        (typeof character) === 'object' &
        (typeof character.name) === 'string' &
        (typeof character.status) === 'string'
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

    function addListItem(character) {
      var $listItem = $('<li></li>');
      var $button = $('<button>'+character.name+'</button>');
      $('body').append($listItem);
      $($listItem).append($button);
      console.log(character);
    };

    function getAll() {
      return repository;
    }

return {
  loadList: loadList,
  addListItem: addListItem,
  getAll: getAll
};

}());

characterRepository.loadList();
console.log(characterRepository.getAll());

// attempts at looping over repository array with addListItem - hasn't worked so far
// unsure why - anything to do with the fact that the current loadList function isn't returning anything?
// jquery - trying to iterate over getAll output
$.each(characterRepository.getAll(), function(index, character) {
  console.log(character);
});

// trying to iterate over getAll using foreach
characterRepository.getAll().forEach(function(character) {
  console.log(character);
  characterRepository.addListItem(character);
  console.log(character);
});
