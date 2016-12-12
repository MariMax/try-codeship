// FilterForm

import React, { Component, PropTypes } from 'react';


class FilterForm extends Component {
  constructor() {
    super();
    this.state = {
      inputValue:''
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let val = event.target.value;
    this.setState({inputValue: val});
    this.props.onChange({
      query: val
    });
  }

  handleSubmit(e){
    e.preventDefault();
      // if(this.state.inputValue) {
      //   this.props.onSubmit(this.state.inputValue);
      // }
      // this.setState({inputValue:''});
      // e.preventDefault();
  }

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        <label className="text-white"><input className="form-control" type="checkbox"/> Show active</label>
        <input value={this.state.inputValue} onChange={this.handleChange}  type="text" className="form-control m-l-1" placeholder={this.props.placeholder}/>
      </form>
    );
  }
}

FilterForm.propTypes = {
  onChange : PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  query: PropTypes.string
}
FilterForm.defaultProps = { placeholder:'Search...' }

export default FilterForm;
