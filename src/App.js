import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const particlesOption = {
"particles": {
          "number": {
              "value": 100
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user : {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''      
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined 
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  };

  displayFaceBox = (box) => {
    this.setState({box: box})
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://whispering-wildwood-06326.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json(response))
      .then(response => {
        if(response){
          fetch('https://whispering-wildwood-06326.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
        
      .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (
      <div className="app">
        <Particles 
          className='particles'
          params={particlesOption} 
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        : (
            route === 'signin'
            ? <Signin 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} 
                />
            : <Register 
                name={this.state.user.name}
                entries={this.state.user.entries}
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange} 
                />
          )
        }
      </div>
    );
  }
}

export default App;
