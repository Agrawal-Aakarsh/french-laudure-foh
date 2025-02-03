// src/components/dashboard/ReservationCalendar.tsx
import React from 'react';
import { Calendar } from '@/components/ui/calendar';

interface ReservationCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  getReservationCountForDate: (date: Date) => number;
  maxDailyReservations: number;
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  selectedDate,
  onDateChange,
  getReservationCountForDate,
  maxDailyReservations
}) => {
  // Define modifiers for different reservation levels
  const modifiers = {
    low: (date: Date) => {
      const count = getReservationCountForDate(date);
      const ratio = count / maxDailyReservations;
      return count > 0 && ratio < 0.3;
    },
    medium: (date: Date) => {
      const count = getReservationCountForDate(date);
      const ratio = count / maxDailyReservations;
      return ratio >= 0.3 && ratio < 0.7;
    },
    high: (date: Date) => {
      const count = getReservationCountForDate(date);
      const ratio = count / maxDailyReservations;
      return ratio >= 0.7;
    }
  };

  // Define static classes for each modifier
  const modifiersClassNames = {
    low: "bg-green-100 hover:bg-green-200",
    medium: "bg-yellow-100 hover:bg-yellow-200",
    high: "bg-red-100 hover:bg-red-200"
  };

  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date: Date | undefined) => date && onDateChange(date)}
        className="w-full"
        classNames={{
          months: "flex flex-col w-full",
          month: "space-y-4 w-full",
          caption: "flex justify-between pt-1 relative items-center px-8",
          caption_label: "text-sm font-medium",
          nav: "flex items-center space-x-1 absolute left-1",
          nav_button: "h-7 w-7 bg-transparent p-0 hover:opacity-70",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex w-full",
          head_cell: "w-8 font-normal text-sm",
          row: "flex w-full mt-2 gap-1",
          cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 h-8 w-8",
          day: "h-8 w-8 p-0 font-normal hover:bg-gray-100 rounded-lg flex items-center justify-center",
          day_selected: "bg-blue-500 text-white hover:bg-blue-600",
          day_today: "font-bold",
          day_outside: "text-gray-400",
          day_disabled: "text-gray-300"
        }}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </div>
  );
};

export default ReservationCalendar;