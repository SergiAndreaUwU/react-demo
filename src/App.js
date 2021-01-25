import { useEffect, useState } from "react";
import "./App.css";

function App() {
  useEffect(() => {}, []);

  const [defaultCheck, setDefaultCheck] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("submitted!", e);
  // };

  const onClick = (e) => {
    console.log(e);
    console.log(defaultCheck);

    setDefaultCheck(!defaultCheck);

    console.log(defaultCheck);
  };

  return (
    <div className="App">
      {/* <form className="formularioxd" onSubmit={handleSubmit}>
        <input className="inputxd" type="text"/>
        <button className="buttonxd">submit button</button>
        </form> */}
      <div className="toggle-btn sm">
        <input
          id="1"
          className="toggle-input round"
          type="checkbox"
          defaultChecked={defaultCheck}
          onClick={(e) => onClick(e.target)}
        />
        <p style={{ color: "red" }}>{defaultCheck && <label>hola</label>}</p>
      </div>
    </div>
  );
}

export default App;
