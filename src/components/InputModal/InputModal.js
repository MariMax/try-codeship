import React, { Component, PropTypes } from 'react';

class InputModal extends Component {
  componentDidMount() {
      $(this.refs.modal).modal('show');
      setTimeout(function(){
        this.refs.input.focus();
      }.bind(this), 500);

      $(this.refs.modal).on('hidden.bs.modal', this.props.onHide);
      if(this.props.value){
        this.setState({
          inputValue: this.props.value
        })
      }

  }

  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(e){
      if(this.state.inputValue) {
        this.props.onSubmit(this.state.inputValue);
        $(this.refs.modal).modal('hide');
      }
      this.setState({inputValue:''});
      e.preventDefault();
  }

  render() {
    return (
      <div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.modalTitle}</h4>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="modal-body">
                  <input ref="input" required type="text" value={this.state.inputValue} onChange={this.handleChange} className="form-control" placeholder={this.props.placeholder}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary m-l-1">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
}

InputModal.propTypes = {
  modalTitle: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
}

export default InputModal;
