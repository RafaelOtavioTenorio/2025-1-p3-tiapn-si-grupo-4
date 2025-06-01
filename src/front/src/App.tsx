import Header from './components/header';
import SidePannel from './components/SidePannel';
import { useState } from 'react';
import CreatePage from './pages/CreatePage';
import RoutinesPage from './pages/RoutinesPage';
import HistoricPage from './pages/HistoricPage';
import GroupsPage from './pages/GroupsPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import { BrowserRouter, Route, Routes } from 'react-router';

export const Pannels = {
  CREATE: '',
  ROUTINES: 'routines',
  HISTORIC: 'historic',
  GROUPS: 'groups',
} as const;

export function App() {
  const [activePannel, setActivePannel] = useState(Pannels.CREATE as string);

  return (
    <>
      <div className='h-screen overflow-hidden'>
        <Header />
        <div className='flex flex-row h-[calc(100vh-4rem)]'>
          <BrowserRouter> 
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} /> 
              <Route path="/app/*" element={ 
                <>
                  <SidePannel activePannel={activePannel} setActivePannel={setActivePannel} />
                  <main className='flex-1 bg-[#F5F5F5] '>
                    <Routes> 
                      <Route path="/" element={<CreatePage />} /> 
                      <Route path="routines" element={<RoutinesPage text="routines" />} /> 
                      <Route path="historic" element={<HistoricPage />} /> 
                      <Route path="groups" element={<GroupsPage />} /> 
                    </Routes>
                  </main>
                </>
              } />

              <Route path="*" element={<LoginPage />} /> 

            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}