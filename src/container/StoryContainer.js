import React, {Component} from 'react'

import { withRouter } from 'react-router-dom'

import * as api from '../api'

import NavBar from '../components/NavBar/NavBar'
import NavBarLoginSignUp from '../components/NavBar/NavBarLoginSignUp'
import HomePageAndRoutes from '../components/HomePageAndRoutes/HomePageAndRoutes'
import Greeting from '../components/ConsoleGreeting/Greeting'
import MassiveLoader from '../components/Loaders/MassiveLoader'

import sortStoriesByUpdatedAt from '../helpers/sortStoriesByUpdatedAt'
import getDefaultCharactersObject from '../helpers/getDefaultCharactersObject'

import LoginSignUp from '../container/LoginSignUp'


class StoryContainer extends Component {
  constructor() {
    super()
    this.state = {
      stories: [
        {
          characters: 'story characters here',
          content: 'words words ----- word words words',
          genres: [{one_genre: 'story genres here'}],
          id: 'story ID here',
          paragraphs: 'story paragraphs here',
          plots: [{title: 'Halloween'}],
          title: 'title here',
          user: 'user here'
        }
      ],
      currentUserDataLoaded: false, //default value, set to true in componentDidMount, api.getCurrentUser
      story: 'cool story here',
      title: 'cool story title here',
      user: {
        // id: 'user_id here',
        // name: 'user'
        id: '', //default
        name: '' //default
      },
      characters: {
        hero: {
          name: 'HERO', //default name...
          gender: '',
        },
        shadow: {
          name: 'SHADOW', //default name...
          gender: '',
        },
        friend: {
          name: 'FRIEND', //default name...
          gender: '',
        },
        lover: {
          name: 'LOVER', //default name...
          gender: '',
        },
        mentor: {
          name: 'MENTOR', //default name...
          gender: '',
        },
        trickster: {
          name: 'TRICKSTER', //default name...
          gender: '',
        },
      },
      //updated from CreateStoryFormCreateCharacters...

      storyShowIsModal: false,
      activeModalStoryId: null, //this will be a number...
      indexOfStoryModal: null, //this will be a number...
      storyShowModalIsEditable: false,

      image: '',
      plots: [],
      plotsReceivedFromAPI: false,
      genres: [],
      genreSelection: 'random', //updated from CreateStoryFormSelectGenre... random is default...
      userCount: null, //this will be a number that gets updated by api call...
      usernameOrPasswordError: false,
      usernameExistsError: false,
    }
    this.logout = this.logout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleCharacterNameChange = this.handleCharacterNameChange.bind(this);
    this.handleCharacterGenderChange = this.handleCharacterGenderChange.bind(this);
    this.handleDeleteStory = this.handleDeleteStory.bind(this);
    this.handleUpdateStory = this.handleUpdateStory.bind(this);
    this.toggleStoryShowModalToEditable = this.toggleStoryShowModalToEditable.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.logStateAndDataStatus = this.logStateAndDataStatus.bind(this);
  }



  componentDidMount() {
    api.getStories()
    .then(data => sortStoriesByUpdatedAt(data)) //sorting stories by updated_at, calling function below
    .then(data => this.setState({
      stories: data
    }) )

    api.getPlots()
    .then(data => this.setState({
      plots: data,
      plotsReceivedFromAPI: true
    }) )

    api.getUserCount()
    .then(userCount => this.setState({
      userCount: userCount
    }) )

    if(localStorage.getItem('jwt')) { //wrapping in conditional to eliminate 500 error
      api.getCurrentUser()
      .then(response => this.setState({
        user: response.user,
        currentUserDataLoaded: true
      }) )
    }

  } //componentDidMount

  logStateAndDataStatus() {
    if(this.state.plotsReceivedFromAPI === false) {
      console.warn('%c 0. no plot data yet, this.state.plotsReceivedFromAPI is: ', 'color: red', this.state.plotsReceivedFromAPI)
    } else {
      console.warn('%c 1. plot data received! this.state.plotsReceivedFromAPI is: ', 'color: green', this.state.plotsReceivedFromAPI)
      console.warn('1. StoryContainer - this.state: ', this.state)
    }
  }

  openModal(event, index, id) {
    // console.log('StoryContainer ---- openModal, params are:::', event, index, id)
    this.setState({
      storyShowIsModal: true,
      activeModalStoryId: id,
      indexOfStoryModal: index,
    })
  }

  closeModal() {
    this.setState({
      storyShowIsModal: false,
      activeModalStoryId: null, //reset this to null...
      indexOfStoryModal: null, //reset this to null...
      storyShowModalIsEditable: false,
    })
  }

  toggleStoryShowModalToEditable() {
    this.setState({ storyShowModalIsEditable: true })
  }

  handleSubmit(genres, characters, user_id, user_name, storyType) { //adding genre as argument -- ER Jan 2018
    api.createStory(genres, characters, user_id, user_name, storyType) //adding user_id as argument -- ER Nov 2017
    .then( story => this.setState(
      prevState => ({
        stories: [...prevState.stories, story]
      }) )
    )
    this.props.history.push(`/stories`) //redirect to all stories
  }

  handleClearForm() {
    this.setState(getDefaultCharactersObject) //NOTE: and genreSelection!
  }

  handleUpdateStory(updatedStory) {
    api.updateStory(updatedStory)
    .then( data => sortStoriesByUpdatedAt(data) )
    .then( data => this.setState({
      stories: data
    }) )
    this.setState({
      story: updatedStory.story,
      title: updatedStory.title,
      storyShowModalIsEditable: false,
    })
    // if (this.state.storyShowIsModal === true) {
    //   this.props.history.push(`/stories`) //redirect to stories page, which should show the modal...
    // }
    if (this.state.storyShowIsModal === false) {
      this.props.history.push(`/stories/${updatedStory.id}`) //redirect to StoryShow page
    }
  }

  handleDeleteStory(id) {
    if (window.confirm("Are you sure you want to delete this story? 😱😱😱 ")) {
      api.deleteStory(id)
      .then( () => {
        this.setState( prevState => ({
          stories: prevState.stories.filter( story => story.id !== id ),
        }) )
        // this.setState({
        // storyShowIsModal: false,
        // storyShowModalIsEditable: false
        // }) //make sure modal is closed... --- adding this breaks app...
      })
    }
    this.props.history.push('/stories') //redirect to all stories
  }


  handleSignUp(params) {
    console.log('handleSignUp called with params: ', params)
    api.signUp(params)
    .then(response => {
      if(response.error != null) { //if user already exists, or if there is an error...
        this.setState({usernameExistsError: true})
        console.log("response.error from handleSignUp: ", response.error)
        return
      }
      localStorage.setItem('jwt', response.token)
      this.setState({
        user: response.user,
        currentUserDataLoaded: true
      })
      this.props.history.push('/')
    })
  }


  handleLogin(params) {
    // if (window.confirm(`Are you sure you want to login??? params are: username: ${params.username}, password: ${params.password}`))
    this.setState({usernameOrPasswordError: false}) //resetting the state
    api.logIn(params) //calling logIn function in api/index.js
    .then(response => {
      if(response.user == null && response.error != null) {
        //if user doesn't exist, or if there is an error...
        this.setState({usernameOrPasswordError: true}) //need to pass this down to LoginForm
        console.log("response error")
        return
      }
      localStorage.setItem("jwt", response.token)
      this.setState({
        user: response.user, //this needs to be in StoryContainer
        currentUserDataLoaded: true
      })
      this.props.history.push('/')
    })
  }


  handleGenreChange(params) {
    // console.log('StoryContainer ~~~ handleGenreChange called with params: ', params)
    this.setState({
      genreSelection: params
    })
  }


  handleCharacterNameChange(characterName, characterType) {
    // console.log('handleCharacterNameChange -> characterName and characterType is: ', characterName, characterType)
    let characters = {...this.state.characters}
    characters[characterType].name = characterName
    this.setState({
      characters
    })
  }

  handleCharacterGenderChange(characterGender, characterType) {
    // console.log('handleCharacterGenderChange -> characterGender and characterType is: ', characterGender, characterType)
    let characters = {...this.state.characters}
    characters[characterType].gender = characterGender
    this.setState({
      characters
    })
  }

  logout() {
    this.setState({
      user: null,
      currentUserDataLoaded: false
    })
    localStorage.clear()
    // console.log('logout', this.state.current_user)
  }


  render() {
    this.logStateAndDataStatus()
    if(localStorage.getItem('jwt')) { //if signed in...
      // console.log('jwt: ', this.jwt)
      // console.log('0. console.table(this.state) is ----->>>>')
      // console.warn('state from StoryContainer - (signed in): ', this.state)
      return(
        <div>
          {
            (this.state.currentUserDataLoaded === true) ?
            // ((this.state.user.name) && (this.state.plotsReceivedFromAPI === true)) ?
            <div>

              <NavBar
                title="Storyverse"
                current_user={this.state.user.name}
                logout={this.logout}
                location={this.props.location}
              />

              <Greeting
                current_user={this.state.user.name}
              />

              <HomePageAndRoutes
                //props for CreateStoryForm
                handleSubmit={this.handleSubmit}
                handleClearForm={this.handleClearForm}
                genreSelection={this.state.genreSelection}
                handleGenreChange={this.handleGenreChange} //this will be for CreateStoryFormSelectGenre
                handleCharacterNameChange={this.handleCharacterNameChange}
                handleCharacterGenderChange={this.handleCharacterGenderChange}
                characterProps={this.state.characters} //pass all characters in one prop...

                //props for EditStoryForm
                handleDeleteStory={this.handleDeleteStory}
                handleUpdateStory={this.handleUpdateStory}
                story={this.state.story}
                title={this.state.title}
                image={this.state.image}
                user={this.state.user}

                //props for Metadata
                userCount={this.state.userCount}

                //props for AllStories
                stories={this.state.stories}
                plots={this.state.plots}
                storyShowIsModal={this.state.storyShowIsModal}
                storyShowModalIsEditable={this.state.storyShowModalIsEditable}
                toggleStoryShowModalToEditable={this.toggleStoryShowModalToEditable}
                openModal={this.openModal}
                closeModal={this.closeModal}
                activeModalStoryId={this.state.activeModalStoryId}
                indexOfStoryModal={this.state.indexOfStoryModal}
              />
            </div>
            :
            <MassiveLoader />
          }
          </div>
      )
    }
    else {
      // console.log('state from StoryContainer (not signed in): ', this.state)
      return(
        <div>
          <NavBarLoginSignUp />
          {
            (this.state.plotsReceivedFromAPI === false) ? //plots instead of userCount...
            <MassiveLoader />
            :
            <LoginSignUp
              handleLogin={this.handleLogin}
              handleSignUp={this.handleSignUp}
              usernameOrPasswordError={this.state.usernameOrPasswordError}
              usernameExistsError={this.state.usernameExistsError}
            />
          }
        </div>
      )
    }
  } //render
} //class

export default withRouter(StoryContainer)
