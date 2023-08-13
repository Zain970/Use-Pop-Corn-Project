import React, { useState } from "react";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export function MovieList({ movies,handleSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie, index) => (
        <Movie movie={movie} key={index} handleSelectMovie={handleSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie,handleSelectMovie }) {

  const selectMovie=(m)=>{
    
    handleSelectMovie(m.imdbID)
  }
  return (
    <li key={movie.imdbID} onClick={()=>{selectMovie(movie)}}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
export default Box;
