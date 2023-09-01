// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import axios from 'axios';

// const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: 'Event 1',
//     start: new Date(),
//     end: new Date(),
//   },
//   {
//     title: 'Event 2',
//     start: moment().add(1, 'days').toDate(),
//     end: moment().add(1, 'days').toDate(),
//   },
//   {
//     title: 'Event Boo',
//     start: moment().add(2, 'days').toDate(),
//     end: moment().add(2, 'days').toDate(),
//   },
// ];

// const App = () => {
//   return (
//     <div style={{ height: 500 }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         defaultDate={new Date()}
//       />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const api = axios.create({
  baseURL: 'http://localhost:3001', // Change this to your Rails backend URL
});

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events'); // Use the Axios instance
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventChange = async (changedEvent) => {
    try {
      const response = await api.put(`/events/${changedEvent.id}`, changedEvent);
      if (response.status === 200) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleEventAdd = async (newEvent) => {
    try {
      const response = await api.post('/events', newEvent);
      if (response.status === 201) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
  // Similar methods for event deletion...

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        onSelectEvent={handleEventChange}
        onSelectSlot={(slotInfo) =>
          handleEventAdd({
            title: 'New Event',
            start: slotInfo.start,
            end: slotInfo.end,
          })
        }
      />
    </div>
  );
};

export default App;
