
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
        var listaAttori = '<div class="attori"></div>';
        var listaGeneri = '<div class="generi"></div>';

        if (tipo == "serie") {
          var titoloOriginale = "original_name";
          var titolo = "name";
        }else if(tipo == "film") {
          var titoloOriginale = "original_title";
          var titolo = "title";
        }
        for (var i = 0; i < risultati.length; i++) {
            var urlAttori,urlGeneri;
            if (tipo == "serie") {
              urlGeneri =" https://api.themoviedb.org/3/genre/tv/list";
              urlAttori = 'https://api.themoviedb.org/3/tv/'+ risultati[i].id +'/credits';
            }else if (tipo == "film") {
              urlGeneri = "https://api.themoviedb.org/3/genre/movie/list";
              urlAttori = 'https://api.themoviedb.org/3/movie/'+ risultati[i].id +'/credits';
            }
          caricaAttori(tipo,risultati,risultati[i].id,urlAttori);
          cercaGeneri(tipo,risultati,risultati[i],urlGeneri)

          var immagineUrl = '<img src="https://image.tmdb.org/t/p/w342'+ risultati[i].poster_path + '">';
            risultato = {
            idfilm: risultati[i].id,
            titolo: risultati[i][titolo],
            titoloOr: risultati[i][titoloOriginale],
            lingua: bandiere(risultati[i].original_language),
            voto: votoStelle(risultati[i].vote_average),
            descrizione: risultati[i].overview,
            tipo: tipo,
            genere: listaGeneri,
            immagine: immagineUrl,
            attori: listaAttori
          };
          $(".risultatiRicerca").append(template(risultato));
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
  function caricaAttori(tipo,risultati,riferimento,url){
    $.ajax({
      url: url,
      data: {
        api_key: "337a5096c47a89ed7fe0ca372a05c5bc",
      },
      method: "GET",
      success: function (data,stato) {
        var cast = data.cast;
        var attori="";
        for (var l = 0; l < 5; l++) {
          if (cast[l] != undefined) {
            attori += cast[l].name + " ";
          };
        };
          $("[data-id="+riferimento+"]").find(".attori").html(attori);
      }
    });
  };

  // funzione associa generi
  function cercaGeneri(tipo,risultati,riferimento,url){
    $.ajax({
      url: url,
      data: {
        api_key: "337a5096c47a89ed7fe0ca372a05c5bc",
      },
      method: "GET",
      success: function (data,stato) {
        var arrayIdGeneriFilm = riferimento.genre_ids;
        var arrayGeneriLista = data.genres;
        var generiFilm=" ";
        for (var i = 0; i < arrayIdGeneriFilm.length; i++) {
          for (var j = 0; j < arrayGeneriLista.length; j++) {
            if (arrayIdGeneriFilm[i] == arrayGeneriLista[j].id) {
              generiFilm += arrayGeneriLista[j].name + " ";
            };
          };
        };
        console.log(generiFilm);
        $("[data-id="+riferimento.id+"]").find(".generi").html(generiFilm);
      }
    });
  };
});
