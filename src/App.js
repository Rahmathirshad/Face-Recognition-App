import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import { ToastContainer, toast } from 'react-toastify'; // pop-up alert
import 'react-toastify/dist/ReactToastify.css';
import Clarifai from 'clarifai'; // face detection API
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Registor from './components/Registor/Registor';
import ImageURLInput from './components/ImageURLInput/ImageURLInput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


// --- Clarifai API (setting up API Key) ---
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
      route: 'signin'
    }
  }


  // --- Clarifai API (setting face location square box) ---
  calculateFaceLocation = (data) => {
    const clarifaiFaceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFaceBox.left_col * width,
      topRow: clarifaiFaceBox.top_row * height,
      rightCol: width - (clarifaiFaceBox.right_col * width),
      bottomRow: height - (clarifaiFaceBox.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onInputSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    //--- Clarifai API (Predict/Response face detect model by reading through url) ---
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
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
      .catch(err => console.log(err));

  };

  onRouteChange = (route) => {
    this.setState({ route: route })
  }

  render() {
    return (
      <div className='App tc'>
        <ParticlesBg type="cobweb" bg={true} />
        <ToastContainer
          position='top-center' autoClose={2000} hideProgressBar={false} newestOnTop={false}
          closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
        />
        <div>
          <Logo />
          {this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <div></div>}

          {this.state.route === 'registor'
            ? <Registor onRouteChange={this.onRouteChange} />
            : <div></div>}

          {this.state.route === 'homePage'
            ? <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <ImageURLInput onInputChange={this.onInputChange} onInputSubmit={this.onInputSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
            : <div></div>}
        </div>
      </div>
    );
  }
}

export default App;