import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Card from './card';
import './css/input.css';



class Input extends Component{
    constructor(){
        super();
        this.state ={
            counts:[

              ]
        };

    }

    componentDidMount(){
        this.fetchUpdate();
    }

    fetchUpdate(){

        const request = async () => {
            let api ='/posts';
            const response = await fetch(api);
            const data = await response.json();
            this.setState({counts: data});

        }

        request();
    }

    remove=(index)=>{
        let api = `/delete/${index}`
        fetch(api).then(this.fetchUpdate());



    }

    save=(t, d, index)=>{
        let api =`/update?term=${t}&def=${d}&id=${index}`;
        fetch(api).then(this.fetchUpdate());
    }



    add=()=>{
        let arr = this.state.counts;
        var id;
        if(arr.length===0){
            id =0;
        }
        else{
            id =arr[arr.length-1].id;
            id++;
        }
        arr.push({term:'', definition:'', id: `${id}`})
        this.setState({counts:arr})
        let api = `/add/${id}`
        fetch(api);
    }

    eachCard=(c,i)=>{
      return(
          <div key={i}  id='card-container'>
                <div id='num'>{i + '.'}</div>
                <Card   save={this.save} remove={this.remove} index={c.id} definition={c.definition} term={c.term}></Card>
          </div>

        );
    }

    test=()=>{
        console.log('hi');
        return(<h1>hi</h1>);
    }

    render(){
        return(
            <div id='container'>
                <button onClick={this.add} className="btn btn-primary" type="submit" >Add</button>
                {this.state.counts.map(this.eachCard)}
                <button onClick={this.add} className="btn btn-primary" type="submit" >Add</button>
            </div>
        );
    }
}



export default Input;
