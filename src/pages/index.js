import Image from "next/image";
import { useRef, useState } from "react";
import { Pin } from "../common/Pin";
import { Search } from "../common/Search";
import { Water } from "../common/Water";
import { Wind } from "../common/Wind";
import clear from "../images/clear.png";
import cloud from "../images/cloud.png";
import error from "../images/error.png";
import mist from "../images/mist.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
import Head from "next/head";

export default function Home() {
  const inputRef = useRef();

  const [image, setImage] = useState(cloud);
  const [weather, setWeather] = useState();
  const [notFound, setNotFound] = useState(false);
  const [weatherStatus, setWeatherStatus] = useState(false);

  const getWeather = async () => {
    setWeatherStatus(false);
    const city = inputRef.current.value;
    if (city === "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=` +
        process.env.NEXT_PUBLIC_APIKEY
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") {
          setWeatherStatus(false);
          setNotFound(true);
          return;
        }
        setNotFound(false);
        setWeather(data);
        switch (data.weather[0].main) {
          case "Clear":
            setImage(clear);
            break;
          case "Rain":
            setImage(rain);
            break;
          case "Snow":
            setImage(snow);
            break;
          case "Clouds":
            setImage(cloud);
            break;
          case "Haze":
            setImage(mist);
            break;
          default:
            setImage(cloud);
        }
        setWeatherStatus(true);
      });
  };

  return (
    <main className="flex items-center justify-center h-screen bg-[#06283D] box-border">
      <Head>
        <title>{"Weather Now"}</title>
        <meta name="og:site_name" content="Jeremy Mosquera" />
        <meta
          name="description"
          content="Web application to see the weather of the location you want using the OpenWeatherMap API, try to be a simple application that can run on any device and deliver the information quickly."
        ></meta>

        <meta itemProp="name" content="Weather Now" />
        <meta
          itemProp="description"
          content="Web application to see the weather of the location you want using the OpenWeatherMap API, try to be a simple application that can run on any device and deliver the information quickly."
        />
        <meta
          itemProp="image"
          content="https://res.cloudinary.com/deohsoirn/image/upload/v1680330724/Portfolio/additionalImages/weatherNow_ajyoak.png"
        />

        <meta
          property="og:url"
          content="https://weathernow-jeremydevcode.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Weather Now" />
        <meta
          name="og:description"
          content="Web application to see the weather of the location you want using the OpenWeatherMap API, try to be a simple application that can run on any device and deliver the information quickly."
        ></meta>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/deohsoirn/image/upload/v1680330724/Portfolio/additionalImages/weatherNow_ajyoak.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="780" />
        <meta property="og:image:height" content="656" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weather Now" />
        <meta
          name="twitter:description"
          content="Web application to see the weather of the location you want using the OpenWeatherMap API, try to be a simple application that can run on any device and deliver the information quickly."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/deohsoirn/image/upload/v1680330724/Portfolio/additionalImages/weatherNow_ajyoak.png"
        />
      </Head>
      <div
        className={`relative w-[400px] transition-all duration-500 ${
          !weatherStatus ? "h-[90px]" : "h-[605px]"
        } bg-white py-5 px-8 overflow-hidden rounded-2xl`}
      >
        <div className="flex items-center justify-between w-full h-min">
          <Pin />
          <input
            ref={inputRef}
            className="outline-none text-[#06283D] w-4/5 text-2xl font-medium pl-8 placeholder:text-xl placeholder:text-[#06283D]"
            type="text"
            placeholder="Enter your location"
          />
          <button
            onClick={getWeather}
            className="cursor-pointer w-[50px] h-[50px] text-[#06283D] bg-[#DFF6FF] flex items-center justify-center rounded-full transition delay-[40] ease-linear hover:text-white hover:bg-[#06283D]"
          >
            <Search />
          </button>
        </div>
        <h2
          className={`text-center ${
            !notFound ? "hidden" : "block"
          } text-red-600`}
        >
          Please enter a valid location
        </h2>

        <div
          className={`flex flex-col items-center justify-center transition-all ${
            weatherStatus ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <Image
            src={image}
            width={500}
            height={500}
            className="w-3/5 mt-[30px]"
            alt={image}
            priority={true}
          />
          <p className="relative text-[#06283D] text-[4rem] font-extrabold mt-[30px]">
            {Math.round(weather?.main?.temp) || "Waiting"}
            <span className="absolute text-2xl">°C</span>
          </p>
          <p className="text-[#06283D] text-[22px] font-medium capitalize">
            {weather?.weather[0]?.description}
          </p>
        </div>

        <div className="flex justify-between w-full mt-[30px] scale opacity">
          <div className="flex items-center justify-start w-2/4 h-[100px] pl-5">
            <Water />
            <div>
              <span className="text-[#06283D] text-[22px] font-medium">
                {Math.round(weather?.main?.humidity) || "..."}%
              </span>
              <p className="text-[#06283D] text-[14px] font-medium">Humidity</p>
            </div>
          </div>
          <div className="flex items-center justify-end w-2/4 h-[100px] pr-5">
            <Wind />
            <div>
              <span className="text-[#06283D] text-[22px] font-medium">
                {Math.round(weather?.wind?.speed) || "..."}Km/h
              </span>
              <p className="text-[#06283D] text-[14px] font-medium">
                Wind Speed
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
