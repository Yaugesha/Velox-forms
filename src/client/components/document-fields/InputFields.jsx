import { useContext, useRef } from "react";
import Input from "./Input";
import DocumentContext from "../../contexts/DocumentContext";

function InputFields({ display, isTemplate }) {
  const context = useContext(DocumentContext);

  if (context.fields.length === 0) return;
  const inputs = useRef(context.fields);
  console.log(inputs);
  function updateFieldsArray(input) {
    const inputIndex = input.classList[6].split("-")[1];
    const newFields = context.fields.map((field, index) => {
      if (index == inputIndex) {
        return input.value;
      } else return field;
    });
    context.setFields(newFields);
  }

  function generateClassName(inputString) {
    const cleanedString = inputString
      .replace(/\W+/g, "-")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    const className = cleanedString;
    return className;
  }

  function changeInputSelecors(field, input) {
    if (field == undefined || input.value == "") {
      deleteFieldWithInput(field, input);
    } else {
      updateField(field, input);
    }
  }

  function updateField(field, input) {
    field.classList.remove(input.id);
    field.classList.add(generateClassName(input.value));
    field.innerText = input.value;
  }

  function deleteFieldWithInput(field, input) {
    document
      .querySelector(".editor")
      .querySelector(`p`)
      .removeChild(field.parentNode);
    input.remove();
    context.removeField(input.id);
    const label = document.querySelector(`.${input.id}_label`);
    label ? (label.outerHTML = "") : "";
  }

  function handleInput(e) {
    const input = e.target;
    const fields = document.querySelectorAll(`.${input.id}`);
    fields.forEach((field) => {
      if (field.classList[5] === input.classList[6]) {
        changeInputSelecors(field, input);
      }
    });
    updateFieldsArray(input);
  }

  function handleAddField(field) {
    context.editor
      .chain()
      .focus()
      .insertContent(`<field>${field}</field>&nbsp;`)
      .run();
  }

  return (
    <div className={`w-[285px] ${display}`}>
      <h1 className="mb-3">Document fields</h1>
      <div>
        <div className="flex flex-col gap-3">
          {context.fields.map((field, index) => {
            return (
              <Input
                placeholder={field}
                width={"285px"}
                id={field}
                key={index}
                handleInput={handleInput}
                defaultValue={inputs.current[index]}
                typeClass={`field-input index-${index}`}
                buttonHandler={handleAddField}
                isTemplate={isTemplate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InputFields;
