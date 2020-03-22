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

return {
  loadList: loadList
};

}());

characterRepository.loadList()
