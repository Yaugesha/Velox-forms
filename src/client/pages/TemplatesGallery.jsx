import { useTemplate } from "../contexts/TemplateContext";
import { useBubbleMenu } from "../contexts/BubbleMenuContext";
import DocumentHeader from "../components/header/DocumentHeader";
import Footer from "../components/footers/Footer";
import TemplateCategory from "../components/documents/TemplateCategory";
import BubbleMenu from "../components/modals/bubble-menus/BubbleMenu";

function TemplatesGaliery() {
  const { templateCategories } = useTemplate();
  const { bubbleMenu } = useBubbleMenu();

  return (
    <div className="min-h-full flex flex-col">
      <div className="fixed w-[980px] h-24 bg-white"></div>
      <DocumentHeader width="980px" page="Templates gallery" position="fixed" />
      <main className="w-full flex flex-col flex-auto items-center pt-24">
        {templateCategories !== undefined && (
          <div className="w-[980px] flex flex-col justify-between gap-8">
            {templateCategories.map((category) => {
              return <TemplateCategory category={category} key={category.id} />;
            })}
          </div>
        )}
        {bubbleMenu.isOpen && <BubbleMenu />}
      </main>
      <Footer />
    </div>
  );
}

export default TemplatesGaliery;
