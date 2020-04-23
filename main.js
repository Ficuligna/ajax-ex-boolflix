
$(document).ready(function () {

  var source = $(".giacomo").html();
  var template = Handlebars.compile(source)
  $("button").click(function(){   //Funzione di ricerca
    $(".risultatiRicerca").html("");
    var valoreRicerca = $("input").val();
    cercaTitoli("https://api.themoviedb.org/3/search/movie",valoreRicerca,"film")
    cercaTitoli("https://api.themoviedb.org/3/search/tv",valoreRicerca,"serie")
  });

// funzione ricerca - chiamata ajax
  function cercaTitoli(url,parola,genere){   //inserire: url come stringa,per parola il risultato di ricerca, per genere se film o serie
    $.ajax({
      url: url,
      data: {
        api_key: "337a5096c47a89ed7fe0ca372a05c5bc",
        query: parola //inserire valoreRicerca
      },
      method: "GET",
      success: function(data,stato) {
        var risultati = data.results;
        if (genere == "serie") {
          var titoloOriginale = "original_name";
          var titolo = "name";
        }else if(genre = "film") {
          var titoloOriginale = "original_title";
          var titolo = "title";
        }
        for (var i = 0; i < risultati.length; i++) {
          var immagineUrl = '<img src="https://image.tmdb.org/t/p/w342'+ risultati[i].poster_path + '">';
          console.log(risultati);
          console.log(risultati[i].poster_path);
          var risultato = {
            titolo: risultati[i][titolo],
            titoloOr: risultati[i][titoloOriginale],
            lingua: bandiere(risultati[i].original_language),
            voto: votoStelle(risultati[i].vote_average),
            immagine: immagineUrl
          }
          $(".risultatiRicerca").append(template(risultato))
        }
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });
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
