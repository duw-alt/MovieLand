import { useState, useEffect} from "react"
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const corsAnywhere = "https://cors-anywhere.herokuapp.com/"; //temporary workaround so the deployment fetches api
const API_URL = corsAnywhere + "http://www.omdbapi.com/?apikey=684e013b";

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('batman')
  }, [])

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {
        movies?.length > 0 
        ? (
          <div className="container">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h1>No movies found</h1>
          </div>
        )
      }
    </div>
  );
}

export default App