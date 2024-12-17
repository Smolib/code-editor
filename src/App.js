import "./App.css";
import { useState, useRef, useCallback } from "react";
import Editor from "./Editor";
import { languageNames } from "./Editor";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(languageNames[0]);
  const editorImperativeHandleRef = useRef();

  const handleOnClickRunButton = useCallback((evt) => {
    evt.preventDefault();
    console.log(editorImperativeHandleRef.current.getText());
  }, []);

  return (
    <div className="App">
      <main>
        <Editor
          selectedLanguage={selectedLanguage}
          editorImperativeHandleRef={editorImperativeHandleRef}
        ></Editor>
        <button onClick={handleOnClickRunButton}>RUN</button>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languageNames.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </main>
    </div>
  );
}

export default App;
