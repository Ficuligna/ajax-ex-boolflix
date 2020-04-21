
$(document).ready(function () {
  var source = $(".giacomo").html();
  var template = Handlebars.compile(source)
  $("button").click(function(){
    $(".risultatiRicerca").html("");
    var valoreRicerca = $("input").val();
    console.log(valoreRicerca);
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      data: {
        api_key: "337a5096c47a89ed7fe0ca372a05c5bc",
        query: valoreRicerca
      },
      method: "GET",
      success: function(data,stato) {
        var films = data.results;
        console.log(films[0]);
        for (var i = 0; i < films.length; i++) {
          var film = {
            titolo: films[i].title,
            titoloOr: films[i].original_title,
            lingua: films[i].original_language,
            voto: films[i].vote_count
          }
          $(".risultatiRicerca").append(template(film))
        }
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });
  });
});
