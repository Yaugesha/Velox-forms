import { useContext } from "react";
import Input from "../account sections/Input";
import DocumentContext from "../../contexts/DocumentContext";

function InputFields({ display }) {
  const context = useContext(DocumentContext);

  if (context.fields.length === 0) return;

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
    const cleanedString = inputString.replace(/\W+/g, "-").toLowerCase();
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
    context.removeField(input.id);
    input.remove();
  }

  function handleInput(e) {
    const input = e.target;
    const fields = document.querySelectorAll(`.${input.id}`);
    updateFieldsArray(input);
    fields.forEach((field) => {
      if (field.classList[5] === input.classList[6]) {
        changeInputSelecors(field, input);
      }
    });
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
        <form className="flex flex-col gap-3">
          {context.fields.map((field, index) => {
            return (
              <Input
                placeholder={field}
                width={"285px"}
                id={field}
                span={field}
                key={index}
                handleInput={handleInput}
                //defaultValue={field}
                typeClass={`field-input index-${index}`}
                buttonHandler={handleAddField}
              />
            );
          })}
        </form>
      </div>
    </div>
  );
}

export default InputFields;
