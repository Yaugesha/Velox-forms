import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Main from "./pages/Main";
import Documents from "./pages/Documents";
import TemplatesGallery from "./pages/TemplatesGallery";
import Profile from "./pages/Profile";
import ProfileSettings from "./components/profile-sections/ProfileSettings";
import SignUp from "./components/modals/auth/SignUp";
import SignIn from "./components/modals/auth/SignIn";
import ProfileUpdateData from "./components/profile-sections/ProfileUpdateData";
import Document from "./pages/Document";
import DocumentFile from "./pages/DocumentFile";
import Template from "./pages/Template";
import { AuthProvider } from "./contexts/AuthContext";
import CreateApplication from "./components/applications/CreateApplication";
import { DocunentsProvider } from "./contexts/DocumentsContext";
import ApplicationsHistory from "./components/applications/ApplicationsHistory";
import ProfileApplications from "./components/profile-sections/ProfileApplications";
import Users from "./pages/Users";
import Applications from "./pages/Applications";
import { TemplatesProvider } from "./contexts/TemplateContext";
import { ApplicationProvider } from "./contexts/ApplicationsContext";
import ApplicationProcessing from "./pages/ApplicationProcessing";
import ProfileExit from "./components/profile-sections/ProfileExit";
import { BubbleMenuProvider } from "./contexts/BubbleMenuContext";

function App() {
  return (
    <AuthProvider>
      <BubbleMenuProvider>
        <TemplatesProvider>
          <DocunentsProvider>
            <ApplicationProvider>
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
                    <Route
                      path="security&password"
                      element={<ProfileUpdateData />}
                    />
                    <Route path="exit" element={<ProfileExit />} />
                    <Route
                      path="applications"
                      element={<ProfileApplications />}
                    >
                      <Route index element={<Navigate to="history" />} />
                      <Route path="create" element={<CreateApplication />} />
                      <Route path="history" element={<ApplicationsHistory />} />
                    </Route>
                  </Route>
                  <Route path="users" element={<Users />} />
                  <Route path="applications" element={<Applications />}>
                    <Route
                      path="processing"
                      element={<ApplicationProcessing />}
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ApplicationProvider>
          </DocunentsProvider>
        </TemplatesProvider>
      </BubbleMenuProvider>
    </AuthProvider>
  );
}

export default App;
