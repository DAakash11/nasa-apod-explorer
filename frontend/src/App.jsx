import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAPOD = async (queryDate = '') => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/apod', {
      params: queryDate ? { date: queryDate } : {}
    });
    console.log('Submitting date:', date);
    setApod(res.data);
    } catch (err) {
      console.error(err);
      setApod(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD(); // Fetch today's APOD on load
  }, []);

  const handleDateChange = (e) => setDate(e.target.value);

  const handleSubmit = () => {
    if (date) fetchAPOD(date);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
      <h1>NASA Astronomy Picture of the Day</h1>

      <div>
        <input type="date" value={date} onChange={handleDateChange} />
        <button onClick={handleSubmit}>Fetch by Date</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : apod ? (
        <div>
          <h2>{apod.title}</h2>
          {apod.media_type === 'image' ? (
            <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />
          ) : (
            <iframe
              title="NASA Video"
              src={apod.url}
              width="100%"
              height="400px"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
          <p>{apod.explanation}</p>
        </div>
      ) : (
        <p>No data available for this date.</p>
      )}
    </div>
  );
}

export default App;
