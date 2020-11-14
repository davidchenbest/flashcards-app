import React from 'react';
//import ReactDOM from 'react-dom';
import Card from './card';
import Input from './input'
import './css/study.css';

class Study extends Input{
    constructor(){
        super();
        this.state={
            counts:[{ }],
            single:{},
            edit:false,
            show:false,
            counter: 0
        
        }
        

    }

    edit=()=>{
        if(this.state.edit){
            this.setState({edit:false})
        }
        else{
            this.setState({edit:true})
        }   
    }

    show=()=>{
        if(this.state.show){
            this.setState({show:false})
        }
        else{
            this.setState({show:true})
        }   
    }

    previous=()=>{
        var c = this.state.counter;
        var len = this.state.counts.length;
        if(c === 0){
            c=len-1;
        }
        else{
            c--;
        }
        console.log(c)
        this.setState({counter: c});
    }

    

    next=()=>{
        this.setState({show:false})
        var c = this.state.counter +1;
        var len = this.state.counts.length;
        if(c === len){
            c=0;
        }
        this.setState({counter: c});
    }

    eachTerm=()=>{
        let c = this.state.counter;
        if(c===0 && this.state.counts.length ===0){
            return('Empty')
        }
        return(this.state.counts[c].term);

    }

    eachDefinition=()=>{
        let c = this.state.counter;
        if(c===0 && this.state.counts.length ===0){
            return('Empty')
        }
        return(this.state.counts[c].definition);

    }

    eachEdit(){
        let c = this.state.counter;
        if(this.state.counts[c]===undefined){
            c=0;
        }

        if(c===0 && this.state.counts.length ===0){
            return(<h1>Empty</h1>)
        }
        return(<Card   save={this.save} remove={this.remove} index={this.state.counts[c].id} definition={this.state.counts[c].definition} term={this.state.counts[c].term} ></Card>);
        
    }

    renderNormal(){
        return(<div >
            <h1 id='each-term' onClick={this.show}>{this.eachTerm()}</h1>
            <div id='control-buttons'>
                <button onClick={this.previous} type="button" className="study-buttons btn btn-outline-primary">Previous</button>
                <button onClick={this.show} type="button" className="study-buttons btn btn-outline-success">Show</button>
                <button onClick={this.edit} type="button" className="study-buttons btn btn-outline-secondary">Edit</button>
                <button onClick={this.next} type="button" className="study-buttons btn btn-outline-primary">Next</button>
            </div>
        </div>)

    }

    renderShow(){
        return(<div >
            <h1 id='each-show' onClick={this.show}>{this.eachDefinition()}</h1>
            <div id='control-buttons'>
                <button onClick={this.previous} type="button" className="study-buttons btn btn-outline-primary">Previous</button>
                <button onClick={this.next} type="button" className="study-buttons btn btn-outline-primary">Next</button>
                <button onClick={this.show} type="button" className="study-buttons btn btn-outline-success">Unshow</button>
                <button onClick={this.edit} type="button" className="study-buttons btn btn-outline-secondary">Edit</button>
                
            </div>
        </div>)

    }

    

    renderEdit(){
        return(
            <div id='study-container'  >
                
                <div  id='each-edit' >
                {this.eachEdit()}
                </div>
                
          
            <div id='control-buttons'>
                <button onClick={this.previous }type="button" className="study-buttons btn btn-outline-primary">Previous</button>
                <button onClick={this.edit} type="button" className="study-buttons btn btn-outline-secondary">Unedit</button>
                <button onClick={this.next} type="button" className="study-buttons btn btn-outline-primary">Next</button>
            </div>
        </div>
        );
    }


    render(){
        if(this.state.counts.length===0){
            return <span className="badge badge-danger" id='empty'>No Cards</span>
        }
        else if(this.state.edit){
            return this.renderEdit();
        }
        else if(this.state.show){
            return this.renderShow();
        }
        return this.renderNormal();
   

    }
}

export default Study;