import "./App.css";
import { useState } from "react";
import Editor from "./Editor";
import { languageMap } from "./Editor";

function App() {
  const languages = [...languageMap.keys()];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  return (
    <div className="App">
      <main>
        <Editor selectedLanguage={selectedLanguage}></Editor>
        <button>ЖМИ</button>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((item) => {
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
