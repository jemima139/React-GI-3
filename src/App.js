import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Counter from './Components/Counter';
import Home from './Components/Home';
import { MovieSearch, MovieDetail } from './Components/MovieSearchApp';
import Hard from './Components/Hard'; 

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/counter">Counter</Link></li>
            <li><Link to="/moviesearchapp">MovieSearchApp</Link></li>
            <li><Link to="/hard">Hard</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/moviesearch" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/hard" element={<Hard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
