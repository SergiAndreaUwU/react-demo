import './App.css';
import React from 'react';

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

const Content=()=>{
  return(
    <div className="Content">
    <Form/>
    <CardList data={DATASAMPLE} />
    </div>
  )
}


class Form extends React.Component{
  state={ userInput: ''}
  handleSubmit = (event)=>{
    event.preventDefault();
    console.log(this.state.userInput)
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
    {props.data.map((profile)=> <Card {...profile}/>)}
    </>
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
