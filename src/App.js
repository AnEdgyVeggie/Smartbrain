import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
   apiKey: '8e8610cca8e24a1d8dadc0277c03c8b6'
});

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: "",
        email: '',
        name: '',
        entries: 0,
        joined: ''
      }
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
  console.log(clarifaiFace);
  const image = document.getElementById('inputimage')
  const width = Number(image.width);
  const height = Number(image.height);

  return clarifaiFace.map(face => {
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
    }
  }) ;
}

loadUser = (data) => {
  this.setState({user: {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined
  }})
}

displayFaceBox = (box) =>{
  this.setState({box : box})
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})
    app.models.predict(
      {
        id: 'face-detection', 
      version: '45fb9a671625463fa646c3523a3087d5'},
      this.state.input
      )
      .then(response =>  {
        if (response) {
          console.log(this.state.user.id)
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id

            }) 
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error));
    
}

OnRouteChange = (route) => {
  if (route === 'signout'){
    this.setState({isSignedIn : false})
  } else if (route === 'home'){
    this.setState({isSignedIn : true})
  }
  this.setState({route: route})
}
  
  render(){
    return(
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.OnRouteChange}/>
        { this.state.route === 'home' 
        ? <div>
            <Logo />
            <ImageLinkForm onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        : (
          this.state.route === 'signin'
          )
        ? <Signin loadUser={this.loadUser} onRouteChange={this.OnRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.OnRouteChange}/>
      }
      </div>
      )
  }

}

export default App;
