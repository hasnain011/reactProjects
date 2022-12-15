import { useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import Forcast from './components/forcast/Forcast';
import Search from './components/search/Search';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentforcast, setCurrentForcast] = useState(null);
  
  // For different cities search data
  const handleOnSearchChange = (searchData) =>{
    console.log(searchData)
    const [lat,lon] = searchData.value.split(" ");
    // Current Weather fetch API
    const currentWeatherFetch = fetch (`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    // Forcost Fetch Api
    const forcastFetch = fetch (`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    // If we have two or more api calls then we use Promise.all to combine all api calls
    Promise.all([currentWeatherFetch,forcastFetch])
    .then(async(response)=>{
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();
      setCurrentWeather({city: searchData.label, ...weatherResponse});
      setCurrentForcast({city: searchData.label, ...forcastResponse});
    })
    .catch((err)=> console.log(err));

  }
  console.log(currentWeather);
  console.log(currentforcast);
  let i = 0;
  console.log(i++);
  console.log(++i);
  console.log(i);

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {currentforcast && <Forcast data={currentforcast}/>}
   </div>
  );
}

export default App;
