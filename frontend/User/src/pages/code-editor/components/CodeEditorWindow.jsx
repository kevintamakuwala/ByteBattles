import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  
  return (
    <div className="overlay border-2 border-gray-600 rounded-lg overflow-hidden  h-full mx-2 shadow-4xl">
      <Editor
        height="56vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        className="editor"
      />
    </div>
  );
};
export default CodeEditorWindow;