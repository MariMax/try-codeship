// FilterForm

import React, { Component, PropTypes } from 'react';


class FilterForm extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange({
      query: this.refs.query.value,
      is_done: this.refs.is_done.checked ? 1 : ''
    });
  }

  handleSubmit(e){
    e.preventDefault();
  }

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        <label className="text-white"><input ref="is_done" checked={!!this.props.filters.is_done} onChange={this.handleChange} className="form-control" type="checkbox"/> Show done</label>
        <input ref="query" value={this.props.filters.query||''} onChange={this.handleChange}  type="text" className="form-control m-l-1" placeholder={this.props.placeholder}/>
      </form>
    );
  }
}

FilterForm.propTypes = {
  onChange : PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  filters: PropTypes.object
}
FilterForm.defaultProps = { placeholder:'Search...', filters:{} }

export default FilterForm;
