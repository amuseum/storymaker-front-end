import React from 'react'

import OneStory from './OneStory'

import { Card, Loader, Segment, Button } from 'semantic-ui-react'

const AllStories = (props) => {

  ///add scrollToTop function here
  // const filteredStories = props.stories.filter(story => story.user_id === props.user_id)
  const filteredStories = props.stories.filter(story => story.user.id === props.user.id)

  // console.log('hello from AllStories')
  console.log('AllStories props: ', props)
  return(

    <div key={props.id} className="AllStories-green">

      <div className="AllStories-header">
        <Card fluid>
          <Card.Content>
          {/* <h1 className="center">{props.username}'s stories</h1> */}
          <h1 className="center">{props.user.name}'s stories</h1>

          {filteredStories.length === 0 ?
            <Segment>
              <Loader active inline='centered' />
            </Segment>
            : <h3 className="center">total stories: {filteredStories.length}</h3>}

        </Card.Content>
        </Card>
      </div>

      <OneStory
        handleUpdateStory={props.handleUpdateStory}
        handleDeleteStory={props.handleDeleteStory}
        userStories={filteredStories} //passing OneStory userStories, not all stories in database...
        user={props.user}
        scrollToTop={props.scrollToTop}
        // user_id={props.user_id}
        storyShowIsModal={props.storyShowIsModal}
        openModal={props.openModal}
        closeModal={props.closeModal}
        storyShowModalIsEditable={props.storyShowModalIsEditable}
        toggleStoryShowModalToEditable={props.toggleStoryShowModalToEditable}
        activeModalStoryId={props.activeModalStoryId}
        indexOfStoryModal={props.indexOfStoryModal}
      />

      <Button
        primary
        onClick={props.scrollToTop}
        >Scroll To Top
      </Button>

      {/* <p className="center">AllStories mounts and renders OneStory, which contains eachStory</p> */}
    </div>
  )
}

export default AllStories
