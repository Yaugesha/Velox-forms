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
    const input = e.target;
    const labels = document.querySelectorAll("label");
    const findLabel = (input) => {
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == input.id) {
          return labels[i];
        }
      }
    };
    const label = findLabel(input);
    const field = document.querySelector(`.${input.id}`);
    field.classList.remove(input.id);
    if (field == undefined || input.value == "") {
      field.remove();
      label.remove();
      input.remove();
      removeField(input.id);
    } else {
      if (input.value.includes(" ")) {
        const identificator = input.value.split(" ").join("-");
        input.id = identificator;
        field.classList.add(identificator);
        label.htmlFor = identificator;
      } else {
        input.id = input.value;
        field.classList.add(input.value);
        label.htmlFor = input.value;
      }
      label.innerText = input.value;
      input.placeholder = input.value;
      field.innerText = input.value;
    }
  }

  return (
    <div className="absolute top-0 w-[1280px] flex justify-between bg-white">
      <Editor fields={fields} setField={addField} unsetField={removeField} />
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
                  defaultValue={field}
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
