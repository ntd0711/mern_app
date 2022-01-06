import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function EditorPost({ onChange, value }) {
    const mdParser = new MarkdownIt();
    const [mdValue, setMdValue] = useState(value || '');

    const handleEditorChange = ({ html, text }) => {
        if (!onChange) return;
        onChange({ html, text });
        setMdValue(text);
    };

    function onImageUpload(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (data) => {
                resolve(data.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

    return (
        <MdEditor
            value={mdValue}
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            onImageUpload={onImageUpload}
            placeholder="viet gi do"
        />
    );
}

export default EditorPost;
