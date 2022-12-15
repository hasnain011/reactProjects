import React from 'react'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'
import './Forcast.css'



const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday', 'Sunday']
const Forcast = ({data}) => {
   const dayInWeek = new Date().getDay();
   const forcastDay = WEEK_DAYS.slice(dayInWeek,WEEK_DAYS.length).concat(WEEK_DAYS.slice(0,dayInWeek));
  return (
    <>
    <Accordion allowZeroExpanded>
    <label className="title">Daily</label> 
    {data.list.splice(0, 7).map((item, idx) => (
    <AccordionItem key={idx}>
        <AccordionItemHeading>
            <AccordionItemButton>
            <div className="daily-item">
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <label className="day">{[forcastDay[idx]]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  <label className="min-max">{Math.round(item.main.temp_min)}°C /{Math.round(item.main.temp_max)}°C</label>
                </div>
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div className='daily-details-grid'>
            <div className='daily-details-grid-items'>
              <label>Pressure </label>
              <label>{item.main.pressure}</label>
            </div>
            <div className='daily-details-grid-items'>
              <label>Humidity </label>
              <label>{item.main.humidity}</label>
            </div>
            <div className='daily-details-grid-items'>
              <label>Clouds </label>
              <label>{item.clouds.all}%</label>
            </div>
            <div className='daily-details-grid-items'>
              <label>Wind Speed </label>
              <label>{item.wind.speed} m/s</label>
            </div>
            <div className='daily-details-grid-items'>
              <label>Sea Level </label>
              <label>{item.main.sea_level} m</label>
            </div>
            <div className='daily-details-grid-items'>
              <label>Feels Like </label>
              <label>{Math.round(item.main.feels_like)}°C</label>
            </div>
          </div>


        </AccordionItemPanel>
    </AccordionItem>      

    ))}
    </Accordion>
  </>
  )
}

export default Forcast
