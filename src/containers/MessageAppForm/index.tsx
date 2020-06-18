import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Input, Button, Form, Radio, notification, Modal } from "antd";
import { EditorState, RichUtils, convertFromHTML, ContentState } from 'draft-js';
import { stateToMarkdown } from "draft-js-export-markdown";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import { addData } from '../../components/Message/action';
import MakeField from '../../components/Forms/MakeField';
import { addOrUpdateMessage } from './action';
import RichTextEditor from '../../components/RichTextEditor';
import PreviewComponent from '../../components/PreviewComponent'
import './style.scss';
const AInput = MakeField(Input)
const ARadioGroup = MakeField(Radio.Group);
let MessageAppForm = (props) => {
  let { handleSubmit, mediaValue, reset, showLoaderForPublish, addData } = props
  

  useEffect(() => {
    // Update the document title using the browser API

    console.log('initial value', props.initialValues)
    const imageBlobFile = props.initialValues.imageUrl
    const messageMarkup = documentToHtmlString(props.initialValues.message)
    const blocksFromHTML = convertFromHTML(messageMarkup);
    const messageState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    setEditorState(EditorState.createWithContent(messageState))
    setImageData(imageBlobFile)
    setFileName(props.initialValues.file_name)

  }, []);

  useEffect(() => {
    return () => {
      console.log('will unmount');
      addData({})
    }
  }, []);
  
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [redirectToView, setRedirectToView] = React.useState(false);

  const [fileName, setFileName] = React.useState()
  console.log("file namemmm", fileName)
  const [imageData, setImageData] = React.useState()

  const [formData, setformData] = React.useState(
    { showModal: false, title: '', video: '', url: '', imageData })


  const submit = (publish) => async (values) => {
    const content = editorState.getCurrentContent()
    const document = await richTextFromMarkdown(stateToMarkdown(content));
    let data = { title: values.title, messageText: document, url: '', image: '', id: props.initialValues.id };
    if (values.media === 'video') {
      data = { ...data, url: values.url }
    } else {
      data = { ...data, image: imageData }
    }
    console.log(data, 'data ==>')
    props.addOrUpdateMessage(data, publish).then(() => {
      setRedirectToView(true)
      clearForm()
      addData({})
      notification.success({
        message: 'Message created successfully!',
        
      });
      console.log("here after success",redirectToView)
      if(redirectToView) {
        return (
            <Redirect to='/login' />
        )
    }
    
      
    })
    .catch((e) => {
      clearForm()
      notification.error({
        message: 'Something went wrong please try again.',
      });
    })
  }
  
  const onFileChange = (e) => {
    setImageData(e.target.files[0])
    setFileName(e.target.files[0].title)
  }
  const clearForm = () => {
    reset()
    setEditorState(EditorState.createEmpty())
  }

  const _handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }

  const _onTab = (e) => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  }

  const _toggleBlockType = (blockType) => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }

  const _toggleInlineStyle = (inlineStyle) => {
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  }
  const onChange = (state) => {
    setEditorState(state)
  }


  const handleCancel = () => {
    setformData({ showModal: false, title: "", video: "", url: "", imageData: "" })
  };

  const preview = async (values) => {
    let data = { ...values, showModal: true, imageData }
    const content = editorState.getCurrentContent()
    data['document'] = await richTextFromMarkdown(stateToMarkdown(content));
    setformData(data)
  }

  return (
    <div >
      <Form>
        <h2 style={{ 'textAlign': "center", 'marginBottom': '25px' }}>Message </h2>
        <Field name="title" component={AInput} placeholder="Title" hasFeedback />

        <RichTextEditor
          _handleKeyCommand={_handleKeyCommand}
          _onTab={_onTab}
          _toggleBlockType={_toggleBlockType}
          _toggleInlineStyle={_toggleInlineStyle}
          editorState={editorState}
          onChange={onChange}
        />
        <Field name="media" component={ARadioGroup} value={mediaValue} >
          <Radio value="video">Add video</Radio>
          <Radio value="image">Add Image</Radio>
        </Field>
        {
          mediaValue === 'image' ?
              <div>
                 {fileName && <span className="file-name-style">{fileName}</span>}
                <input type="file" onChange={(e) => onFileChange(e)} />
              </div>
            : <Field name="url" component={AInput} placeholder="Enter youtube url" hasFeedback />
        }

        <Form.Item style={{ 'textAlign': 'center' }}>
          <Button type="primary" disabled={showLoaderForPublish === "draft"} htmlType="submit" loading={showLoaderForPublish === "draft"} onClick={handleSubmit(submit(false))}>
            Save as draft
            </Button>
          <Button type="primary" onClick={handleSubmit(preview)}>
            Preview
            </Button>
          <Button type="primary" disabled={showLoaderForPublish === "publish"} htmlType="submit" loading={showLoaderForPublish === "publish"} onClick={handleSubmit(submit(true))}>
            Publish
            </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={formData.showModal}
        onCancel={handleCancel}
        footer={null}
        className="modal-class"
      >
        <PreviewComponent formData={formData}></PreviewComponent>

      </Modal>
    </div>
  )
}

const validate = values => {

  const errors = { title: '' };
  if (!values.title) {

    errors.title = "Required";
  }
  return errors;
};

MessageAppForm = reduxForm({
  enableReinitialize: true,
  form: "MessageForm", // a unique identifier for this form
  validate
})(MessageAppForm);

const selector = formValueSelector('MessageForm')

const mapStateToProps = state => {
  // can select values individually
  const mediaValue = selector(state, 'media')
  const data = state.messageForm.data

  return {
    mediaValue,
    initialValues: { ...data },
    showLoaderForPublish: state.loaderStore.loaders.addMessage
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    addOrUpdateMessage: (data, publish) => dispatch(addOrUpdateMessage(data, publish)),
    addData: (data) => dispatch(addData(data))
  }
}

MessageAppForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageAppForm)


export default MessageAppForm;