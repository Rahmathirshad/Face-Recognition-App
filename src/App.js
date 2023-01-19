import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageURLInput from './components/ImageURLInput/ImageURLInput';
import './App.css';

//API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '5112bdbd256543c7a73bab280fe16c15'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

    // --- Clarifai API (setting face location square box) ---
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onInputSubmit = () => {
    this.setState({imageUrl: this.state.input});
   
    app.models
      .predict(
        {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      .then(response => {
        
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({ route: route })
  }

  render() {
    return (
      <div className="App tc">
        <ParticlesBg type="cobweb" bg={true} num={30} />
        <div>
          <Logo />
          {
            this.state.route === 'signin' 
              ? <Signin onRouteChange={this.onRouteChange} />

              : this.state.route === 'register'
                ? <Register onRouteChange={this.onRouteChange} />

                : this.state.route === 'homePage'
                  ? <div>
                    <Navigation onRouteChange={this.onRouteChange} />
                    <ImageURLInput onInputChange={this.onInputChange} onInputSubmit={this.onInputSubmit} />
                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                  </div>

                  : <h1>ERROR: Page cannot be load</h1>
          }
        </div>
      </div>
    );
  }
}

export default App;
