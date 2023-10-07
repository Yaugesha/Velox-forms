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
    const input = e.target
    const labels = document.querySelectorAll('label');
    const findLabel = (input) => {
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == input.id) {
          return labels[i];
        }
      }
    }
    const label = findLabel(input)
    const field = document.querySelector(`.${input.id}`);
    field.classList.remove(input.id)
    if (field == undefined || input.value == "") {
      input.remove();
      removeField(input.id);
    }
    else {
      label.htmlFor = input.value
      label.innerText = input.value
      input.id = input.value
      input.placeholder = input.value 
      field.innerText = input.value;
      field.classList.add(input.value)
   }
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
