import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar";
import bgImage from '../../assets/hero_banner.jpg';
import heroTitle from '../../assets/hero_title.png';
import playIcon from '../../assets/play_icon.png';
import infoIcon from '../../assets/info_icon.png';
import TitleCards from '../../Components/TitleCards';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedCard, setSelectedCard] = useState(null);

 

  return (
    <>
      <div id="home" className={`home  relative `}>
      <Navbar onCardClick={setSelectedCard} show={'movie'} />
        <div className="relative h-[110vh] md:h-[100vh] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="absolute py-16 inset-0 bg-gradient-to-l from-transparent to-black/75">
            <div className="title w-full px-5 md:px-10 text-white">
              <img src={heroTitle} alt="" className='w-full max-w-[420px] mb-3' />
              <p className='text-md mb-3'>Discovering his ties to a secret ancient order, a young man living in modern <br /> Istanbul embarks on a quest to save the city from an immortal enemy.</p>
              <div className="btns flex">
                <button className='bg-white text-black flex items-center font-semibold px-5 py-2 rounded-md me-3'>
                  <img src={playIcon} className='w-[25px] me-2' alt="" />
                  Play
                </button>
                <button className='bg-gray-500 hover:bg-gray-600 duration-200 flex items-center font-semibold px-5 py-2 rounded-md me-3'>
                  <img src={infoIcon} className='w-[25px] me-2' alt="" />
                  More Info
                </button>
              </div>
            </div>
            <div className="cards px-8 md:mt-20 lg:mt-0 w-full">
              <TitleCards title={"Popular On Netflix"} category={'popular'} onCardClick={setSelectedCard} />
            </div>
          </div>
        </div>
        <div  id='more' className="px-8 py-5 bg-[#141414]">
          <TitleCards title={"Top Rated"} category={'top_rated'} onCardClick={setSelectedCard} />
          <TitleCards title={"Upcoming"} category={'upcoming'} onCardClick={setSelectedCard} />
          <TitleCards title={"Now Playing"} category={'now_playing'} onCardClick={setSelectedCard} />
          <Footer />
        </div>
      </div>


      {selectedCard && (
        <div className="layer fixed bg-[#0000004c] backdrop-blur-sm  left-0 top-0 w-full h-full z-[999] " />
      )}
      {selectedCard && (
        <div className="modal fixed overflow-y-scroll rounded-md  bg-[#141414] top-1/2 left-1/2 w-3/4 h-2/3 p-5 px-10 -translate-x-1/2  -translate-y-1/2 z-[1000]" style={{ 'WebkitOverflowScrolling': 'touch', 'scrollbarWidth': 'none' }}>/
          <div className="fa fa-x fa-xl  text-white absolute right-5 top-10 hover:text-red-500 duration-200" onClick={()=>setSelectedCard()}></div>
          <div className="container flex flex-wrap  w-full text-white">
            <div className="movie-img w-full mb-3 lg:mb-0 lg:w-1/3 ">
              <img src={`https://image.tmdb.org/t/p/w500/${selectedCard.poster_path}`} className='w-[100%] lg:w-[85%]' alt="" />
            </div>
            <div className="movie-info pb-10 lg:pb-0 relative px-0 md:px-5 w-full lg:w-2/3 ">
              <h1 className='mb-4 text-3xl text-red-600 font-semibold'>{selectedCard.title.toUpperCase()}</h1>
              <p className='mb-4 pe-0 md:pe-6 text-lg'>{selectedCard.overview}</p>
              <p className='mb-4'>Release Date: {selectedCard.release_date}</p>
              <div className="rating flex items-center gap-1 absolute bottom-2 left-3">
                <div className="fa fa-star fa-xl text-yellow-400"></div>
                <p className='text-lg font-semibold'>{selectedCard.vote_average.toString().slice(0, 3)}</p>
                
              </div>
              <Link to={`/player/movie/${selectedCard?.id}`}>
              <button className='bg-red-600 flex items-center hover:bg-red-700 duration-200 py-1 px-3 text-sm right-3 rounded-md absolute bottom-2'>Watch Trailer</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
