import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";

import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar"
import Dashboard from "./scenes/dashboard"
import FAQ from "./scenes/faq"
import { useAuthContext } from "./context/AuthContext";
import RenewPassword from "./scenes/renewPassword";
import Welcome from "./scenes/welcome";
import DegreeForm from "./components/forms/DegreeForm"
import DegreeBoard from "./scenes/degree";
import DegreeProfile from "./scenes/degree/degreeProfile";
import SignupForm from "./components/forms/SignupForm";
import LoginForm from "./components/forms/LoginForm";
import useLogout from "./hooks/useLogout";
import UploadDownload from "./devTest/uploadDownload";
import StudentProfile from "./components/profilePages/StudentProfile";
import AllDegree from "./scenes/dashboard/AllDegree";
import GlobalUploadPage from "./devTest/GlobalUploadPage";


function App() {
  const [theme, colorMode] = useMode()
  const {authUser } = useAuthContext()
  const { logout } = useLogout()
  const location = useLocation();

  const handleLogout = () => {
    logout().then(r => console.log("User logged out successfully"))
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {authUser && location.pathname !== '/welcome' ? <Sidebar /> : undefined}
          <main className="content">
            {location.pathname !== '/welcome' && <Topbar logOut={handleLogout} />}
            <Routes>

              <Route path="/task" element={authUser ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path="/allDegrees" element={authUser ? <AllDegree /> : <Navigate to='/login' />} />

              <Route path="/uploadPage" element={ <UploadDownload /> } />
              <Route path="/globalLink" element={ <GlobalUploadPage /> } />
              <Route path="/welcome" element={authUser ? <Welcome />: <Navigate to='/login' />} />
              <Route path="/renew" element={authUser ? <Navigate to='/' /> : <RenewPassword/>} />
              <Route path="/signup" element={<SignupForm/>} />
              <Route path="/login" element={authUser ? <Navigate to='/' /> : <LoginForm/>} />
              <Route path="/add-degree" element={authUser ? <DegreeForm /> : <Navigate to='/login' /> } />
              <Route path="/faq" element={authUser ? <FAQ /> : <Navigate to='/' /> } />
              <Route path="/task/:degreeYear" element={authUser ? <DegreeBoard /> : <Navigate to='/login' /> } />
              <Route path="/task/:degreeYear/:degreeId" element={authUser ? <DegreeProfile /> : <Navigate to='/login' /> } />
              <Route path="/task/:degreeYear/:degreeId/:studentId" element={authUser ? <StudentProfile /> : <Navigate to='/login' /> } />
              <Route path="/*" element={<Navigate to='/task' />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
