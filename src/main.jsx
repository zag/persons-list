require("./style.css");
import React from 'react';
import {render} from 'react-dom';
import store from './ItemsStore.jsx'
import Modal from 'react-modal';
import PersonItem from './ItemComponent.jsx';

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

class App extends React.Component {
  constructor() { 
    super();
    this.state = {
        'wait': store.getAll(),
         newIsOpen : false
    };


    this._onChange = this._onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  } 

  componentDidMount() {
    store.addChangeListener(this._onChange);
    window.addEventListener('storage', function(e){ store.onStorageChange(e)} );
}

  componentWillUnmount() {
    store.removeChangeListener(this._onChange);
    window.removeEventListener('click', function(e){ store.onStorageChange(e)}, false);
  }
  
  _onChange() { 
    this.setState({      
        'wait': store.getAll()
        }); 
  }

  onSubmit(e) {  
      if ( e ) {
        e.preventDefault();
        e.stopPropagation();
        let attr = {};
        attr.name = this.refs.name.value.trim();
        attr.age = this.refs.age.value.trim();
        attr.phone = this.refs.phone.value.trim();
        attr.email = this.refs.email.value.trim();
        store.create(attr);
        this.refs.name =
        this.refs.age =
        this.refs.phone =
        this.refs.email = '';
        this.closeModal()
        }
    }
 
  openModal() {
    this.setState({newIsOpen: true});
  };

  closeModal() {
    this.setState({newIsOpen: false});
  };

  render () {
    let items = this.state.wait; 
    let PersonItems = [];
    items.forEach(function (item, index, array) {
              PersonItems.push( <PersonItem 
                                attr  = {item}
                                index = {index}
                                key = {index}
                                />
                            );
    }) 
    console.log(items);
    return <div className="panels">
    <h2>Persons list</h2>
        <Modal
          className="Modal__Bootstrap modal-dialog"
          isOpen={this.state.newIsOpen}
          closeTimeoutMS={150}
          onRequestClose={this.closeModal}
          __style={customStyles} >

          <h3>New Person entry</h3>
<form onSubmit={this.onSubmit}>
  <div className="form-group">
    <input type="text" className="form-control" ref="name" placeholder="name, i.e. Pavel Ivanov"/>
  </div>
  <div className="form-group">
    <input type="number" className="form-control" ref="age" placeholder="Age, 23"/>
  </div> 

  <div className="form-group">
    <input type="tel" className="form-control" ref="phone" placeholder="Phone, +7 34443434"/>
  </div> 

  <div className="form-group">
    <input type="email" className="form-control" ref="email" placeholder="Email, text@example.com"/>
  </div> 
 <button type="submit" onClick={this.onSubmit} className="btn btn-default">Submit</button>


</form>
        </Modal> 
    <table className="table table-striped table-hover"> 
      <thead>
       <tr>
        <th>Name</th>
        <th>Age</th> 
        <th>Phone</th>
        <th>Email</th>
        <th></th>
        </tr>
      </thead>
      <tbody> 
      {PersonItems}
      </tbody> 
    </table>
           <div className="clear"></div>
    <form> 
    <button onClick ={this.openModal} type="button" className="btn btn-default" aria-label="Left Align">
  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Person
</button>
    </form> 
    </div>; 
  }
}

render(<App/>, document.getElementById('app'));


