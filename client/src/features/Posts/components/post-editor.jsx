import { Box } from '@mui/material';
import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditorPost = ({ onChange, value }) => {
  const handleChange = (content) => {
    if (onChange) onChange(content);
  };

  return (
    <Box>
      <SunEditor
        height="200px"
        placeholder="Please type here"
        setOptions={{ buttonList: buttonList.complex }}
        onChange={handleChange}
        defaultValue={value}
      />
    </Box>
  );
};
export default EditorPost;
