import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Link, useParams } from 'react-router-dom';
import bg from '../../assets/background_banner.jpg';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

const Player = () => {
  let { id , show } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [credits,setCredits] = useState([])
  const [loader, setLoader] = useState(false);

  async function getVideoData() {
    setLoader(true);
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${show}/${id}/videos`, {
        params: {
          language: 'en-US',
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTlhYTdhNTZkNjJlNGU2OTU0NDA3MjI3MjYwNzBkZCIsIm5iZiI6MTcyMDY1NjYzNC41MzE5MzcsInN1YiI6IjY2MjEwYjdkMGQxMWYyMDE2NDAxNjUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HOIc96_5psPzp8ur9qC0N0HzOqSDgPYoSsyPct0UTKo'
        }
      });
      setVideoData(data.results[0]);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  async function getCredits(){
    setLoader(true) ;
    try {
      
      const {data} = await axios.get(`https://api.themoviedb.org/3/${show}/${id}/credits` , {
        params: {language: 'en-US'},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTlhYTdhNTZkNjJlNGU2OTU0NDA3MjI3MjYwNzBkZCIsIm5iZiI6MTcyMDg3MTczOS4yNjcxMjQsInN1YiI6IjY2MjEwYjdkMGQxMWYyMDE2NDAxNjUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUHorhxSQKBs8zOdf8QJHEAI1hebLTNfkuV-2lf1x6I'
        }
      })
      setCredits(data.cast.slice(0,20));
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  }




  useEffect(() => {
    getVideoData();
    getCredits()
  }, []);

  return (
    <>
      <div className="vedio-player relative h-[150vh] md:h-[100vh] w-full" id="video-player" style={{ backgroundImage: `url(${bg})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <Link to={'/'}>
          <div className="z-50 p-2  fa-solid fa-rotate-left absolute fa-2xl top-10 left-5 text-white hover:text-red-600 duration-300"></div>
        </Link>
        <div className="container relative z-10 w-[100%] h-[90%] mx-auto pt-20 px-0 px-md-0 flex-col">
          {loader && <i className='fa fa-spinner animate-spin fa-spin relative  left-[45%] top-[45%] text-red-600 text-8xl'></i>}
          <div className="flex  flex-wrap items-center w-full h-full">
            <div className="lg:w-1/2 w-full lg:h-full h-[50%] px-6 ">
            {videoData.key && (
            <>
              <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${videoData.key}`} 
                controls={true}
                width={'100%'}
                height={'100%'}
                // playing={true}
              />
            </>
          )}
            </div>
            <div className="lg:w-1/2 w-full px-6">
            <h1 className='text-white text-3xl pt-3 font-semibold'>{videoData.name}</h1>
            {!loader&&  <h2 className='text-white text-2xl pt-4 font-semibold'>Actors :</h2>
             }
            <Swiper
                  className="my-5"
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={10}
                  slidesPerView={3}
                  navigation
                  breakpoints={{
                        320: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                        1200: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                    }}
             >
   
    {
      credits.map((actor , index)=>( 
          <SwiperSlide key={index} >
       <div className="card group cursor-pointer relative overflow-hidden" >
          <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt="cardImage" className='group-hover:blur-sm w-full h-[370px] group-hover:rotate-3 group-hover:scale-110 duration-300' />
          <div className="absolute w-full bg-[#1414143e] text-white h-full left-0 opacity-0 top-0 group-hover:opacity-100 duration-700 p-4">
            <h3 className='text-2xl font-semibold mb-3 text-start'>{actor.name}</h3>

           
          </div>
    </div>
    </SwiperSlide>
      ))
    }

  </Swiper>



            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
