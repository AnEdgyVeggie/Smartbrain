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
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  console.log(clarifaiFace);
  const image = document.getElementById('inputimage')
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height),
  }
}

displayFaceBox = (box) =>{
  this.setState({box : box})
  console.log(box)
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})
    app.models.predict(
      {
        id: 'face-detection', 
      version: '45fb9a671625463fa646c3523a3087d5'},
      this.state.input
      )
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
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
            <Rank />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        : (
          this.state.route === 'signin'
          )
        ? <Signin onRouteChange={this.OnRouteChange}/>
        : <Register onRouteChange={this.OnRouteChange}/>
      }
      </div>
      )
  }

}

export default App;
