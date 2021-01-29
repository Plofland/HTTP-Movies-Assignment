import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
  title: '',
  director: '',
  metascore: null,
  stars: [],
  id: null
};

export default function EditForm(props) {
  const [formValues, setFormValues] = useState(initialValues);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        const starsString = res.data.stars.join(', ');
        const movieToEdit = {
          ...res.data,
          stars: starsString
        };
        setFormValues(movieToEdit);
        // setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    console.log(formValues);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        ...formValues,
        stars: formValues.stars.split(', ')
      })
      .then((res) => {
        props.updateMovies(
          props.movieList.map((movie) => {
            if (movie.id === res.data.id) {
              return res.data;
            } else {
              return movie;
            }
          })
        );
        push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            value={formValues.text}
            onChange={changeHandler}
          ></input>
        </label>
        <label htmlFor="director">
          Director:
          <input
            type="text"
            name="director"
            value={formValues.director}
            onChange={changeHandler}
          ></input>
        </label>
        <label htmlFor="metascore">
          Metascore:
          <input
            type="text"
            name="metascore"
            value={formValues.metascore}
            onChange={changeHandler}
          ></input>
        </label>
        <label htmlFor="stars">
          Stars:
          {/* {formValues.stars.map((star) => {
            return (
              <input
                key={star}
                type="text"
                name="stars"
                value={star}
                onChange={changeHandler}
              />
            );
          })} */}
          <input
            type="text"
            name="stars"
            value={formValues.stars}
            onChange={changeHandler}
          ></input>
        </label>
        <button>Update Movie</button>
      </form>
    </div>
  );
}
