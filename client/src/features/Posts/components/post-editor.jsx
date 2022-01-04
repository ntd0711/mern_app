import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function EditorPost({ onChange }) {
    const mdParser = new MarkdownIt();

    const handleEditorChange = ({ html }) => {
        if (onChange) onChange(html);
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
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            onImageUpload={onImageUpload}
            placeholder="viet gi do"
        />
    );
}

export default EditorPost;
