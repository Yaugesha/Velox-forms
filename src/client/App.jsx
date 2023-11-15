import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Main from "./pages/Main";
import Documents from "./pages/Documents";
import TemplatesGallery from "./pages/TemplatesGallery";
import Profile from "./pages/Profile";
import AccountSettings from "./components/account sections/AccountSettings";
import SignUp from "./components/popups/SignUp";
import SignIn from "./components/popups/SignIn";
import Account from "./components/account sections/Account";
import AccountUpdateData from "./components/account sections/AccountUpdateData";
import SignOut from "./components/popups/SignOut";
import Document from "./pages/Document";
import DocumentFile from "./pages/DocumentFile";
import Template from "./pages/Template";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { observer } from "mobx-react";
import authStore from "./stores/authStore";
import Applications from "./components/account sections/Applications";

const App = observer(() => {
  // useEffect(function () {
  //   const jwt = localStorage.getItem("jwt");
  //   //if (jwt === null) return;
  //   const callBackendAPI = async () => {
  //     const response = await fetch("/api/v1/users/check-auth", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //       },
  //       body: JSON.stringify({
  //         jwt: jwt,
  //       }),
  //     });
  //     const result = await response.json();

  //     if (response.status !== 200) {
  //       throw Error(result.message);
  //     }
  //     localStorage.setItem("jwt", result.jwt);
  //     const role = jwtDecode(result.jwt).role;
  //     authStore.login();
  //     authStore.setRole(role);
  //   };
  //   callBackendAPI();
  // });

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />
          </Route>
          <Route path="documents" element={<Documents />}>
            <Route path="templates" element={<TemplatesGallery />} />
            <Route path="template" element={<Template />} />
            <Route path="document" element={<Document />} />
            <Route path="documentFile" element={<DocumentFile />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route path="account" element={<Account />}>
              <Route path="settings" element={<AccountSettings />} />
              <Route path="applications" element={<Applications />} />
              <Route path="security&password" element={<AccountUpdateData />} />
              <Route path="signOut" element={<SignOut />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
});

export default App;
