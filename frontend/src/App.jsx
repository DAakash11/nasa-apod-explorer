import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from './components/DatePicker';
import APODViewer from './components/APODViewer';
import Loader from './components/Loader';
import './App.css';

function App() {
  const getToday = () => {
    return new Date().toISOString().split('T')[0];
  };

  const [apods, setApods] = useState([]);
  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(5); // default random count

  const fetchRange = async (rangeStart = startDate, rangeEnd = endDate) => {
    if (!rangeStart || !rangeEnd || rangeStart > rangeEnd) {
      alert('Please enter a valid date range.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get('/api/apod', {
        params: {
          start_date: rangeStart,
          end_date: rangeEnd
        }
      });
      setApods(Array.isArray(res.data) ? res.data : [res.data]); // handle both single and multiple
    } catch (err) {
      console.error('Range fetch error:', err);
      setApods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRange(); // fetches default range
  }, []);

  return (
    <div className="container">
      <h1 className="heading">NASA APOD Explorer</h1>
      <div className="random-section">
        <label>
          Random Count:
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="random-input"
          />
        </label>
        <button
          className="button-primary"
          onClick={async () => {
            try {
              setLoading(true);
              const res = await axios.get('/api/apod', {
                params: { count } // ✅ must be here
              });
              setApods(Array.isArray(res.data) ? res.data : [res.data]);
              console.log('Sending count:', count);
            } catch (err) {
              console.error('Random count fetch error:', err);
              setApods([]);
            } finally {
              setLoading(false);
            }
          }}
        >
          🎲 Fetch Random
        </button>
      </div>

      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSubmit={fetchRange}
      />

      {loading ? (
        <Loader />
      ) : Array.isArray(apods) && apods.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '1fr',
          }}
          className="apod-grid"
        >
          {apods.slice().reverse().map((apod) => (
            <APODViewer key={apod.date} apod={apod} isToday={apod.date === getToday()} />
          ))}
        </div>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}

export default App;
