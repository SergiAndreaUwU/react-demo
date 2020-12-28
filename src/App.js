import './App.css';
import React from 'react';
import axios from 'axios';

const DATASAMPLE=[
  {id:1 ,name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {id:2 ,name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {id:3 ,name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
]

const Header= (props)=>{
  return(
    <div className="Header">
    <h1>Welcome to {props.title}</h1>
    </div>
  )
}

class Content extends React.Component{
  render(){
    return(
      <ProfileCardsDemo/>
    )
  }
}

class ProfileCardsDemo extends React.Component{
  state={ profiles: DATASAMPLE}
  addNewProfile=(profileData)=>{
    this.setState(prevState=>({
      profiles: [...prevState.profiles, profileData]
      })
    )
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
  state={ userInput: ""}
  handleSubmit = async (event)=>{
    event.preventDefault();
    const res= await getDataService(this.state)
    this.props.onSubmit(res.data)
    this.setState({userInput:""})
  }
  
  render(){
    return(
      <div className="center">
        <form onSubmit={this.handleSubmit}>
          <input placeholder="write something"
          value={this.state.userInput}
          onChange={event=>{
            this.setState({
              userInput: event.target.value
            })
          }} 
          required/>
          <button>Click me</button>
          <br/>
          {/*insert an indicator which indicates if the user exists before clicking the button DB*/}
        </form>
      </div>
    )
  }
}

const getDataService=(state)=>{
  try{
  return axios.get(`https://api.github.com/users/${state.userInput}`)
  }catch(e){
    console.error(`error in getDataService: ${e}`)
    try{
      fetch(`https://api.github.com/users/${state.userInput}`)
      .then(response => response.json())
      .then(data => {return data});
    }catch(e){console.error(e)}
  }
}

const CardList= (props)=>{
  return(
    <>
    {props.data.map((profile)=> <Card key={profile.id} {...profile}/>)} 
    </>
  )
  //if you don't add a key property, it will throw an error about each child needing an unique key in a list
}

const Card=(props)=>{
  let profile=props;
  return(
  <div className="profile">
    <img src={profile.avatar_url} alt=""/>
    <div className="profile-right">
      <div className="name">{profile.name}</div>
      <div className="company">{profile.company}</div>
    </div>
  </div>
  )
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
