import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios';

import './App.css';

export default function EventCalendar(){


    const [eventsList, setEventsList] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:8000/api/event-list`)
        .then(res => {
          const event_list = res.data.data;

          setEventsList(event_list)
        
        })

    },[]);

    console.log(eventsList)

    return(
        <div>

        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}
        
        
        events={eventsList}
        />
        </div>

    )
}