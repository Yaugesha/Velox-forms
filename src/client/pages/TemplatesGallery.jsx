import { useDocuments } from "../contexts/DocumentsContext";
import DocumentHeader from "../components/header/DocumentHeader";
import TemplateCategory from "../components/documents/TemplateCategory";

function TemplatesGaliery() {
  const { templateCategories } = useDocuments();

  return (
    <div>
      <div className="fixed w-[980px] h-24 bg-white"></div>
      <DocumentHeader width="980px" page="Templates gallery" position="fixed" />
      <main className="pt-24">
        {templateCategories !== undefined && (
          <div className="w-[980px] flex flex-col justify-between gap-8">
            {templateCategories.map((category) => {
              return (
                <TemplateCategory category={category} key={category.title} />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default TemplatesGaliery;
