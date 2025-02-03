import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import DailyOverview from './components/dashboard/DailyOverview';
import { GuestProfiles } from './components/guest-profiles';
import PageTransition from './components/layout/PageTransition';
import { DashboardDateProvider } from './context/DashboardDateContext';

function App() {
  return (
    <DashboardDateProvider>
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <DailyOverview />
                </PageTransition>
                
              } 
            />
            <Route 
              path="/guests" 
              element={
                <PageTransition>
                  <GuestProfiles />
                </PageTransition>
              } 
            />
            <Route 
              path="/service-notes" 
              element={
                <PageTransition>
                  <div>Service Notes</div>
                </PageTransition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
    </DashboardDateProvider>
  );
}

export default App;