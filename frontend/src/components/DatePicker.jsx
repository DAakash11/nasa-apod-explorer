function DatePicker({ date, setDate, onSubmit }) {
  return (
    <div>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={onSubmit}>Fetch</button>
    </div>
  );
}

export default DatePicker;
