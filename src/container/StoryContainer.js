import React, {Component} from 'react'

import NavBar from '../components/NavBar'

import axios from 'axios'


import LoginSignUp from '../container/LoginSignUp'

import { withRouter } from 'react-router-dom'

// import { Router, Route, Switch } from 'react-router'

import StoryPage from '../components/StoryPage'

class StoryContainer extends Component {
  constructor() {
    super()
    console.log('StoryContainer props: ', this.props);
    this.state = {
      stories: [],
      story: '',
      title: 'cool story title here',
      user: '',
      image: '',
      genres: [],
      // note: use 'http://localhost:3000' baseUrl for local build, and 'http://localhost', without :3000, for website...
      //or https://word-nerds-api.herokuapp.com for production

      baseUrl: 'https://word-nerds-api.herokuapp.com' //for production

      // baseUrl: 'http://localhost' //can't make this global variable so putting it here
      // baseUrl: 'http://localhost' //can't make this global variable so putting it here
      // baseUrl: 'http://localhost:3000'
    }
  }

//removing :3000 from all urls.


  componentDidMount() {
    fetch(`${this.state.baseUrl}/stories`, {
    // fetch(`http://localhost:3000/stories`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'mode': 'no-cors',
      //'Authorization': localStorage.getItem('jwt')
    },
      method: 'GET',
    })
    .then( response => response.json() )

    .then( data => this.setState({
      stories: data
    }) )

    fetch(`${this.state.baseUrl}/users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors',
        //'Authorization': localStorage.getItem('jwt')
      },
      method: 'GET',
    })
    .then (response => response.json() )
    .then (user => this.setState({
      user: user
    }) )
  }


  createStory(content, characters) {
    console.log('content inside createStory: ', content)
    return fetch(`${this.state.baseUrl}/stories`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': localStorage.getItem('jwt')
      },
      method: 'POST',
      body: JSON.stringify({story: {
        title: characters.hero.name + "'s story, v1",
        user_id: 1, //default for now

        characters: [
          {
            name: characters.hero.name,
            gender: characters.hero.gender,
            archetype: "hero"
          },
          {
            name: characters.shadow.name,
            gender: characters.shadow.gender,
            archetype: "shadow"
          },
          {
            name: characters.friend.name,
            gender: characters.friend.gender,
            archetype: "friend"
          },
          {
            name: characters.lover.name,
            gender: characters.lover.gender,
            archetype: "lover"
          },
          {
            name: characters.mentor.name,
            gender: characters.mentor.gender,
            archetype: "mentor"
          },
          {
            name: characters.trickster.name,
            gender: characters.trickster.gender,
            archetype: "trickster"
          },
        ],
      },
    }),
  }).then( res => res.json() )
}


handleSubmit(story, characters) {
  this.createStory(story, characters) //calling function above, adding content to database
  // .then( story => console.log("STORYYYY", story) )
  .then( story => this.setState( prevState => ({ stories: [...prevState.stories, story] }
  ) )
)
// this.props.history.push(`/stories/${story.id}/edit`) //redirect to edit form
this.props.history.push(`/stories`) //redirect to all stories
// .catch(err => console.log(err))
}


updateStory(updatedStory) {
  return fetch(`${this.state.baseUrl}/stories/${updatedStory.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify( {story: {
      content: updatedStory.input,
      title: updatedStory.title,
      user_id: 1, //default for now
    }}
  ),
}).then( res => res.json() )
}


handleUpdateStory(updatedStory) {
  console.log('handleUpdateStory updatedStory and updateStory.id: ', updatedStory,  updatedStory.id)
  this.updateStory(updatedStory) //calling function above, updating story on database
  .then( (response) => this.setState({
    stories: response //nasty nas
  }) )
  this.setState({
    story: updatedStory.story,
    title: updatedStory.title,
  })
  this.props.history.push(`/stories/${updatedStory.id}`) //redirect to all stories page
}


// componentWillUpdate() { //breaks app, calls tons of pics at once...

////this is kind of working, but breaks after a while, cuz i hit my limit...
// componentWillReceiveProps() { //gets pic for LAST story, not current story
//   let cx = `018050256633849340962:zvrqetqkh78`
//   let query = this.state.title
//   let googleAPIkey = 'AIzaSyDPtQPW0z01peIpOp7tpzIRHtbSG3M11m4'
//
//   fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&searchType=image&key=${googleAPIkey}`, {
//     method: 'GET',
//   })
//   .then (response => response.json() )
//
//   .then (image => this.setState({
//     image: image.items[0].link
//   }) )
// }


deleteStory(id) {
  return fetch(`${this.state.baseUrl}/stories/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
  }).then( res => res.json() )
  .catch(err => console.log(err))
}


handleDeleteStory(id) {
  if (window.confirm("Are you sure you want to delete this story? 😱😱😱 ")) {
    this.deleteStory(id)
    .then( () => {
      this.setState( prevState => ({
        stories: prevState.stories.filter( story => story.id !== id )
      }) )
    })
  }
  this.props.history.push('/stories') //redirect to all stories
}

handleLogin(params) {
  // fetch("http://localhost:3000/api/v1/sign_in", {
  fetch(`${this.state.baseUrl}/sign_in`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  })
  .then( res => res.json() )
  .then( resp => { console.log('Log In Response: ', resp)
  localStorage.setItem("token", resp.token)
  this.setState({
    user: resp.user
  })
  this.props.history.push('/')
})
}

handleSignUp() {
  // axios.post(`${this.localhost}/api/v1/users', {
  axios.post(`${this.state.baseUrl}/users`, {
    user: {
      name: this.state.name,
      password: this.state.password
    }
  }).then(res => { console.log('Sign Up Response: ', res )
  localStorage.setItem("token", res.data.token)
  this.props.history.push('/')
}).catch( e => console.log('error from handleSignUp', e.response) )
}

logout() {
  this.setState({
    user: null
  })
  localStorage.clear()
  // console.log('logout', this.state.current_user);
}


render() {
  console.log('state: ', this.state);
  // console.log('state.stories.genres: ', this.state.stories.genres);
  // const { location } = this.props

  if(localStorage.getItem('token')) {

    // debugger

    return(
      <div>

        {/* <div>You are now at {location.pathname}</div> */}

        <NavBar
          title="Word Nerds"
          color="yellow"
          logout={this.logout.bind(this)}
        />

        {/* <div> Welcome {this.state.user ? this.state.user[0].name : null}</div> */}

        <StoryPage
          //props for CreateStoryForm
          handleSubmit={this.handleSubmit.bind(this)}

          //props for EditStoryForm
          handleDeleteStory={this.handleDeleteStory.bind(this)}
          handleUpdateStory={this.handleUpdateStory.bind(this)}
          story={this.state.story}
          title={this.state.title}
          image={this.state.image}

          //props for AllStories
          stories={this.state.stories}
        />

      </div>
    )
  }
  else {
    return(
      <div>
        <NavBar />

        <LoginSignUp handleLogin={this.handleLogin.bind(this)} />
      </div>
    )

  }

}
}

export default withRouter(StoryContainer)