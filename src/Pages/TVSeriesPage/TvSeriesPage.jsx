import { useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import TVSeries from "../../Components/TVSeries";
import { Link } from "react-router-dom";

const TvSeriesPage = () => {
  const [selectedItem, setSelectedItem] = useState({});

  return (
    <>
      <Navbar onCardClick={setSelectedItem} show={'tv'} />
      <div className="tvShow w-full py-8 px-10 bg-[#141414] min-h-[100vh]">
        <div className="w-full py-10">
          <TVSeries tvShowName={'Top Rated'} tvshow_path={'top_rated'} onItemClick={setSelectedItem} />
          <TVSeries tvShowName={'Popular'} tvshow_path={'popular'} onItemClick={setSelectedItem} />
          <TVSeries tvShowName={'Airing Today'} tvshow_path={'airing_today'} onItemClick={setSelectedItem} />
          <TVSeries tvShowName={'On the Air'} tvshow_path={'on_the_air'} onItemClick={setSelectedItem}  />
        </div>
        <Footer />
      </div>

      {Object.keys(selectedItem).length > 0 && (
        <div className="layer fixed backdrop-blur-sm  bg-[#0000004c] left-0 top-0 w-full h-full z-[999]" />
      )}
      {Object.keys(selectedItem).length > 0 && (
        <div className="modal fixed overflow-y-scroll rounded-md bg-[#141414] top-1/2 left-1/2 w-3/4 h-2/3 p-5 px-10 -translate-x-1/2 -translate-y-1/2 z-[1000]" style={{  'WebkitOverflowScrolling': 'touch', 'scrollbarWidth': 'none'  }}>
          <div className="fa fa-x fa-xl text-white absolute right-5 top-10 hover:text-red-500 duration-200" onClick={() => setSelectedItem({})}></div>
          <div className="container flex flex-wrap w-full text-white">
            <div className="movie-img w-full mb-3 md:mb-0 md:w-1/3">
              <img src={`https://image.tmdb.org/t/p/w500/${selectedItem.poster_path}`} className="w-[100%] md:w-[85%]" alt="" />
            </div>
            <div className="movie-info pb-10 md:pb-0 relative px-0 md:px-5 w-full md:w-2/3">
              <h1 className="mb-4 text-3xl text-red-600 font-semibold">{selectedItem?.title?.toUpperCase()}</h1>
              <p className="mb-4 pe-0 md:pe-6 text-lg">{selectedItem.overview}</p>
              <p className="mb-4">First Air Date: {selectedItem.first_air_date              }</p>
              <div className="rating flex items-center gap-1 absolute bottom-2 left-3">
                <div className="fa fa-star fa-xl text-yellow-400"></div>
                <p className="text-lg font-semibold">{selectedItem.vote_average?.toString().slice(0, 3)}</p>
              </div>
              <Link to={`/player/tv/${selectedItem?.id}`}>
                <button className="bg-red-600 flex items-center hover:bg-red-700 duration-200 py-1 px-3 text-sm right-3 rounded-md absolute bottom-2">Watch Trailer</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TvSeriesPage;
