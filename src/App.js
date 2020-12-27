import './App.css';
import React from 'react';
import axios from 'axios';

const DATASAMPLE=[
  {name: "Dan Abramov", avatar: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Sophie Alpert", avatar: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {name: "Sebastian Markbåge", avatar: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
]

const Header= (props)=>{
  return(
    <div className="Header">
    <h1>Welcome to {props.title}</h1>
    </div>
  )
}

class Content extends React.Component{
  state={ profiles: DATASAMPLE}
  addNewProfile=(profileData)=>{
    this.setState((prevState)=>({
      profiles: [prevState,profiles,profileData]
    }))
  }
  render(){
  return(
    <div className="Content">
    <Form onSubmit={this.addNewProfile}/>
    <CardList data={this.state.profiles} />
    </div>
  )
  }
}


class Form extends React.Component{
  state={ userInput: ''}
  handleSubmit = async (event)=>{
    event.preventDefault();
    const res= await axios.get(`https://api.github.com/users/${this.state.userInput}`)
    this.props.onSubmit(res.data)
  }
  
  render(){
    return(
      <div className="center">
        <form onSubmit={this.handleSubmit}>
          <input type="text"
          placeholder="write something"
          value={this.state.userInput}
          onChange={event=>{
            this.setState({
              userInput: event.target.value
            })
          }} 
          required/>
          <button>Click me</button>
          <br/>
          
        </form>
      </div>
    )
  }
}

const Card=(props)=>{

  let profile=props;
  return(
  <div className="profile">
    
    <img src={profile.avatar}/>
    <div className="profile-right">
      <div className="name">{profile.name}</div>
      <div className="company">{profile.company}</div>
    </div>
  </div>
  )
}

const CardList= (props)=>{
  return(
    <>
    {props.data.map((profile)=> <Card key={profile.id} {...profile}/>)} 
    </>
  )
  //if you don't add a key property, it will throw an error about each child needing an unique key in a list
}

const App= (props)=> {
  return (
    <>
    <Header title={props.title} />
    <Content/>
    </>
  );
}

export default App;
