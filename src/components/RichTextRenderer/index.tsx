import * as React from 'react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const RichTextRenderer = (props) => {
    return (
            <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(props.renderDocument) }} />
    )
}

export default RichTextRenderer;
