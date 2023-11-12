import Input from "./Input";

function FillingDocFields({ fields, userData }) {
  if (fields.length === 0) return;

  function generateClassName(inputString) {
    if (inputString === null) return;
    const cleanedString = inputString
      .replace(/\W+/g, "-")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    const className = cleanedString;
    return className;
  }

  function updateField(field, input) {
    field.innerText = input.value;
  }

  function handleInput(e) {
    const input = e.target;
    const fields = document.querySelectorAll(`.${input.id}`);
    fields.forEach((field) => {
      if (field.classList[5] === input.classList[6]) {
        updateField(field, input);
      }
    });
  }

  function insertUserData(field) {
    const documentFields = Array.from(
      document.querySelectorAll(".react-component")
    );
    documentFields.forEach((documentFiled) => {
      const fieldName = documentFiled.classList[6];
      if (fieldName === field.replaceAll(" ", "")) {
        documentFiled.innerText = userData[field];
        document.querySelector(`#${fieldName}`).value = userData[field];
      }
    });
  }

  return (
    <div className={`w-[285px]`}>
      <h1 className="mb-3">Document fields</h1>
      <div>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => {
            insertUserData(field);
            return (
              <Input
                placeholder={field}
                width={"285px"}
                id={generateClassName(field)}
                key={index}
                handleInput={handleInput}
                typeClass={`field-input index-${index}`}
                defaultValue={userData[field]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FillingDocFields;
