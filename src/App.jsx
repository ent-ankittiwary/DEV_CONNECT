// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import Body from "./components/Body";
// import Signup from "./components/Signup";
// import Feed from "./components/Feed";
// import Logout from "./components/Logout";
// import Connection from "./components/Connection";
// import Request from "./components/Request";
// import LandingPage from "./components/LandingPage";

// function App() {
//   return (
//     <div>
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="/" element={<LandingPage/>} />
//           <Route path="/" element={<Body/>}>
//             <Route path="/signup" element={<Signup/>} />
//             <Route path="/login" element={<Login/>} />
//             <Route path="/feed" element={<Feed/>} />
//             <Route path ="/logout" element={<Logout/>}/>
//             <Route path="/profile" element={<Profile/>}/>
//             <Route path="interested/connections" element={<Request/>}/>
//             <Route path="/accepted/connections" element={<Connection/>}/> 
//             <Route path="/*" element={<p>This page doesn't exist</p>}/>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import Body from "./components/Body";
// import Signup from "./components/Signup";
// import Feed from "./components/Feed";
// import Logout from "./components/Logout";
// import Connection from "./components/Connection";
// import Request from "./components/Request";
// import LandingPage from "./components/LandingPage";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// function App() {
//   const user = useSelector((store)=>store.user);
//   return (
//     <BrowserRouter basename="/">
//       <Routes>

//         {/* Public Landing */}
//         <Route
//           path="/"
//           element={
//             user ? <Navigate to="/feed" replace /> : <LandingPage />
//           }
//         />

//         {/* App Layout Routes */}
//         <Route element={<Body />}>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/feed" element={<Feed />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/interested/connections" element={<Request />} />
//           <Route path="/accepted/connections" element={<Connection />} />
//         </Route>

//         {/* 404 */}
//         <Route path="*" element={<p>This page doesn't exist</p>} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Logout from "./components/Logout";
import Connection from "./components/Connection";
import Request from "./components/Request";
import LandingPage from "./components/LandingPage";

function App() {
  const user = useSelector((store) => store.user);

  return (
    <BrowserRouter basename="/">
      <Routes>

        {/* Landing Route Guard */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/feed" replace /> : <LandingPage />
          }
        />

        {/* App Layout */}
        <Route element={<Body />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/interested/connections" element={<Request />} />
          <Route path="/accepted/connections" element={<Connection />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<p>This page doesn't exist</p>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;