import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Player from "./Pages/Player/Player";
import TvSeriesPage from "./Pages/TVSeriesPage/TvSeriesPage";
import Movies from "./Pages/Movies/Movies";
import Popular from "./Pages/Popular/Popular";

const App = () => {
  return <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/movies-website" element={<Home/>} />
    <Route path="/movies" element={<Movies/>} />
    <Route path="/tv-series" element={<TvSeriesPage/>} />
    <Route path="/popular" element={<Popular/>} />
    <Route path="/player/:show/:id" element={<Player/>} />
  </Routes>

  </>
};

export default App;