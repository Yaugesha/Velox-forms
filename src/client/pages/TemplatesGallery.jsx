import { useEffect, useState } from "react";
import Template from "../components/documents/TemplateCard";
import DocumentHeader from "../components/header/DocumentHeader";

function TemplatesGaliery() {
  const [templates, setTemplates] = useState([]);

  useEffect(function () {
    const jwt = localStorage.getItem("jwt");
    const getTemplates = async () => {
      const response = await fetch("/api/v1/templates/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: jwt,
        }),
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw Error(result.message);
      }
      setTemplates([...result.templates]);
    };

    getTemplates();
  }, []);

  return (
    <div>
      <div className="fixed w-[980px] h-24 bg-white"></div>
      <DocumentHeader width="980px" page="Templates gallery" position="fixed" />
      <main className="pt-24">
        <div className="w-[980px] flex flex-col justify-between gap-8">
          {templates.map((template) => {
            return (
              <div key={template.category}>
                <h4 className="flex mb-5 ml-2 leading-6 text-base">
                  {template.category}
                </h4>
                <div className="flex flex-wrap gap-5">
                  {template.templates.map((template) => {
                    return (
                      <Template
                        title={template.title}
                        description={template.description}
                        picture={template.picture}
                        link={`../${template.link}`}
                        key={template.title}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default TemplatesGaliery;
