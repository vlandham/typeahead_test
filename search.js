

var movies = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'data/movies_all_compressed.json'
});

movies.initialize();

var tropes = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name', 'adjs'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'data/tropes_all_adjs.json'
});

tropes.initialize();
 
$('#search .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'tropes',
  displayKey: 'name',
  source: tropes.ttAdapter(),
  templates: {
    header: '<h3 class="search-name">Tropes</h3>',
    suggestion: function(e) { return '<p class="tt-suggestion-title">' + e.name + '</p><p class="tt-suggestion-detail">' + e.adjs + "</p>"; }
  }
},
{
  name: 'movies',
  displayKey: 'name',
  source: movies.ttAdapter(),
  templates: {
    header: '<h3 class="search-name">Movies</h3>'
  }
});

$('.typeahead').on('typeahead:selected', function(el,sug,data) {
  console.log(sug);
  $("#data").html("<h3>Returns:</h3>" + "<code>" + JSON.stringify(sug) + "</code>");
  $('.typeahead').blur();
});

// $('.typeahead').on('typeahead:autocompleted', function(el,sug,data) {
//   console.log('suggestions');
//   console.log(sug);
// });

$('.typeahead').focus(function (e) {
  $('.typeahead').typeahead('val',''); // Clear typeahead
});
