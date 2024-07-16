import Navbar from "./Navbar"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import card2 from '../assets/cards/card1.jpg';
import 'swiper/css';
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";



const TVSeries = ({tvShowName , tvshow_path , onItemClick}) => {

const[tvData,setTvData] = useState([])
const[loader,setLoader] = useState(false)

async function getTVSeries(){
  setLoader(true)
    try {
 
     const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${tvshow_path}`,{
         params: {language: 'en-US', page: '1'},
         headers: {
           accept: 'application/json',
           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTlhYTdhNTZkNjJlNGU2OTU0NDA3MjI3MjYwNzBkZCIsIm5iZiI6MTcyMDg3MTczOS4yNjcxMjQsInN1YiI6IjY2MjEwYjdkMGQxMWYyMDE2NDAxNjUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUHorhxSQKBs8zOdf8QJHEAI1hebLTNfkuV-2lf1x6I'
         }
     })
    //  console.log(data.results);
     setTvData(data.results) 
     setLoader(false)
    } catch (error) {
     console.log(error);
     setLoader(false)
    }
 }

    useEffect(()=>{
        getTVSeries()
    },[])
  return <>
    <div className="tv-series  w-full   py-5 text-center">
    {loader&& <Loader/>}
   <h1 className="text-white text-start text-2xl font-semibold uppercase">{tvShowName}</h1>
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
        tvData.map((item , index)=>( 
            <SwiperSlide key={index} onClick={()=>onItemClick(item)}>
         <div className="card group cursor-pointer relative overflow-hidden" >
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="cardImage" className='group-hover:blur-sm w-full h-[370px] group-hover:rotate-3 group-hover:scale-110 duration-300' />
            <div className="absolute w-full bg-[#1414143e] text-white h-full left-0 opacity-0 top-0 group-hover:opacity-100 duration-700 p-4">
              <h3 className='text-xl font-semibold mb-3 text-start'>{item.name}</h3>
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

export default TVSeries
