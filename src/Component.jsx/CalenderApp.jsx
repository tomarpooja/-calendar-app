/*import { Textarea } from "@headlessui/react";
import { useState } from "react";

const CalenderApp = () => {
  const daysofWeek = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
  const monthsOfYear =["January","February","March","April","May","June","July","August","September","October","November","December"]
  const currentDate = new Date()
  const [currentMonth, setCurrentMonth] = useState(11)
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const[setCurrentDate,setSelectDate]=useState(currentDate)
  const[showEventPopup,setShowEventPopup]=useState(false)
  const[events,setEvents]=useState([])
  const[eventTime,setEventTime]=useState({hours:'00'},minutes:"00"})
  const[eventText,setEventText] = useState('')

const daysInMonth = new Date(currentYear,currentMonth + 1,0).getDate()
const firstDayOfMonth = new Date(currentYear, currentMonth,1).getDay()
  console.log(daysInMonth,firstDayOfMonth)

  const preMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };
  
const handleDayClick=(day)=>{
  const clickedDate=new Date(currentYear , currentMonth,day)
  const today=new Date()

  if(clickedDate>= today || isSameDay(clickedDate,today)){
    setSelectDate(clickedDate)
    setShowEventPopup(true)
    setEventText({hours:'00'},minutes:'00})
    setEventTime('')
  }
}

const isSameDay = (date1,date2)=>{
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const handleEventSubmit=()=>{
  const newEvent ={
    date:selectedDate,
    time:'${eventTime.hours.padStar(2,'0')}:${eventTime.minutes.padStar(2,'0')}
    text:eventText,
  }
  setEvents([...events,newEvent])
  setEventText({hours:'00',minutes:"00"})
  setEventTime("")
  setShowEventPopup
}

  return (
    <div className="calender-app">
      <h1 className="heading">Calendar</h1>

      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currentMonth]}</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={preMonth}></i>
          {/* Missing right button /}
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
{daysofWeek.map((day)=> <span key={day}>{day}</span>)}
</div>
<div className="Days">
  {/* Render empty spans for days before the first day of the month /}
  {[...Array(new Date(currentYear, currentMonth, 1).getDay()).keys()].map((_, index) => (
    <span key={`empty-${index}`} />
  ))}

  {/* Render days of the month /}
  {[...Array(daysInMonth).keys()].map((day) => {
    const isToday =
      day + 1 === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear();

    return (
      <span
        key={day + 1}
        className={isToday ? "highlight-current-day" : ""}
  onClick={()=> handleDayClick(day+1)}
      >
        {day + 1}
      </span>
    );
  })}
</div>

      <div className="events">
        {showEventPopup && (
        <div className="event-popup">
          <div className="time-input"></div>
          <div className="event-popup-time"></div>
          <input type="number" name="hours" min={0} max={24} className="hours" value={eventTime.hours} onChange={(e)=> setEventTime({...eventTime,hours:e.target.value })}/>
          <input type="number" name="hours" min={0} max={60} className="minutes" />
          <textarea placeholder="Enter Event Text (Maximum 60 Characters)"></textarea>
          <button className="event-popup-btn">Add Event</button>
          <button className="close-event-popup" onClick={()=>setShowEventPopup(false)}>
            <i className="bx bx-x"></i>
          </button>
        </div>
        )}
      </div>
      
      {/* Event List Section /}
      
      <div className="event">
        <div className="event-date-wrapper">
          <div className="event-date">December 25 , 2024</div>
          <div className="event-time">10:00</div>
        </div>
        <div className="event-text">Christmas</div>
        <div className="event-buttons">
          <i className="bx bxs-edit-alt"></i>
          <i className="bx bxs-message-alt-x"></i>
          
        </div>
      </div>
      </div>
    
  );
};

export default CalenderApp;  */

import { useState } from "react";

const CalendarApp = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent,seteditingEvent]=useState(null)
  const cancelEvent = (eventId) => {
    // Remove only the event with the matching ID
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    if (clickedDate >= today) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      seteditingEvent(null)
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id:editingEvent?editingEvent.id:Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`,
      text: eventText,
    };
    let updatedEvents = [...events];

    if(editingEvent){
     updatedEvents=updatedEvents.map((event)=>
      event.id===editingEvent.id ? newEvent : event,
    ) 
  }
    else{
        updatedEvents.push(newEvent)
    }
    updatedEvents.sort((a,b)=>new Date(a.date)-new Date(b.date))
    setEvents(updatedEvents);
    setEvents([...events, newEvent]);
    setShowEventPopup(false);
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

const handleEditEvent=(event)=>{
setSelectedDate(new Date(event.date))
setEventTime({
  hours:event.time.split(":")[0],
  minutes:event.time.split(":")[1],
})
setEventText(event.text)
seteditingEvent(event)
setShowEventPopup(true)

}


  return (
    <div className="calendar-app">
      <h1 className="heading">Calendar</h1>

      <div className="navigate-date">
        <h2 className="month">{monthsOfYear[currentMonth]}</h2>
        <h2 className="year">{currentYear}</h2>
        <div className="buttons">
          <button onClick={prevMonth}>Previous</button>
          <button onClick={nextMonth}>Next</button>
        </div>
      </div>

      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="days">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <span key={`empty-${i}`} className="empty"></span>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <span
            key={i + 1}
            className={isToday(i + 1) ? "highlight" : ""}
            onClick={() => handleDayClick(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </div>

      {showEventPopup && (
        <div className="event-popup">
          <label>
            Time:
            <input
              type="number"
              min="0"
              max="23"
              value={eventTime.hours}
              onChange={(e) =>
                setEventTime({ ...eventTime, hours: e.target.value })
              }
            />
            :
            <input
              type="number"
              min="0"
              max="59"
              value={eventTime.minutes}
              onChange={(e) =>
                setEventTime({ ...eventTime, minutes: e.target.value })
              }
            />
          </label>
          <textarea
            placeholder="Event Event Text(Max 60 Characters)"
            value={eventText}
            maxLength="60"
            onChange={(e) => {
              if(e.target.value.length <=60){
                setEventText(e.target.value)
            }
          }}
          ></textarea>
          <button onClick={handleEventSubmit}>Add Event</button>
          <button onClick={() => setShowEventPopup(false)}>Close</button>
          </div>
      )}
<div className="event-list">
  {events.map((event) => (
    <div key={event.id} className="event">
      <div className="event-date-wrapper">
        <div className="event-date">
          {`${monthsOfYear[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}
        </div>
        <div className="event-time">{event.time}</div>
      </div>
      <div className="event-text">{event.text}</div>
      <div className="event-buttons">
        <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
        <i className="bx bxs-message-alt-x" onClick={() => cancelEvent(event.id)}></i>
      </div>
    </div>
  ))}
</div>
</div>
  )};
export default CalendarApp;




