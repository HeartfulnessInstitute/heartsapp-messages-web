import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { get } from 'lodash';
import { Player } from 'video-react';

import { fetchImageById } from '../../Services/fetchImage';

import './style.scss'

interface MessageProps {
    message: {[key: string]: any}
}
const Message: React.FC<MessageProps> = ({message}) => {

    const [updateImage, updateImageSrc] = useState(false);

    const getImage = (message) => {
        fetchImageById(get(message, 'fields.image_url.en-US.sys.id')).then((imgSrc) => {
            console.log('image src', imgSrc)
            let imageElement = document.getElementById(get(message, 'fields.image_url.en-US.sys.id'));
            imageElement.setAttribute('src', imgSrc as string)
            updateImageSrc(true)
        })
    }

    const displayMessage = (message) => {
        return  get(message, 'fields.messageText.en-US.content').map((item) => (
            item && item.content && item.content.map((content, index)=>(
              <p key={index}>{content.value}</p>
            ))
        ))
    }
    message.fields.image_url && getImage(message)
    console.log(message)
    const res = message.fields.videoUrl && get(message, 'fields.videoUrl.en-US').split('/')
        return(
        <Card>
            <h2>
                {get(message, 'fields.title.en-US')}
            </h2>
              {message.fields.videoUrl && <iframe width="420" height="345" src={"https://www.youtube.com/embed/"+res[res.length-1]} allowFullScreen/> }
              {message.fields.image_url && <img id={get(message, 'fields.image_url.en-US.sys.id')} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEXy8vJkA4prAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC" />}
            <div>
                {message.fields.messageText && displayMessage(message)}
            </div>
        </Card>
    )
}

export default Message;
