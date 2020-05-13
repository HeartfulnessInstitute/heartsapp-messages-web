import * as React from 'react'
import { Card } from 'antd';

const PreviewComponent = (props) => {
   const modalTitle=props.formData.title
   const modalUrl=props.formData.url.split('/')
    console.log(props.formData.url)
    return (
        <Card>
        <h2>
            {modalTitle}
        </h2>
        {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEXy8vJkA4prAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC" /> */}
        <iframe width="420" height="345" src={"https://www.youtube.com/embed/"+modalUrl[modalUrl.length-1]} allowFullScreen/>
    </Card>
    )
}

export default PreviewComponent;
