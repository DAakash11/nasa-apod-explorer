function DatePicker({ startDate, setStartDate, endDate, setEndDate, onSubmit }) {
  // Utility functions (import these or move to helper file)
  const getToday = () => new Date().toISOString().split('T')[0];

  const getDaysAgo = (n) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().split('T')[0];
  };

  const getStartOfMonth = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  };

  const handleQuickSelect = (type) => {
    const end = getToday();
    let start = end;
    if (type === 'last7') start = getDaysAgo(6);
    if (type === 'month') start = getStartOfMonth();
    if (type === 'today') start = getToday();
    setStartDate(start);
    setEndDate(end);
    onSubmit(start, end); // immediately fetch
  };

  return (
    <div className="datepicker-container">
      <div className="datepicker-input-group">
        <label className="datepicker-label">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="datepicker-input"
          />
        </label>

        <label className="datepicker-label">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="datepicker-input"
          />
        </label>
      </div>

      <div className="datepicker-button-group">
        <button className="button-success" onClick={() => handleQuickSelect('last7')}>
          📅 Last 7 Days
        </button>
        <button className="button-success" onClick={() => handleQuickSelect('month')}>
          📅 This Month
        </button>
        <button className="button-success"  onClick={() => handleQuickSelect('today')}>
          📅 Today
        </button>
        <button className="button-primary" onClick={() => onSubmit()}>
          🔍 Fetch by Range
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
