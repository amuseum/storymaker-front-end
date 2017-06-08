import React, {Component} from 'react'

import CreateStoryForm from '../components/CreateStoryForm'
import EditStoryForm from '../components/EditStoryForm'
import StoryList from '../components/StoryList'

class StoryContainer extends Component {
  constructor() {
    super()
    this.state = {
      stories: [], //array of all the (user's) stories
      story: '', //one story's content
      title: 'title here', //default title for stories
      storyID: 0, //default is zero
      editing: false //default is false
    }
  } //end of constructor


componentDidMount() {
  fetch('http://localhost:3000/stories', {
    method: 'GET',
  })
  .then( response => response.json() )

  .then( data => this.setState({
    stories: data //setting stories to data
    //data is an array of objects... need .content from each object
  }) )
  //////use this to console.log data after commenting out above .then::::::
  // .then(function(data) { //will replace this with above
  //   console.log('data from API: ', data)
  //   console.log('data[0].content: ', data[0].content)
  // })
} //end of componentDidMount


createStory(content) {
  return fetch("http://localhost:3000/stories", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
    method: 'POST',
    body: JSON.stringify( {story: {
      content: content, //this has to be content, to match attributes on stories_controller on backend (same as below attributes)
      title: "default TITLE here", //default for now
      user_id: 1 //this will be whatever the loggedin user's id is
    }} )
  }).then( res => res.json() )
}

handleSubmit(story) {
  this.createStory(story) //this is calling function above, adding student to database
//THEN doing the below, which adds student to page, along with other students.
    .then( story => this.setState( prevState => ({ stories: [...prevState.stories, story] }) ))
    .catch(err => console.log(err))
}


updateStory(story) {
  return fetch(`http://localhost:3000/stories/${this.state.storyID}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify( {story: {
        content: story, ///story! same as argument... from EditStoryForm, this is: 'this.state.input'
        title: this.state.title,
        user_id: 1, //default for now
      }}
    ),
  }).then( res => res.json() )
}


handleUpdateStory(story) { //should this be storyID (or id) instead?
console.log('handleUpdateStory story: ', story)

  this.updateStory(story) //calling function above, updating story on database
  .then( (response) => this.setState({
      stories: response
    }) )
    this.setState({
      story: '',
      title: '',
    })
}

///changing 'id' to 'story' to see if that works....
//below is 'id', no matter what you call it...
renderEditForm(id) {
  let editStory = this.state.stories.find(story => story.id === id)
  console.log('editing story with id: ', id)
  console.log('editing editStory.content: ', editStory.content)

  this.setState({
    stories: this.state.stories, //this doesn't change
    story: editStory.content, //CHANGE story TO content!!!!! (attribute in API)
    title: editStory.title, //default title for stories
    storyID: editStory.id,
    editing: true //default is false
  })
} //end of renderEditForm


deleteStory(id) {
  return fetch(`http://localhost:3000/stories/${id}`, {
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

    this.deleteStory(id) //calling function above

    .then( () => {
      this.setState( prevState => ({
        stories: prevState.stories.filter( story => story.id !== id )
      }) )
    })
  }//end if statement
}


  render() {
    return(
      <div>
        {/* put below forms within Switch ?? */}
        <CreateStoryForm
          handleSubmit={this.handleSubmit.bind(this)}
        />
        <br></br>
        <EditStoryForm
          handleDeleteStory={this.handleDeleteStory.bind(this)}

          handleUpdateStory={this.handleUpdateStory.bind(this)}
          //handleChange so users can type

          // passing all state as props to EditStoryForm
          stories={this.state.stories}
          story={this.state.story}

          title={this.state.title}
          storyID={this.state.storyID}
          editing={this.state.editing}
        />

        <p>Below are all the stories from API, via StoryList component:</p>
        <StoryList
          handleDeleteStory={this.handleDeleteStory.bind(this)}

          renderEditForm={this.renderEditForm.bind(this)}

          storyList={this.state.stories}
        />
      </div>
    )
  }
}

export default StoryContainer
