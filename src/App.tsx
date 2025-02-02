// src/App.tsx
import React from 'react';
import Layout from './components/layout/Layout';
import DailyOverview from './components/dashboard/DailyOverview';

function App() {
  return (
    <Layout>
      <DailyOverview />
    </Layout>
  );
}

export default App;

// import React from 'react';
// import DailyOverview from './components/dashboard/DailyOverview';
// import { useReservations } from './hooks/useReservations';

// const App = () => {
//   const { selectedDate, setSelectedDate, stats } = useReservations();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <h1 className="text-3xl font-bold text-gray-900">French Laudure FoH</h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <DailyOverview 
//           selectedDate={selectedDate}
//           onDateChange={setSelectedDate}
//         />
//       </main>
//     </div>
//   );
// };

// export default App;