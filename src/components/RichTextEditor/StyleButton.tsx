import * as React from 'react';


interface StyleButtonPros {
    key : string,
    active : boolean,
    label : string
    onToggle : (style) => void;
    style : any;
}
class StyleButton extends React.Component<StyleButtonPros> {
    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }
  
      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }
  
  export default StyleButton;
