import React from 'react'

export default function rediobutton() {
    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
          [name]: value
        });
      };
  return (
  
    <div className="radio-buttons">

<br></br><br></br><br></br><br></br>
    Windows
    <input
      id="windows"
      value="windows"
      name="platform"
      type="radio"
      onChange={this.handleChange}
    />
    Mac
    <input
      id="mac"
      value="mac"
      name="platform"
      type="radio"
      onChange={this.handleChange}
    />
    Linux
    <input
      id="linux"
      value="linux"
      name="platform"
      type="radio"
      onChange={this.handleChange}
    />
  </div>
  )
}
