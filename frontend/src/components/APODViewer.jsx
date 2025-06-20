function APODViewer({ apod, isToday = false }) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        color: '#222',
        border: isToday ? '2px solid gold' : '1px solid #ddd',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        position: 'relative',
      }}
    >
      {isToday && (
        <span
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'gold',
            color: '#000',
            fontWeight: 'bold',
            padding: '0.25rem 0.5rem',
            borderRadius: '5px',
            fontSize: '0.75rem',
          }}
        >
          🌟 Today’s APOD
        </span>
      )}

      <h3>{apod.title}</h3>

      {apod.media_type === 'image' ? (
        <img
        src={apod.url}
        alt={apod.title}
        style={{ maxWidth: '100%', borderRadius: '8px' }}
        />
      ) : (
        <iframe
        title={apod.title}
        src={apod.url}
        width="100%"
        height="300"
        style={{ borderRadius: '8px' }}
        allow="autoplay"
        allowFullScreen
        ></iframe>
      )}

      <p style={{ fontSize: '0.8rem', color: '#666' }}>{apod.date}</p>

      <p>{apod.explanation}</p>

      {/* Media type tag */}
      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#444' }}>
        {apod.media_type === 'image' ? '📷 Image' : '🎥 Video'}
      </div>
    </div>
  );
}

export default APODViewer;
