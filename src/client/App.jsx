import { useState, useEffect } from "react";
import "./index.css";
import Main from "./pages/Main";
import Documents from "./pages/Documents";

function App() {
  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch("/sayHello");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body.text);
    return body.text;
  };

  // получение GET маршрута с сервера Express, который соответствует GET из server.js
  useEffect(() => {
    callBackendAPI()
      .then((res) => setState(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* <Main /> */}
      <Documents />
    </>
  );
}

export default App;
