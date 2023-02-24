import Image from 'next/image';
import { useRef, useState } from 'react';
import { Pin } from '../common/Pin';
import { Search } from '../common/Search';
import { Water } from '../common/Water';
import { Wind } from '../common/Wind';
import clear from '../images/clear.png';
import cloud from '../images/cloud.png';
import error from '../images/error.png';
import mist from '../images/mist.png';
import rain from '../images/rain.png';
import snow from '../images/snow.png';

export default function Home() {

  const inputRef = useRef();

  const [image, setImage] = useState(cloud);
  const [weather, setWeather] = useState();
  
  const getWeather = async () => {
    const city = inputRef.current.value;
    if(city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=` + process.env.NEXT_PUBLIC_APIKEY)
    .then(res => res.json())
    .then(data => {
      if(data.cod === '404') {
        return; 
      }
      console.log(data);
      setWeather(data);
      switch (data.weather[0].main) {
        case 'Clear': 
            setImage(clear);
            break;
        case 'Rain': 
            setImage(rain);
            break;
        case 'Snow': 
            setImage(snow);
            break;
        case 'Clouds': 
            setImage(cloud);
            break;
        case 'Haze': 
            setImage(mist);
            break;
        default: 
            setImage(cloud);
      }
    })
  };

  return (
   <main className='flex items-center justify-center h-screen bg-[#06283D] box-border'>
      <div className='relative w-[400px] h-[605px] bg-white py-5 px-8 overflow-hidden rounded-2xl transition delay-75 ease-out'>
        <div className='flex items-center justify-between w-full h-min'>
          <Pin/>
          <input ref={inputRef} className='outline-none text-[#06283D] w-4/5 text-2xl font-medium uppercase pl-8 placeholder:text-xl placeholder:text-[#06283D] placeholder:capitalize' type='text' placeholder='Enter your location'/>
          <button onClick={getWeather} className='cursor-pointer w-[50px] h-[50px] text-[#06283D] bg-[#DFF6FF] flex items-center justify-center rounded-full transition delay-[40] ease-linear hover:text-white hover:bg-[#06283D]'>
            <Search/>
          </button>
        </div>

        <div className='hidden w-full mt-12 text-center scale-0 opacity-0'>
          <Image src={error} className='w-3/4' alt='Error 404'/>
          <p className='text-[#06283D] text-[22px] font-medium mt-3'>Oops! Invalid location</p>
        </div>

        <div className='flex flex-col items-center justify-center scale opacity'>
          <Image src={image} width={500} height={500} className='w-3/5 mt-[30px]' alt={image} priority={true}/>
          <p className='relative text-[#06283D] text-[4rem] font-extrabold mt-[30px] ml-[-16px]'>{Math.round(weather?.main?.temp) || 'Waiting'}</p>
          <p className='text-[#06283D] text-[22px] font-medium capitalize'>{weather?.weather[0]?.description}</p>
        </div>

        <div className='flex justify-between w-full mt-[30px] scale opacity'>
          <div className='flex items-center justify-start w-2/4 h-[100px] pl-5'>
            <Water/>
            <div>
              <span className='text-[#06283D] text-[22px] font-medium'>{Math.round(weather?.main?.humidity) || '...'}%</span>
              <p className='text-[#06283D] text-[14px] font-medium'>Humidity</p>
            </div>
          </div>
          <div className='flex items-center justify-end w-2/4 h-[100px] pr-5'>
            <Wind/>
            <div>
              <span className='text-[#06283D] text-[22px] font-medium'>{Math.round(weather?.wind?.speed) || '...'}Km/h</span>
              <p className='text-[#06283D] text-[14px] font-medium'>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
   </main>
  )
}
