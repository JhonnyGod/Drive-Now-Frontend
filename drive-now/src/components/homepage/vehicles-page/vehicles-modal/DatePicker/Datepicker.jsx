import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./StyledDatePicker.css";

export default function StyledDatePicker() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="datepicker-wrapper">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        minDate={new Date()}
        inline
        className="start-date-picker"
        calendarClassName="custom-calendar"
        dayClassName={() => "custom-day"}
        monthClassName={() => "custom-month"}
        weekDayClassName={() => "custom-weekday"
        }
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-header">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="navigation-button">
              {"<"}
            </button>
            <div className="month-year-selectors">
              <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
                className="month-selector"
              >
                {months.map((month, index) => (
                  <option 
                    key={month} 
                    value={index}
                    disabled={date.getFullYear() === currentYear && index < currentMonth}
                  >
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                className="year-selector"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="navigation-button">
              {">"}
            </button>
          </div>
        )}
      />
      {startDate && endDate && (
        <div className="date-range-display">
          <p>Desde: {startDate.toLocaleDateString()}</p>
          <p>Hasta: {endDate.toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
