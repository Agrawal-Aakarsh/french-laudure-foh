import React, { createContext, useContext, useState } from 'react';

type DashboardDateContextType = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const DashboardDateContext = createContext<DashboardDateContextType>({
  selectedDate: new Date('2024-05-21'),
  setSelectedDate: () => {},
});

export function DashboardDateProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024-05-21'));
  
  return (
    <DashboardDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DashboardDateContext.Provider>
  );
}

export function useDashboardDate(): DashboardDateContextType {
  const context = useContext(DashboardDateContext);
  if (!context) {
    throw new Error('useDashboardDate must be used within a DashboardDateProvider');
  }
  return context;
}