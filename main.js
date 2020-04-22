
$(document).ready(function () {



  var source = $(".giacomo").html();
  var template = Handlebars.compile(source)
  $("button").click(function(){   //Funzione di ricerca
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
        for (var i = 0; i < films.length; i++) {
          var film = {
            titolo: films[i].title,
            titoloOr: films[i].original_title,
            lingua: bandiere(films[i].original_language),
            voto: votoStelle(films[i].vote_average)
          }
          $(".risultatiRicerca").append(template(film))
        }
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      data: {
        api_key: "337a5096c47a89ed7fe0ca372a05c5bc",
        query: valoreRicerca
      },
      method: "GET",
      success: function(data,stato) {
        var serie = data.results;
        for (var i = 0; i < serie.length; i++) {
          var seria = {
            titolo: serie[i].name,
            titoloOr: serie[i].original_name,
            lingua: bandiere(serie[i].original_language),
            voto: votoStelle(serie[i].vote_average)
          }
          $(".risultatiRicerca").append(template(seria))
        }
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });
  });

  // funzione ricerca// ajax succe

  function cercaTitoli(data,stato,genere) {
   var films = data.results;
   for (var i = 0; i < films.length; i++) {
     var film = {
       titolo: films[i].title,
       titoloOr: films[i].original_title,
       lingua: bandiere(films[i].original_language),
       voto: votoStelle(films[i].vote_average)
     }
     $(".risultatiRicerca").append(template(film))
   }
 }

  //crea stelle

  function votoStelle(votoNumerico){

    var voto = Math.floor(votoNumerico/2);
    var stelle= "";
    for (var j = 0; j < voto; j++) {
      stelle += '<i class="fa fa-star" aria-hidden="true"></i>';
    };
    for (var k = 0; k < 5-voto; k++) {
     stelle += '<i class="fa fa-star-o" aria-hidden="true"></i>';
    };
    return stelle;
  };

  //crea bandiere

  function bandiere(lingua){
    if (lingua == "it") {
      lingua = '<img src="immagini/it.png" alt="">';
    }else if (lingua == "en") {
      lingua = '<img src="immagini/gb.png" alt="">';
    }else if (lingua == "es") {
      lingua = '<img src="immagini/es.png" alt="">';
    }else if (lingua == "de") {
      lingua = '<img src="immagini/de.png" alt="">';
    }else {
      lingua = lingua;
    }
    return lingua;
  };



});
