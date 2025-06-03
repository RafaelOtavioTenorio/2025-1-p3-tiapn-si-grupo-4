import MainPage from "~/components/MainPage";
import type { Route as r } from "../../types/app/+types/root";
import Header from "~/components/header";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import CreatePage from "~/components/CreatePage";
import RoutinesPage from "~/components/CreatePage";
import HistoricPage from "~/components/HistoricPage";
import GroupsPage from "~/components/GroupsPage";
import SidePannel from "~/components/SidePannel";

export const Pannels = {
  CREATE: '',
  ROUTINES: 'routines',
  HISTORIC: 'historic',
  GROUPS: 'groups',
} as const;


export function meta({ }: r.MetaArgs) {
  return [
    { title: "ROUTIX" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function () {
  const [activePannel, setActivePannel] = useState(Pannels.CREATE as string);
  return (
    <>
      <div className='h-screen overflow-hidden'>
        <Header />
        <div className='flex flex-row h-[calc(100vh-4rem)]'>
          <BrowserRouter> 
            <Routes>
              <Route path="/app/*" element={ 
                <>
                  <SidePannel activePannel={activePannel} setActivePannel={setActivePannel} />
                  <main className='flex-1 bg-[#F5F5F5] '>
                    <Routes> 
                      <Route path="/" element={<CreatePage  />} /> 
                      <Route path="routines" element={<RoutinesPage/>} /> 
                      <Route path="historic" element={<HistoricPage />} /> 
                      <Route path="groups" element={<GroupsPage />} /> 
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}
