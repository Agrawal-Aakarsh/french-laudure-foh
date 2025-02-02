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


// // src/components/dashboard/ReservationCalendar.tsx
// import React from 'react';
// import { Calendar } from '@/components/ui/calendar';
// import { cn } from '@/lib/utils';

// interface ReservationCalendarProps {
//   selectedDate: Date;
//   onDateChange: (date: Date) => void;
//   getReservationCountForDate: (date: Date) => number;
//   maxDailyReservations: number;
// }

// const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
//   selectedDate,
//   onDateChange,
//   getReservationCountForDate,
//   maxDailyReservations
// }) => {
//   const modifiers = {
//     empty: (date: Date) => getReservationCountForDate(date) === 0,
//     low: (date: Date) => {
//       const ratio = getReservationCountForDate(date) / maxDailyReservations;
//       return ratio > 0 && ratio < 0.3;
//     },
//     medium: (date: Date) => {
//       const ratio = getReservationCountForDate(date) / maxDailyReservations;
//       return ratio >= 0.3 && ratio < 0.7;
//     },
//     high: (date: Date) => {
//       const ratio = getReservationCountForDate(date) / maxDailyReservations;
//       return ratio >= 0.7;
//     }
//   };

//   const modifiersClassNames = {
//     empty: "hover:bg-gray-100",
//     low: "bg-green-100 hover:bg-green-200",
//     medium: "bg-yellow-100 hover:bg-yellow-200",
//     high: "bg-red-100 hover:bg-red-200"
//   };

//   return (
//     <div className="w-full h-full p-4 bg-white rounded-lg shadow">
//       <Calendar
//         mode="single"
//         selected={selectedDate}
//         onSelect={(date) => date && onDateChange(date)}
//         className="w-full"
//         classNames={{
//           months: "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//           month: "w-full space-y-4",
//           caption: "flex justify-center pt-1 relative items-center",
//           caption_label: "text-sm font-medium",
//           nav: "space-x-1 flex items-center",
//           nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
//           table: "w-full border-collapse space-y-1",
//           head_row: "flex w-full",
//           head_cell: "rounded-md w-full font-normal text-[0.8rem]",
//           row: "flex w-full mt-2",
//           cell: "text-center text-sm relative p-0 hover:bg-gray-100 rounded-md",
//           day: cn(
//             "h-9 w-9 p-0 font-normal",
//             "hover:bg-gray-100 hover:text-gray-900",
//             "flex items-center justify-center rounded-md"
//           ),
//           day_today: "bg-gray-100 font-semibold text-gray-900",
//           day_selected: "bg-blue-500 text-white hover:bg-blue-600",
//         }}
//         modifiers={modifiers}
//         modifiersClassNames={modifiersClassNames}
//       />
//     </div>
//   );
// };

// export default ReservationCalendar;