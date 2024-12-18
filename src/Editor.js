import "./Editor.css";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

import { useRef, useEffect, useImperativeHandle } from "react";

// Map в том числе необходим для проверки, что Editor не получит язык, с которым не умеет обращаться
const languageMap = new Map([
  ["JavaScript", javascript],
  ["Python", python],
]);

export const languageNames = [...languageMap.keys()];

function Editor({ selectedLanguage, ref }) {
  const languageSelectCompartmentRef = useRef(new Compartment());
  const editorItemRef = useRef();
  const editorDivParentRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        getText: () => editorItemRef.current.state.doc.text,
      };
    },
    [editorItemRef]
  );

  useEffect(() => {
    if (!editorItemRef.current) {
      editorItemRef.current = new EditorView({
        doc: `Пишите свой великолепный код здесь!
Например, можете написать:
console.log('Hello, world!')`,
        extensions: [
          basicSetup,
          EditorView.lineWrapping,
          languageSelectCompartmentRef.current.of(
            languageMap.get(selectedLanguage)()
          ),
        ],
        parent: editorDivParentRef.current,
      });
    }
    editorItemRef.current.dispatch({
      effects: languageSelectCompartmentRef.current.reconfigure(
        languageMap.get(selectedLanguage)()
      ),
    });
  }, [selectedLanguage]);

  return <div className="editor" ref={editorDivParentRef}></div>;
}

export default Editor;
