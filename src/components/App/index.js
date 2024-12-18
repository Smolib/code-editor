import "./App.css";

import { useState, useRef } from "react";
import Editor from "../Editor";
import { languageNames } from "../Editor";
import { post } from "../../utils/api";
import { serverResponses } from "../../utils/api";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(languageNames[0]);
  const [codeCheckTheme, setCodeCheckTheme] = useState({
    color: "white",
    text: "Здесь будет результат работы вашего кода",
  });
  const [textResponse, setTextResponse] = useState([""]);
  const [isRunButtonClicked, setIsRunButtonClicked] = useState(false);

  const editorRef = useRef();

  const handleOnClickRunButton = (evt) => {
    evt.preventDefault();

    setTextResponse([""]);
    setCodeCheckTheme({
      color: "yellow",
      text: "Сервер старательно проверяет ваш код, подождем...",
    });
    setIsRunButtonClicked(true);

    console.log(editorRef.current.getText());
    post({
      code: editorRef.current.getText(),
      language: selectedLanguage,
    })
      .then((res) => {
        if (res.status === serverResponses.success) {
          setCodeCheckTheme({
            color: "green",
            text: "У вас получилось! Вы невероятно круты! Вот ваш код, который смог:",
          });
          console.log(res);
          setTextResponse([...res.output]);
        } else {
          setCodeCheckTheme({
            color: "red",
            text: "Увы, не в этот раз. Старайтесь, у вас получится!",
          });
          setTextResponse([res.error]);
        }
      })
      .then(() => setIsRunButtonClicked(false));
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">Здесь мы научим вас магии!</h1>
      </header>
      <main className="main">
        <div className="main__wrapper">
          <div className="main__wrapper-task">
            <div className="main__wrapper-task-buttons">
              <select
                className="main__button"
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
              <button
                className="main__button"
                disabled={isRunButtonClicked}
                onClick={handleOnClickRunButton}
              >
                RUN
              </button>
            </div>
            <div className="main__wrapper-task-text">
              <h2 className="main__title-task">
                Выполните сложное первое задание
              </h2>
              <p className="main__description-task">
                Ваша задача - написать такой код, который сможет победить рандом
                на сервере и выдать успешный результат.
              </p>
              <p className="main__description-task">
                Выбирайте язык, пишите код, нажимайте кнопку Run и ожидайте.
              </p>
              <p className="main__description-task">
                И да пребудет с вами удача!
              </p>
            </div>
          </div>
          <Editor ref={editorRef} selectedLanguage={selectedLanguage}></Editor>
        </div>
        <p
          className={`main__sucess-response main__success-response_color_${codeCheckTheme.color}`}
        >
          {codeCheckTheme.text}
        </p>
        <pre className="main__text-response-code">
          <code>{textResponse.join("\n")}</code>
        </pre>
      </main>
    </>
  );
}

export default App;
