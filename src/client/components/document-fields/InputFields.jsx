import Input from "../account sections/Input";

function InputFields({ fields, removeField }) {
  function generateClassName(inputString) {
    const cleanedString = inputString.replace(/\W+/g, "-").toLowerCase();
    const prefix = "custom-class-";
    const className = `${prefix}${cleanedString}`;
    return className;
  }

  const findLabel = (input) => {
    const labels = document.querySelectorAll("label");
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].htmlFor == input.id) {
        return labels[i];
      }
    }
  };

  function changeInputSelecors(field, input, label) {
    const selector = generateClassName(input.value);
    field.classList.remove(input.id);
    if (field == undefined || input.value == "") {
      document
        .querySelector(".editor")
        .querySelector(`p`)
        .removeChild(field.parentNode);
      label.remove();
      input.remove();
      removeField(input.id);
    } else {
      input.id = selector;
      field.classList.add(selector);
      label.htmlFor = selector;
      label.innerText = input.value;
      field.innerText = input.value;
    }
  }

  function handleInput(e) {
    const input = e.target;
    const label = findLabel(input);
    const field = document.querySelector(`.${input.id}`);
    changeInputSelecors(field, input, label);
  }

  return (
    <div>
      <div>
        <h1>Document fields</h1>
        <div>
          <form>
            {fields.map((field, index) => {
              return (
                <Input
                  placeholder={field}
                  width={"285px"}
                  id={field}
                  span={field}
                  key={index}
                  handleInput={handleInput}
                  defaultValue={field}
                  typeClass={"field-input"}
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
