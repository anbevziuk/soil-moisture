import classes from "./main.module.css";

export function ChartSelector({
  chartType,
  setChartType,
  selectedDate,
  setSelectedDate,
}: {
  chartType: string;
  setChartType: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}) {
  return (
    <>
      <p className={classes.chartCaption}>
        Графік вологості за останній час. Оберіть параметри для відображення.
      </p>
      <div className={classes.selector}>
        <label>Оберіть тип графіка: </label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="today">За сьогодні</option>
          <option value="7days">Останні 7 днів</option>
          <option value="byDate">За конкретну дату</option>
        </select>
        {chartType === "byDate" && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        )}
      </div>
    </>
  );
}
