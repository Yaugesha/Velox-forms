import Editor from "../components/text-editor/Editor";
import Input from "../components/account sections/Input";
import { useState } from "react";

function Document() {
  const [fields, setFields] = useState([]);

  function addField(newField) {
    setFields([...fields, newField]);
  }
  function removeField(fieldToRemove) {
    setFields(fields.filter((field) => field !== fieldToRemove));
  }

  function handleInput(e) {
    const value = document.querySelector(`.field`);
    console.log(e.target.value);
    if (value == undefined || e.target.value == "") {
      e.target.remove();
      removeField(e.target.placeholder);
    }
    value.innerText = e.target.value;
  }

  return (
    <div className="w-[1280px] flex justify-between">
      <Editor fields={fields} setField={addField} />
      <div>
        <h1>Document fields</h1>
        <div>
          <form>
            {fields.map((field) => {
              return (
                <Input
                  placeholder={field}
                  width={"285px"}
                  id={field}
                  span={field}
                  key={field}
                  handleInput={handleInput}
                />
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Document;
