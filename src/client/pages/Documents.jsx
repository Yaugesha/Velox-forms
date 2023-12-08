import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useDocuments } from "../contexts/DocumentsContext";
import { useTemplate } from "../contexts/TemplateContext";
import Header from "../components/header/Header";
import Footer from "../components/footers/Footer";
import TemplatesSection from "../components/documents/TemplatesSection";
import DocumentsSection from "../components/documents/DocumentsSection";

function Documents() {
  const { getDocuments } = useDocuments();
  const { getRecentTemplates, getTemplates } = useTemplate();

  useEffect(function () {
    getRecentTemplates();
    getDocuments();
    getTemplates();
  }, []);

  const location = useLocation();
  return (
    <>
      {location.pathname.split("/")[2] !== undefined ? (
        <Outlet />
      ) : (
        <div className="min-h-full flex flex-col">
          <Header isAuthorized={true} page={"Documents"} />
          <main className="w-full flex flex-auto flex-col items-center">
            <TemplatesSection />
            {/* {documents.length === 0 ? (
              <p className="alig text-xl">
                You haven't created any documents yet. Select a template and
                fill it out to create your first document using Velox Forms. Or,
                if you don't find one that suits you, you can apply for a new
                template to be created on your profile.
              </p>
            ) : ( */}
            <DocumentsSection />
            {/* )} */}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Documents;
