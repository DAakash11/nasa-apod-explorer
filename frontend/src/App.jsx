import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from './components/DatePicker';
import APODViewer from './components/APODViewer';
import Loader from './components/Loader';

function App() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAPOD = async (queryDate = '') => {
    try {
      setLoading(true);
      const res = await axios.get('/api/apod', {
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

  const handleSubmit = () => {
    if (date) fetchAPOD(date);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
      <h1>NASA APOD Explorer</h1>
      <DatePicker date={date} setDate={setDate} onSubmit={handleSubmit} />
      {loading ? (
        <Loader />
      ) : apod ? (
        <APODViewer apod={apod} />
      ) : (
        <p>No APOD data available.</p>
      )}
    </div>
  );
}

export default App;
