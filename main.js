
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
  function cercaTitoli(url,parola,tipo){   //inserire: url come stringa,per parola il risultato di ricerca, per tipo se film o serie
    $.ajax({
      url: url,
      data: {
        api_key: "337a5096c47a89ed7fe0ca372a05c5bc",
        query: parola //inserire valoreRicerca
      },
      method: "GET",
      success: function(data,stato) {
        var risultati = data.results;
        if (tipo == "serie") {
          var titoloOriginale = "original_name";
          var titolo = "name";
          var listaAttori = '<div class="attoriSerie"></div>'
        }else if(tipo == "film") {
          var titoloOriginale = "original_title";
          var titolo = "title";
          var listaAttori = '<div class="attoriFilm"></div>'
        }
        for (var i = 0; i < risultati.length; i++) {
            var urlAttori;
            if (tipo == "serie") {
              urlAttori = 'https://api.themoviedb.org/3/tv/'+ risultati[i].id +'/credits'
            }else if (tipo == "film") {
              urlAttori = 'https://api.themoviedb.org/3/movie/'+ risultati[i].id +'/credits'
            }
          caricaAttori(tipo,risultati,i);
          console.log(listaAttori);

          var immagineUrl = '<img src="https://image.tmdb.org/t/p/w342'+ risultati[i].poster_path + '">';
            risultato = {
            titolo: risultati[i][titolo],
            titoloOr: risultati[i][titoloOriginale],
            lingua: bandiere(risultati[i].original_language),
            voto: votoStelle(risultati[i].vote_average),
            descrizione: risultati[i].overview,
            tipo: tipo,
            immagine: immagineUrl,
            attori: listaAttori
          };
          $(".risultatiRicerca").append(template(risultato))
        };
      },
      error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });
   }

  //crea stelle

  function votoStelle(votoNumerico){

    var voto = Math.ceil(votoNumerico/2);
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
    var lingue= ["it", "en","es","de"];
    if (lingue.includes(lingua)) {
      lingua = '<img src="immagini/' + lingua + '.png">'
    }
    return lingua;
  };



  // Funzione cerca Attori
  function caricaAttori(tipo,risultati,i){
    var urlAttori;
    if (tipo == "serie") {
      urlAttori = 'https://api.themoviedb.org/3/tv/'+ risultati[i].id +'/credits'
    }else if (tipo == "film") {
      urlAttori = 'https://api.themoviedb.org/3/movie/'+ risultati[i].id +'/credits'
    }
    $.ajax({
      url: urlAttori,
      data: {
        api_key: "337a5096c47a89ed7fe0ca372a05c5bc",
      },
      method: "GET",
      success: function (data,stato) {
        console.log("i della success", i);
        var cast = data.cast;
        var attori="";
        for (var l = 0; l < 5; l++) {
          if (cast[l] != undefined) {
            attori += cast[l].name + " ";
          };
        };
        if (tipo == "serie") {
          $(".attoriSerie").eq(i).html(attori);
          console.log(attori);
        }else {
          $(".attoriFilm").eq(i).html(attori);
        }
      }
    });
  };


});
