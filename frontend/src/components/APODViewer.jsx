function APODViewer({ apod }) {
  // console.log('Rendering APOD:', apod);
  return (
    <div>
      <h2>{apod.title}</h2>
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />
      ) : (
        <iframe
          title="NASA Video"
          src={apod.url}
          width="100%"
          height="400"
          allow="autoplay"
          allowFullScreen
        ></iframe>
      )}
      <p>{apod.explanation}</p>
    </div>
  );
}

export default APODViewer;
