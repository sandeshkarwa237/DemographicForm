import React, { Component } from 'react';
import './App.css';
import '../node_modules/spectre.css/dist/spectre.min.css';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="col-md-8 col-xs-12 col-sm-12 centered">
            <FormContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
