import Header from "~/components/header";
import SidePannel from "~/components/SidePannel";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Route as r } from "../../types/app/+types/root";
import CreatePage from "~/components/CreatePage";
import RoutinesPage from "~/components/CreatePage";
import HistoricPage from "~/components/HistoricPage";
import GroupsPage from "~/components/GroupsPage";

export const Pannels = {
  CREATE: 'create',
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

export default function Home() {
  const [activePannel, setActivePannel] = useState(Pannels.CREATE as string);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")
    if (!token) {
      navigate("/login")
    }
  }, [navigate]);


  useEffect(() => {
    console.log(activePannel)
      navigate(`/app/${activePannel}`)
  }, [activePannel]);


  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <div className='flex flex-row h-[calc(100vh-4rem)]'>
        <SidePannel activePannel={activePannel} setActivePannel={setActivePannel} />
        <main className='flex-1 bg-[#F5F5F5]'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
