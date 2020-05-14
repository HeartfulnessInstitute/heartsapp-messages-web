import * as React from 'react'
import { Card } from 'antd';

const PreviewComponent = (props) => {
    const modalTitle = props.formData.title
    const modalUrl=  props.formData.url ? props.formData.url.split('/') : ''
    
    if(props.formData.media === 'image') {
        const imageContents=props.formData.imageData
        var fileReader: FileReader = new FileReader();
        fileReader.onload = function (event: Event) {
            const imageEle = document.getElementById("preview-image") as HTMLImageElement
            if(imageEle) {
                imageEle.src = fileReader.result as string;
            }
        };
        if(imageContents){
            fileReader.readAsDataURL(imageContents);
          }   
    }
     
    return (
        <Card>
            <h2>
                {modalTitle}
            </h2>
            {props.formData.media !== 'video' ? 
            <img  id="preview-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEXy8vJkA4prAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC" />
            : props.formData.url && <iframe width="420" height="345" src={"https://www.youtube.com/embed/"+modalUrl[modalUrl.length-1]} allowFullScreen/>}
        </Card>
    )
}

export default PreviewComponent;
