import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Main from "./pages/Main";
import Documents from "./pages/Documents";
import TemplaytesGaliery from "./pages/TemplaytesGaliery";
import Profile from "./pages/Profile";
import AccountSettings from "./components/account sections/AccountSettings";
import SignUp from "./components/Popups/SignUp";
import SignIn from "./components/popups/SignIn";
import Account from "./components/account sections/Account";

function App() {
  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch("/sayHello");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body.text);
    return body.text;
  };

  // получение GET маршрута с сервера Express, который соответствует GET из server.js
  useEffect(() => {
    callBackendAPI()
      .then((res) => setState(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route path="documents" element={<Documents />}>
              <Route path="templates" element={<TemplaytesGaliery />} />
            </Route>
            <Route path="account" element={<Account />}>
              <Route path="settings" element={<AccountSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
