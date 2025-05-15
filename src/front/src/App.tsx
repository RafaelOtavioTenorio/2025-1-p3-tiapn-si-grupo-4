import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/header'
import SidePannel from './components/SidePannel'
import MainPage from './pages/MainPage'
import { useState } from 'react';
import CreatePage from './pages/CreatePage';

export const Pannels = {
  CREATE: 'create',
  ROUTINES: 'routines',
  HISTORIC: 'historic',
  GROUPS: 'groups',
} as const;

function App() {

  const [activePannel, setActivePannel] = useState(Pannels.CREATE as string);


  return (
    <>
      {/* header */}
      <Header />
      {/* side pannel */}
      <div className='flex flex-row'>
        {/* main content */}
        <BrowserRouter >
          <SidePannel activePannel={activePannel} setActivePannel={setActivePannel} />
          <main className='flex-1 bg-[#F5F5F5] '>
            <Routes >
              <Route path='/create' index element={<CreatePage />} />
              <Route path="/routines" element={<MainPage text="routines" />} />
              <Route path="/historic" element={<MainPage text="historic" />} />
              <Route path="/groups" element={<MainPage text="groups" />} />
            </Routes>
          </main>

        </BrowserRouter>
      </div>




    </>
  )
}

export default App
