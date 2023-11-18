import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Main from "./pages/Main";
import Documents from "./pages/Documents";
import TemplatesGallery from "./pages/TemplatesGallery";
import Profile from "./pages/Profile";
import ProfileSettings from "./components/profile-sections/ProfileSettings";
import SignUp from "./components/popups/SignUp";
import SignIn from "./components/popups/SignIn";
import ProfileUpdateData from "./components/profile-sections/ProfileUpdateData";
import SignOut from "./components/popups/SignOut";
import Document from "./pages/Document";
import DocumentFile from "./pages/DocumentFile";
import Template from "./pages/Template";
import { AuthProvider } from "./contexts/AuthContext";
import CreateApplication from "./components/profile-sections/applications/CreateApplication";
import { DocunentsProvider } from "./contexts/DocumentsContext";
import ApplicationsHistory from "./components/profile-sections/applications/ApplicationsHistory";
import Applications from "./components/profile-sections/applications/Applications";

function App() {
  return (
    <AuthProvider>
      <DocunentsProvider>
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
              <Route index element={<Navigate to="settings" />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="security&password" element={<ProfileUpdateData />} />
              <Route path="signOut" element={<SignOut />} />
              <Route path="applications" element={<Applications />}>
                <Route path="create" element={<CreateApplication />} />
                <Route path="history" element={<ApplicationsHistory />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DocunentsProvider>
    </AuthProvider>
  );
}

export default App;
