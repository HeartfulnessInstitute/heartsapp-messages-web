import * as React from 'react'
import { Card } from 'antd';
import { isImageUrl } from 'antd/lib/upload/utils';

const PreviewComponent = (props) => {
    const modalTitle = props.formData.title
    //    const modalUrl=props.formData.url.split('/')
    console.log('formdata contents', props.formData.imageData)
    const imageContents=props.formData.imageData
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        console.log("converted",event.target.result);
        document.getElementById("preview-image").src = event.target.value
    };
    if(imageContents){
        fileReader.readAsDataURL(imageContents);
      }    
    return (
        <Card>
            <h2>
                {modalTitle}
            </h2>
            <img  id="preview-image" />
            {/* <iframe width="420" height="345" src={"https://www.youtube.com/embed/"+modalUrl[modalUrl.length-1]} allowFullScreen/> */}
        </Card>
    )
}

export default PreviewComponent;
