import Input from "../account sections/Input";

function InputFields({ fields, removeField }) {
  const findLabel = (input) => {
    const labels = document.querySelectorAll("label");
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].htmlFor == input.id) {
        return labels[i];
      }
    }
  };

  function changeInputSelecors(field, input, label) {
    const clas = input.value;
    field.classList.remove(input.id);
    if (field == undefined || input.value == "") {
      document.querySelector(".editor").querySelector(`p`).removeChild(field);
      label.remove();
      input.remove();
      removeField(input.id);
    } else {
      // if (input.value.includes(" ")) {
      //   const identificator = input.value.split(" ").join("-");
      //   input.id = identificator;
      //   field.classList.add(identificator);
      //   label.htmlFor = identificator;
      // } else {
      input.id = hash; //input.value;
      field.classList.add(hash); //input.value);
      label.htmlFor = hash; //input.value;
      //}
    }
  }

  function alphanumericInput(input, label, field) {
    let letters = /^[0-9a-zA-Z]+$/;
    if (input.value.match(letters) || input.value == "" || input.value == " ") {
      changeInputSelecors(field, input, label);
      label.innerText = input.value;
      input.placeholder = input.value;
      if (input.value !== "") field.innerText = input.value;
    } else input.value = input.value.slice(0, -1);
  }

  function handleInput(e) {
    const input = e.target;
    const label = findLabel(input);
    const field = document.querySelector(`.${input.id}`);
    changeInputSelecors(field, input, label);
    //alphanumericInput(input, label, field);
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
                  pattern={" "}
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
