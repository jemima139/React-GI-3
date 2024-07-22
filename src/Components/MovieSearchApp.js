import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movies: [],
      error: null
    };
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${this.state.query}`)
      .then(response => {
        if (response.data.results) {
          this.setState({ movies: response.data.results, error: null });
        } else {
          this.setState({ movies: [], error: 'No results found' });
        }
      })
      .catch(error => {
        this.setState({ error: 'An error occurred while fetching data' });
      });
  };

  render() {
    const { query, movies, error } = this.state;

    return (
      <div>
        <h2>Search Movies</h2>
        <input type="text" value={query} onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Search</button>
        {error && <p>{error}</p>}
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.params; // Use this.props.params for v6
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
      .then(response => {
        this.setState({ movie: response.data, loading: false, error: null });
      })
      .catch(error => {
        this.setState({ error: 'An error occurred while fetching data', loading: false });
      });
  }

  render() {
    const { movie, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div>
        {movie && (
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Actors:</strong> {movie.actors}</p>
            <p><strong>Year:</strong> {movie.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
        )}
      </div>
    );
  }
}

export { MovieSearch, MovieDetail };
