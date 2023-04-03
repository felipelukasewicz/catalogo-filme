const 
  inputSearchMovie = document.querySelector("#input-search-movie"),
  btnSearchMovie = document.querySelector("#btn-search-movie"),
  showFavorites = document.querySelector("#nav-favorites"),
  listMoviesEl = document.querySelector("#list-movies"),
  showMovieEl = document.querySelector("#show-movie");

btnSearchMovie.onclick = async () => {
  showMovieEl.innerHTML = "";
  showMovieEl.setAttribute("style", "display: none;");

  listMoviesEl.setAttribute("style", "display: flex;");

  if (inputSearchMovie.value.length > 0) {
    const movies = new Array();

    fetch("http://www.omdbapi.com/?apikey=ed5e5ad5&s=" + inputSearchMovie.value)
      .then((res) => res.json())
      .then((res) => {
        res.Search.forEach((item) => {
          const movie = new Movie (
            item.imdbID,
            item.Title,
            item.Year,
            item.Genre || 'Indisponível',
            item.Poster,
            null,
            null,
            item.Rated || 'Indisponível',
            null,
            null,
            null
          );
          
          movies.push(movie);
        });

        listMovies(movies);
      });
  }

  return false;
}

showFavorites.onclick = (e) => {
  e.preventDefault();
  listFavorites();

  listMoviesEl.setAttribute("style", "display: flex;");
  showMovieEl.setAttribute("style", "display: none;");
}

const listMovies = async (movies) => {
  const listMovies = listMoviesEl;
  listMovies.innerHTML = "";
  
  if (movies.length > 0) {
    movies.forEach(async (movie) => {
      listMovies.appendChild(await movie.getCard());
      
      movie.getBtnDetails().onclick = () => {
        showMovieEl.innerHTML = "";
        detailsMovie(movie.id);
      }
    });
  }
}

const detailsMovie = async (id) => {
  fetch("http://www.omdbapi.com/?apikey=ed5e5ad5&i=" + id)
    .then((res) => res.json())
    .then((res) => {
      const movie = new Movie (
        res.imdbID,
        res.Title,
        res.Year,
        res.Genre,
        res.Poster,
        res.Director,
        res.Actors,
        res.Rated,
        res.imdbRanting,
        res.Plot,
        res.Released
      )

      showMovieEl.appendChild(movie.getDetailsMovie());
      
      document.querySelector("#btnClose").onclick = () => {
        showMovieEl.innerHTML = "";
        listMoviesEl.setAttribute("style", "display: flex;");
      }

      document.querySelector("#btnFavorite").onclick = (e) => {
        const hasFavorited = e.target.getAttribute('has-favorited');
        
        hasFavorited === "true"
          ? movie.deleteMovie(movie)
          : movie.saveMovie(movie);
      }
      
      listMoviesEl.setAttribute("style", "display: none;");
      showMovieEl.setAttribute("style", "display: flex;");
    });
}

listFavorites = () => {
  const 
    favoritesString = localStorage.getItem("@MoviesCatalogMaster:favorites"),
    favorites = favoritesString ? JSON.parse(favoritesString) : [];
    
  const movies = new Array();

  if (favorites.length > 0) {
    favorites.forEach((item) => {
      const movie = new Movie (
        item.id,
        item.title,
        item.year,
        item.gender,
        item.poster,
        item.director,
        item.actors,
        item.classificacao,
        item.rated,
        item.plot,
        item.released
      );
      
      movies.push(movie);
    });
  }
  
  listMovies(movies);
}
