import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ComposeEmailEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorStyles = {
    backgroundColor: '#EEEEEE',
    minHeight: '15rem',
    padding: '1rem',
    border: '1px solid #ccc',
  };

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
