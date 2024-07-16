import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import infoIcon from '../assets/info_icon.png';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import Loader from "./Loader";

const TitleCards = ({ title, category, onCardClick }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getData() {
    setLoader(true)
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
        params: {
          language: 'en-US',
          page: '1'
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTlhYTdhNTZkNjJlNGU2OTU0NDA3MjI3MjYwNzBkZCIsIm5iZiI6MTcyMDY1NjYzNC41MzE5MzcsInN1YiI6IjY2MjEwYjdkMGQxMWYyMDE2NDAxNjUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HOIc96_5psPzp8ur9qC0N0HzOqSDgPYoSsyPct0UTKo'
        }
      });
      setLoader(false)
      setData(category === 'now_playing' ? response.data.results.reverse() : response.data.results);
      
    } 
    
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [category]);


  return <>
  <div className="tv-series  w-full   py-5 text-center">
  {loader&& <Loader/>}
 <h1 className="text-white text-start text-2xl font-semibold uppercase">{title}</h1>
  <Swiper
    className="my-5"
     modules={[Navigation, Pagination, Scrollbar, A11y]}
     spaceBetween={10}
     slidesPerView={6}
     navigation
    //  pagination={{ clickable: true  }}
     breakpoints={{
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    }}
  >
   
    {
      data.map((item , index)=>( 
          <SwiperSlide key={index} onClick={()=>onCardClick(item)}>
       <div className="card group cursor-pointer relative overflow-hidden" >
          <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="cardImage" className='group-hover:blur-sm w-full h-[370px] group-hover:rotate-3 group-hover:scale-110 duration-300' />
          <div className="absolute w-full bg-[#1414143e] text-white h-full left-0 opacity-0 top-0 group-hover:opacity-100 duration-700 p-4">
            <h3 className='text-xl font-semibold mb-3 text-start'>{item.title}</h3>
            <p className='mb-3 hidden md:block font-thin'></p>
            {/* <p className='font-thin'>Release Date: {card.release_date}</p> */}
            <div className="rating flex items-center gap-1 absolute bottom-2 left-3">
              <div className="fa fa-star text-yellow-400"></div>
              <p>{item.vote_average.toString().slice(0, 3)}</p>
            </div>
            <button
              className='bg-gray-500 flex items-center hover:bg-gray-600 duration-200 py-1 px-2 text-sm right-3 rounded-md absolute bottom-2'
            >
              {/* <img src={infoIcon} className='w-[25px] me-0' alt="" /> */}
              More Info
            </button>
          </div>
    </div>
    </SwiperSlide>
      ))
    }

  </Swiper>
</div>
</>
}

export default TitleCards;
