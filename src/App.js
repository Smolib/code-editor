import "./App.css";
import { useState, useRef } from "react";
import Editor from "./Editor";
import { languageNames } from "./Editor";
import { post } from "./utils/utils";
import { serverResponses } from "./utils/utils";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(languageNames[0]);
  const [isCodeCheckSuccess, setIsCodeCheckSuccess] = useState(false);
  const [textResponse, setTextResponse] = useState("");
  const [isRunButtonClicked, setIsRunButtonClicked] = useState(false);

  const editorImperativeHandleRef = useRef();

  const handleOnClickRunButton = (evt) => {
    evt.preventDefault();
    setTextResponse("Сервер старательно проверяет ваш код, подождем...");
    setIsRunButtonClicked(true);

    post({
      code: editorImperativeHandleRef.current.getText(),
      language: selectedLanguage,
    })
      .then((res) => {
        setIsCodeCheckSuccess(res.status === serverResponses.success);
        console.log(res.status);
        setTextResponse(res.output);
      })
      .then(() => setIsRunButtonClicked(false));
  };

  return (
    <div className="App">
      <main>
        <Editor
          selectedLanguage={selectedLanguage}
          editorImperativeHandleRef={editorImperativeHandleRef}
        ></Editor>
        <button disabled={isRunButtonClicked} onClick={handleOnClickRunButton}>
          RUN
        </button>
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
        <p>{textResponse}</p>
      </main>
    </div>
  );
}

export default App;
