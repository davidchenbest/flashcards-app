import React, { Component } from 'react';
import './css/card.css';

class Card extends Component{
    state ={editing : false};
    

    remove=()=>{
        
        this.props.remove(this.props.index);
        
    }

    save =()=>{
        var term =this.refs.newTerm.value;
        var def = this.refs.newDef.value;
        this.props.save(term,def, this.props.index);
        this.setState({editing:false});
    }

    

    edit=()=>{
        this.setState({editing:true});
    }

    

    renderForm(){
        return(
            <div className="row ">
                <textarea  ref='newTerm' defaultValue={this.props.term} className="form-control col-md-6"></textarea>
                <textarea  ref='newDef' className="form-control col-md-6" defaultValue={this.props.definition}></textarea>
                <button onClick={this.save} type="button" className="btn btn-success" id='card-button'>Save</button>
            </div>
        )
        
    }

    renderNormal(){
        return(
            <div className="row ">
                <h4 className="col-md-6 " id='term'>{this.props.term}</h4>
                <h4 className="col-md-6 " id='definition'>{this.props.definition}</h4>
                <div  >
                    <button onClick={this.edit} type="button" className="btn btn-info" id='card-button'>Edit</button>
                    <button onClick={this.remove} type="button" className="btn btn-danger" id='card-button'>Remove</button>
                </div>
                
            </div>
        
        );
    }

    render(){
            if(this.state.editing){
                return this.renderForm();
            }
            else{return this.renderNormal();}
    }
}



export default Card;
