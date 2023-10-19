import Input from "../account sections/Input";

function InputFields({ editor, fields, rewriteFields, removeField }) {
  function updateFieldsArray(input) {
    const newFields = fields.map((field) => {
      console.log(field, input.id);
      if (field === input.id) {
        return input.value;
      } else return field;
    });
    rewriteFields(newFields);
  }

  function generateClassName(inputString) {
    const cleanedString = inputString.replace(/\W+/g, "-").toLowerCase();
    //const prefix = "custom-class-";
    const className = cleanedString; //`${prefix}${cleanedString}`;
    return className;
  }

  function changeInputSelecors(field, input) {
    if (field == undefined || input.value == "") {
      deleteFieldWithInput(field, input);
    } else {
      //updateFieldInput(input)
    }
  }

  function updateField(field, input) {
    field.classList.remove(input.id);
    field.classList.add(generateClassName(input.value));
    field.innerText = input.value;
  }

  // function updateFieldInput(input) {
  //   const labelContainer = document.querySelector(`.${input.id}_label`)
  //   labelContainer.classList.remove(`${input.id}_label`)
  //   input.id = generateClassName(input.value);
  //   const label = labelContainer.firstChild;
  //   label.htmlFor = input.id;
  //   label.innerText = input.value;
  //   labelContainer.classList.add(`${input.id}_label`)
  // }

  function deleteFieldWithInput(field, input) {
    document
      .querySelector(".editor")
      .querySelector(`p`)
      .removeChild(field.parentNode);
    document.querySelector(`.${input.id}_label`).remove();
    input.remove();
    removeField(input.id);
  }

  function handleInput(e) {
    const input = e.target;
    const prevInputValue = input.id;
    const fields = document.querySelectorAll(`.${input.id}`);
    updateFieldsArray(input);
    changeInputSelecors(fields[0], input);
    fields.forEach((field) => {
      if (field.textContent === prevInputValue) {
        updateField(field, input);
      }
    });
  }

  function handleAddField(field) {
    editor.chain().focus().insertContent(`<field>${field}</field>&nbsp;`).run();
  }

  return (
    <div>
      <div>
        <h1>Document fields</h1>
        <div>
          <form>
            {fields.map((field, index) => {
              console.log(field + index);
              return (
                <Input
                  placeholder={field}
                  width={"285px"}
                  id={field}
                  span={field}
                  key={index}
                  handleInput={handleInput}
                  //defaultValue={field}
                  typeClass={"field-input"}
                  buttonHandler={handleAddField}
                />
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputFields;
