import React, { useState } from 'react';
import { Card } from 'antd';
import { get } from 'lodash';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { fetchImageById } from '../../Services/fetchImage';
import { Redirect} from 'react-router-dom';
import './style.scss'
import RichTextRenderer from '../RichTextRenderer';
let Message = (props) => {
interface MessageProps {
    message: {[key: string]: any}
    onDeleteMessage: (id) => void;
    showDeleteMessageLoader: {[id: string]: boolean}
}
const Message: React.FC<MessageProps> = ({message, onDeleteMessage, showDeleteMessageLoader}) => {

    const [updateImage, updateImageSrc] = useState(false);

    const [redirectToEdit, updateRedirectToEdit] = useState(false)

    const getImage = (message) => {
        fetchImageById(get(message, 'fields.image_url.en-US.sys.id')).then((imgSrc) => {
            console.log('image src', imgSrc)
            let imageElement = document.getElementById(get(message, 'fields.image_url.en-US.sys.id'));
            if(imageElement) {
                imageElement.setAttribute('src', imgSrc as string)
                updateImageSrc(true)
            }
        })
    }
    const OnEditMessage = () =>{
        console.log("hi")
        //dipatch message data
        updateRedirectToEdit(true)
    }

    message.fields.image_url && getImage(message)
    console.log(message)
    const res = message.fields.videoUrl && get(message, 'fields.videoUrl.en-US').split('/')
    console.log("res",res)
        if(redirectToEdit) {
            return (
                <Redirect to='/edit' />
            )
        }
        return(
        <Card>
            <h2>
                {get(message, 'fields.title.en-US')}
            </h2>
            {!message.isPublished() && <Button 
                onClick={() => onDeleteMessage(message.sys.id)} 
                className="delete-btn" 
                type="danger" 
                icon={<DeleteOutlined />} 
                size={'middle'} 
                loading={showDeleteMessageLoader && showDeleteMessageLoader[message.sys.id]} />}
              {message.fields.videoUrl && <iframe width="420" height="345" src={"https://www.youtube.com/embed/"+res[res.length-1]} allowFullScreen/>}
              {message.fields.image_url && <img id={get(message, 'fields.image_url.en-US.sys.id')} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEXy8vJkA4prAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC" />}
              <Button icon={<EditOutlined />} onClick={() => OnEditMessage()}></Button>
            <div>
                {message.fields.messageText && <RichTextRenderer renderDocument={get(message, 'fields.messageText.en-US')}/>}
            </div>
        </Card>
    )
}
}
const mapStateToProps = state => {
   
  
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      addData: (data) => dispatch(addData(data))
    }
  }
  
Message = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Message)
  
  
export default Message;
