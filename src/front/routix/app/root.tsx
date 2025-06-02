import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const Pannels = {
  CREATE: '',
  ROUTINES: 'routines',
  HISTORIC: 'historic',
  GROUPS: 'groups',
} as const;

// export function App() {
//   const [activePannel, setActivePannel] = useState(Pannels.CREATE as string);

//   return (
//     <>
//       <div className='h-screen overflow-hidden'>
//         <Header />
//         <div className='flex flex-row h-[calc(100vh-4rem)]'>
//           <BrowserRouter> 
//             <Routes>
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/signup" element={<SignupPage />} /> 
//               <Route path="/app/*" element={ 
//                 <>
//                   <SidePannel activePannel={activePannel} setActivePannel={setActivePannel} />
//                   <main className='flex-1 bg-[#F5F5F5] '>
//                     <Routes> 
//                       <Route path="/" element={<CreatePage />} /> 
//                       <Route path="routines" element={<RoutinesPage text="routines" />} /> 
//                       <Route path="historic" element={<HistoricPage />} /> 
//                       <Route path="groups" element={<GroupsPage />} /> 
//                     </Routes>
//                   </main>
//                 </>
//               } />

//               <Route path="*" element={<LoginPage />} /> 

//             </Routes>
//           </BrowserRouter>
//         </div>
//       </div>
//     </>
//   );
// }

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
