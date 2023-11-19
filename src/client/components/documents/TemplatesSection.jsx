import { Link } from "react-router-dom";
import TemplateCard from "./TemplateCard";
import { useTemplate } from "../../contexts/TemplateContext";

function TemplatesSection() {
  const { templates } = useTemplate();

  return (
    <section className="mb-8 w-[980px] flex flex-col items-center">
      <div className="w-[980px] flex justify-between items-center mt-10 mb-5">
        <div>
          <h3>Create new document</h3>
        </div>
        <div className="flex justify-between items-center gap-8">
          <Link to="templates">
            <div className="flex w-[154px] gap-x-2.5">
              Templates gallery
              <img
                src="/src/client/assets/icons/general/icon-arrows.svg"
                alt="t"
              />
            </div>
          </Link>
          <img
            className="h-6 cursor-pointer"
            src="/src/client/assets/icons/general/icon-more.svg"
            alt="show more"
          />
        </div>
      </div>
      {templates !== undefined && (
        <div className="w-[980px] flex gap-5 mb-7">
          {templates.map((template) => {
            return <TemplateCard template={template} key={template.title} />;
          })}
        </div>
      )}
    </section>
  );
}

export default TemplatesSection;
