import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from './components/DatePicker';
import APODViewer from './components/APODViewer';
import Loader from './components/Loader';
import "./App.css";

function App() {
  const getToday = () => new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());
  const [count, setCount] = useState(5);
  const [apods, setApods] = useState([]);
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  
  const fetchRange = async (rangeStart = startDate, rangeEnd = endDate) => {
    if (!rangeStart || !rangeEnd || rangeStart > rangeEnd) {
      alert('Please enter a valid date range.');
      return;
    }
    
    try {
      setLoading(true);
      const res = await axios.get('/api/apod', {
        params: { start_date: rangeStart, end_date: rangeEnd },
      });
      setApods(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error('Range fetch error:', err);
      setApods([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandom = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/apod', {
        params: { count },
      });
      setApods(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error('Random count fetch error:', err);
      setApods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRange(getToday(), getToday());
  }, []);

  return (
    <div className="container">
      <h1 className="heading">NASA APOD Explorer</h1>

      {/* Date Range Picker */}
      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSubmit={fetchRange}
      />

      {/* Random Fetch */}
      <div style={{ marginTop: '1rem' }}>
        <label>
          🎲 Random Count:&nbsp;
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            style={{ width: '60px' }}
          />
        </label>
        <button onClick={fetchRandom} style={{ marginLeft: '0.5rem' }}>🎲 Fetch Random</button>
      </div>

      {/* Results */}
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
