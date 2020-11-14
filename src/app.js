import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Input from './Components/input';
import Study from './Components/study';
import Navbar from './Components/navbar';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>  
                    <Navbar/>
                    <Route exact path='/' component ={Input}/> 
                    <Route exact path='/input' component ={Input}/>
                    <Route exact path='/study' component ={Study}/>
                </div>
            </BrowserRouter>
            
        );
    }
}

export default App;