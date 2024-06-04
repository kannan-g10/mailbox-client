import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ComposeEmailEditor = ({ onChangeContent, clearEditor }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const editorStyles = {
    backgroundColor: '#EEEEEE',
    minHeight: '15rem',
    padding: '1rem',
    border: '1px solid #ccc',
  };

  const clearEditorContent = () => {
    setEditorState(EditorState.createEmpty());
    setConvertedContent('');
    onChangeContent('');
  };

  useEffect(() => {
    if (clearEditor) {
      clearEditorContent();
    }
  }, [clearEditor]);

  useEffect(() => {
    onChangeContent(convertedContent);
  }, [convertedContent, onChangeContent]);

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      onEditorStateChange={setEditorState}
      editorStyle={editorStyles}
    />
  );
};

export default ComposeEmailEditor;
