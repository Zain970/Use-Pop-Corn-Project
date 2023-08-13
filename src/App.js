import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Box from "./components/Box";
import Sumary from "./components/Sumary";
import Loader from "./components/Loader";
import MovieDetail from "./components/MovieDetail";
import WatchedMoviesList from "./components/WatchedMoviesList";

import { MovieList } from "./components/Box";
import { NumResults, Logo, Search } from "./components/Navbar";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "54936f64";

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) 
        {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();

        if (data.Response == "False") 
        {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setLoading(false);
      } 
      catch (error) 
      {
        if(error.name!="AbortError")
        {
          setError(error.message);  
        }
        setLoading(false);
      }
    };

    if (query.length < 3) 
    {
      setMovies([]);
      setError(null);
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSelectMovie = (imdbID) => {
    if (imdbID == selectedId) 
    {
      return setSelectedId(null);
    }
    setSelectedId(imdbID);
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (newWatchedMovie) => {
    setWatched([...watched, newWatchedMovie]);
  };

  const handleDeleteWatched = (id) => {
    const newWatched = watched.filter((movie) => {
      return movie.imdbID != id;
    });
    setWatched(newWatched);
  };

  
  return (
    <>
      {/* Prop drilling has been removed here */}
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetail
              watched={watched}
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <Sumary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
