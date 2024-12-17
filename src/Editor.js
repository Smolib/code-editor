import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

import { useRef, useEffect } from "react";

export let languageMap = new Map([
  ['JavaScript', javascript],
  ['Python', python],
]);
  

function Editor({ selectedLanguage }) {
  const languageSelect = useRef(new Compartment());
  const editorItem = useRef();
  const editorParentRef = useRef();

  useEffect (() => {
    if (!editorItem.current) {
      editorItem.current = new EditorView({
        doc: "hello",
        extensions: [basicSetup, languageSelect.current.of(javascript())],
        parent: editorParentRef.current,
      });
    }
  }, [])

  useEffect(() => {
      editorItem.current.dispatch({
        effects: languageSelect.current.reconfigure(languageMap.get(selectedLanguage)()),
      });
  }, [selectedLanguage]);

  return <div ref={editorParentRef}></div>;
}

export default Editor;
