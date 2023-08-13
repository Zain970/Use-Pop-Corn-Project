import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "54936f64";

function MovieDetail({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isWatched = watched.find((movie) => {
    return movie.imdbID == selectedId;
  });

  const getMovieDetail = async () => {
    setLoading(true);

    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
    );

    const data = await res.json();

    setMovie(data);
    setLoading(false);
  };
  useEffect(() => {
    getMovieDetail();
  }, [selectedId]);

  useEffect(() => {
    if (title) {
      document.title = `Movie | ${title}`;
    }

    return () => {
      document.title = `usePopcorn`;
    };
  }, [title]);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      userRating,
      poster,
      runtime,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    handleAddWatched(newWatchedMovie);

    handleCloseMovie();
  };

  useEffect(()=>{
    function callback(e){
      if(e.code==="Escape")
      {
        handleCloseMovie();
      }
    }
    document.addEventListener("keydown",callback)

    return(()=>{
      document.removeEventListener("keydown",callback);
      
    })
  },[])
  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>

              {/*  */}
              <p>
                {released} &bull;{runtime}
              </p>

              {/*  */}
              <p>{genre}</p>

              {/*  */}
              <p>{imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rated this movie {isWatched.userRating}</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
              <p>Staring {actors}</p>
              <p>Directed by {director}</p>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
