import React from 'react';
import store from './ItemsStore.jsx'
import Modal from 'react-modal';
var assign = require('object-assign');

const customStyles = {
  overlay : {
    position          : 'fixed', 
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    backgroundColor   : 'rgba(55, 55, 55, 0.6)',
    'overflow-y'      : 'hidden'
  },
  content : {
    top                   : '50%',
    left                  : '50%', 
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    'overflow-y'      : 'hidden'
  }
};

class ItemComponent extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          EditIsOpen : false
        };
        this.onSetDelete = this.onSetDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({EditIsOpen: true});
  }
  onSubmit(e) {  
      if ( e ) {
        e.preventDefault();
        e.stopPropagation();
        let form = {};
        form.name = this.refs.name.value.trim();
        form.age = this.refs.age.value.trim();
        form.phone = this.refs.phone.value.trim();
        form.email = this.refs.email.value.trim();
        var attr = assign({}, this.props.attr, form );
        store.updateItem( attr.id, attr);
        this.closeModal()
        }
    }

  closeModal() {
    this.setState({EditIsOpen: false});
    }
  onSetDelete() { 
            if(confirm("Delete item for: " + this.props.attr.name + "?")) 
                    { store.deleteItem(this.props.attr.id)} 
                 }
  render() {
                console.log(this.props);
                let attr = this.props.attr;
		return  <tr><td>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          isOpen={this.state.EditIsOpen}
          closeTimeoutMS={150}
          onRequestClose={this.closeModal}
          __style={customStyles} >
           <h3>New Person entry</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" ref="name" placeholder="name, i.e. Pavel Ivanov" defaultValue={attr.name}/>
              </div>
              <div className="form-group">
                <input  type="number" className="form-control" ref="age" placeholder="Age, 23" defaultValue={attr.age}/>
              </div> 

              <div className="form-group">
                <input  type="tel" className="form-control" ref="phone" placeholder="Phone, +7 34443434" defaultValue={attr.phone}/>
              </div> 

              <div className="form-group">
                <input type="email" className="form-control" ref="email" placeholder="Email, text@example.com" defaultValue={attr.email}/>
              </div> 
             <button type="submit" onClick={this.onSubmit} className="btn btn-default">Submit</button>
            </form>
        </Modal> 
        {attr.name}</td>
        <td>{attr.age}</td>
        <td>{attr.phone}</td>
        <td>{attr.email}</td>
        <td>
           <button onClick={this.onSetDelete}type="button" className="btn btn-default btn-xs" aria-label="Left Align">
  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> 
</button>
           <button onClick={this.openModal} type="button" className="btn btn-default btn-xs" aria-label="Left Align">
  <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 
</button>
        </td>
    </tr>
	}

}
export default ItemComponent;
