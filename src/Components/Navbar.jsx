import React, { useState, useEffect } from 'react';
import spinner from '../assets/netflix_spinner.gif';
import logo from '../assets/logo.png';
import card2 from '../assets/cards/card1.jpg';
import axios from 'axios';
import {  NavLink } from 'react-router-dom';

const Navbar = ({ onCardClick ,show }) => {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchMovie(query) {
    setLoading(true);
    setSearchMovies([]);
    try {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/${show}`, {
        params: {
          query: query,
          include_adult: 'false',
          language: 'en-US',
          page: '1'
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTlhYTdhNTZkNjJlNGU2OTU0NDA3MjI3MjYwNzBkZCIsIm5iZiI6MTcyMDg3MTczOS4yNjcxMjQsInN1YiI6IjY2MjEwYjdkMGQxMWYyMDE2NDAxNjUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUHorhxSQKBs8zOdf8QJHEAI1hebLTNfkuV-2lf1x6I'
        }
      });
      setSearchMovies(data.results);
      setLoading(false);
    } 
    catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  function closeSearch() {
    setSearch(false);
    setSearchMovies([]);
  }

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  return (
    <>
      <nav className="z-50 backdrop-blur-sm bg-[#1414147F] w-full px-12 py-2 fixed flex items-center justify-between text-white">
        <div className="logo w-1/3 md:w-1/6 py-3">
          <img src={logo} alt="logo" className="w-[100px]" />
        </div>
        <div className="nav-left hidden lg:block py-3 justify-between px-5 items-center">
          <ul className="gap-6 flex list-none px-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-red-500 transition duration-300 cursor-pointer ' : 'hover:text-red-500 transition duration-300 cursor-pointer'
              }
            >
              <li>HOME</li>
            </NavLink>
            <NavLink
              to="/tv-series"
              className={({ isActive }) =>
                isActive ? 'text-red-500 transition duration-300 cursor-pointer ' : 'hover:text-red-500 transition duration-300 cursor-pointer'
              }
            >
              <li>TV SERIES</li>
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? 'text-red-500 transition duration-300 cursor-pointer ' : 'hover:text-red-500 transition duration-300 cursor-pointer'
              }
            >
              <li>MOVIES</li>
            </NavLink>
            <NavLink
              to="/popular"
              className={({ isActive }) =>
                isActive ? 'text-red-500 transition duration-300 cursor-pointer ' : 'hover:text-red-500 transition duration-300 cursor-pointer'
              }
            >
              <li>NOW & POPULAR</li>
            </NavLink>
          </ul>
        </div>
        <div className="search-container w-1/2 md:w-1/5 py-3 flex relative justify-center lg:justify-end">
          <input
            type="text"
            placeholder={show =='movie'? "Search Movie" : "Search TV Series"}
            onChange={(e) => {
              // e.target.value === ' ' && setLoading(false);
              searchMovie(e.target.value);
            }}
            className={`${search ? '' : 'hidden'} bg-[#1414147F] absolute left-[50%] -translate-x-1/2 focus:outline-none focus:text-gray-300 w-[90%] py-4 top-1/2 -translate-y-1/2 rounded-full px-2 h-[80%]`}
          />
          <div className={`${search ? '' : 'hidden'} fa fa-x absolute end-0 top-[50%] -translate-y-1/2 right-6 hover:text-red-500 duration-300 text-gray-300`} onClick={closeSearch}></div>
          {search && (
            <div className="search w-[200%] lg:w-[110%] overflow-y-scroll rounded-lg px-3 max-h-[150px] text-white bg-danger bg-black absolute top-full mt-2">
              {loading && <img src={spinner} className="w-[100px] relative left-1/2 -translate-x-1/2 text-center" alt="" />}
              {Array.isArray(searchMovies) && searchMovies.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="item flex items-center gap-2 py-1 cursor-pointer hover:text-red-500 duration-200" onClick={() => {onCardClick(item) ; setSearch(false)} }>
                    <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : card2} alt={card2} className="h-[30px] w-[25px]" />
                    <p>{show =='movie'? item.title : item.name}</p>
                  </div>
                  <hr className="text-white" />
                </React.Fragment>
              ))}
            </div>
          )}
          <div className={`${search ? 'hidden' : ''} hover:text-red-500 duration-300 fa fa-search`} onClick={() => setSearch(true)}></div>
        </div>
        <div className="nav-right flex lg:hidden gap-3 items-center">
          <div className="fas fa-bars fa-xl ms-2 cursor-pointer" onClick={() => setToggle(true)}></div>
          <ul className={`${toggle ? 'right-0' : '-right-full'} absolute lg:hidden bg-[#020202] top-0 w-1/2 transition-all duration-500 h-[100vh] px-8 py-10`}>
            <div className="fas fa-x absolute right-0 px-5 fa-xl hover:text-red-500 duration-300" onClick={() => setToggle(false)}></div>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500 mb-2 transition duration-300 cursor-pointer' : 'hover:text-red-500 mb-2 transition duration-300 cursor-pointer')}>
              <li>HOME</li>
            </NavLink>
            <NavLink to="/tv-series" className={({ isActive }) => (isActive ? 'text-red-500 mb-2 transition duration-300 cursor-pointer' : 'hover:text-red-500 mb-2 transition duration-300 cursor-pointer')}>
              <li>TV SHOWS</li>
            </NavLink>
            <NavLink to="/movies" className={({ isActive }) => (isActive ? 'text-red-500 mb-2 transition duration-300 cursor-pointer' : 'hover:text-red-500 mb-2 transition duration-300 cursor-pointer')}>
              <li>MOVIES</li>
            </NavLink>
            <NavLink to="/movies" className={({ isActive }) => (isActive ? 'text-red-500 mb-2 transition duration-300 cursor-pointer' : 'hover:text-red-500 mb-2 transition duration-300 cursor-pointer')}>
              <li>NOW & POPULAR</li>
            </NavLink>

          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
