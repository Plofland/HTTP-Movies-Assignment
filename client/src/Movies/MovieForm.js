import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const initialValues = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};
export default function MovieForm() {
  const [movie, setMovie] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    setMovies({
      ...movie,
      [e.target.value]: e.target.value
    });
  };

  const submitHandler = () => {};

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            value={movie.text}
            onChange={changeHandler}
          ></input>
        </label>
        <label htmlFor="director">
          Director:
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={changeHandler}
          ></input>
        </label>
        <label htmlFor="metascore">
          Metascore:
          <input
            type="text"
            name="metascore"
            value={movie.metascore}
            onChange={changeHandler}
          ></input>
        </label>
        <label htmlFor="stars">
          Stars:
          {movie.stars.map((star) => {
            return (
              <input
                key={star}
                type="text"
                name="stars"
                value={star}
                onChange={changeHandler}
              />
            );
          })}
          {/* <input
            type="text"
            name="stars"
            value={movies.stars}
            onChange={changeHandler}
          ></input> */}
        </label>
      </form>
    </div>
  );
}
