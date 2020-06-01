import React, { useState } from 'react';
import { Card } from 'antd';
import { get } from 'lodash';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { fetchImageById } from '../../Services/fetchImage';
import { Redirect} from 'react-router-dom';
import { addData } from './action';
import RichTextRenderer from '../RichTextRenderer';

import './style.scss'


interface MessageProps {
    message: {[key: string]: any}
    onDeleteMessage: (id) => void;
    showDeleteMessageLoader: {[id: string]: boolean}
    addData?: (data) => void;
}
let Message: React.FC<MessageProps> = ({message, onDeleteMessage, showDeleteMessageLoader, addData}) => {

    const [updateImage, updateImageSrc] = useState(false);

    const [redirectToEdit, updateRedirectToEdit] = useState(false);
    
    const messaegIdToSrc = {}

    const getImage = (message) => {
        fetchImageById(get(message, 'fields.image_url.en-US.sys.id')).then((imgSrc) => {
            let imageElement = document.getElementById(get(message, 'fields.image_url.en-US.sys.id'));
            if(imageElement) {
                messaegIdToSrc[message.sys.id] = imgSrc
                imageElement.setAttribute('src', imgSrc as string)
                updateImageSrc(true)
            }
        })
    }
    const OnEditMessage = async() =>{
        let data = {};
        data['id'] = get(message, 'sys.id')
        data['title'] = get(message, 'fields.title.en-US');
        data['media'] = message.fields.videoUrl ? 'video' : 'image';
        data['imageSrc'] = message.fields.image_url ? messaegIdToSrc[get(message, 'sys.id')] : '';
        data['url'] = message.fields.videoUrl ? get(message, 'fields.videoUrl.en-US') : '';
        data['message'] = get(message, 'fields.messageText.en-US')
        let file = await fetch(data['imageSrc']).then(r => r.blob()).then(blobFile => new File([blobFile], "fileNameGoesHere", { type: "image/png" }))
        data['imageUrl']=file
        addData(data)
        updateRedirectToEdit(true)
        
        console.log("converted",data['imageUrl'])
    }
    
    message.fields.image_url && getImage(message)
    const res = message.fields.videoUrl && get(message, 'fields.videoUrl.en-US').split('/')

    console.log('result ==>', message.fields.videoUrl)
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
            {!message.isPublished() && <div className="btn-group">
            <Button icon={<EditOutlined />} onClick={() => OnEditMessage()}></Button>
            <Button 
                onClick={() => onDeleteMessage(message.sys.id)} 
                className="delete-btn" 
                type="danger" 
                icon={<DeleteOutlined />} 
                size={'middle'} 
                loading={showDeleteMessageLoader && showDeleteMessageLoader[message.sys.id]} />
                </div>}
              {message.fields.videoUrl && message.fields.videoUrl["en-US"] && <iframe width="420" height="345" src={"https://www.youtube.com/embed/"+res[res.length-1]} allowFullScreen/>}
              {message.fields.image_url && <img id={get(message, 'fields.image_url.en-US.sys.id')} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEXy8vJkA4prAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC" />}
             
            <div>
                {message.fields.messageText && <RichTextRenderer renderDocument={get(message, 'fields.messageText.en-US')}/>}
            </div>
        </Card>
    )
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      addData: (data) => dispatch(addData(data))
    }
  }
  
Message = connect(
    null,
    mapDispatchToProps
  )(Message)
  
  
export default Message;
