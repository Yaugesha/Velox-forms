import { useTemplate } from "../contexts/TemplateContext";
import DocumentHeader from "../components/header/DocumentHeader";
import TemplateCategory from "../components/documents/TemplateCategory";

function TemplatesGaliery() {
  const { templateCategories } = useTemplate();

  return (
    <div>
      <div className="fixed w-[980px] h-24 bg-white"></div>
      <DocumentHeader width="980px" page="Templates gallery" position="fixed" />
      <main className="w-full flex flex-col items-center pt-24">
        {templateCategories !== undefined && (
          <div className="w-[980px] flex flex-col justify-between gap-8">
            {templateCategories.map((category) => {
              return <TemplateCategory category={category} key={category.id} />;
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default TemplatesGaliery;
