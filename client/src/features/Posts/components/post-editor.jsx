import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditorPost = ({ onChange, value }) => {
  const handleChange = (content) => {
    if (onChange) onChange(content);
  };

  return (
    <SunEditor
      height="1000px"
      placeholder="Please type here"
      setOptions={{ buttonList: buttonList.complex }}
      onChange={handleChange}
      defaultValue={value}
    />
  );
};
export default EditorPost;
