import React, { Component } from 'react';


class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      inputValue:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(e){
      if(this.state.inputValue) {
        this.props.onSubmit(this.state.inputValue);
      }
      this.setState({inputValue:''});
      e.preventDefault();
  }

  render() {
    return (
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input required type="text" value={this.state.inputValue} onChange={this.handleChange} className="form-control" placeholder={this.props.placeholder}/>
          <button type="submit" className="btn btn-success m-l-1">Add</button>
        </form>
    );
  }
}

InputForm.propTypes = {
  onSubmit : React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired
}

export default InputForm;
