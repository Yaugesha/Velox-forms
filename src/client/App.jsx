import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Main from "./pages/Main";
import Documents from "./pages/Documents";
import TemplaytesGaliery from "./pages/TemplaytesGaliery";
import Profile from "./pages/Profile";
import AccountSettings from "./components/account sections/AccountSettings";
import SignUp from "./components/popups/SignUp";
import SignIn from "./components/popups/SignIn";
import Account from "./components/account sections/Account";
import AccountUpdateData from "./components/account sections/AccountUpdateData";
import SignOut from "./components/popups/SignOut";
import Document from "./pages/Document";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
        </Route>
        <Route path="documents" element={<Documents />}>
          <Route path="templates" element={<TemplaytesGaliery />} />
          <Route path="document" element={<Document />} />
        </Route>
        <Route path="profile" element={<Profile />}>
          <Route path="account" element={<Account />}>
            <Route path="settings" element={<AccountSettings />} />
            <Route path="security&password" element={<AccountUpdateData />} />
            <Route path="signOut" element={<SignOut />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
