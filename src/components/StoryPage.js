import React from 'react'

import nerdy from '../components/nerdy.gif'

import CreateStoryForm from './CreateStoryForm'
import EditStoryForm from './EditStoryForm'
import AllStories from './AllStories'
import StoryShow from './StoryShow'

import { Grid, Button, Card } from 'semantic-ui-react'

import { Switch, Route, Link } from 'react-router-dom'


const StoryPage = (props) => {
  // console.log('StoryPage props: ', props);

  let size = 2

  const SideBar = props.stories.map( (story) =>

  <div key={story.id ? story.id : 0} className="EachStoryInSideBar-purple">

    <Card fluid>

        <Card.Content>
          <Card.Header>
            Story Title:
            <Link to={`/stories/${story.id}/edit`}> {story.title}</Link>

          </Card.Header>
        </Card.Content>

        <Card.Content>
          <Card.Meta>
          Story ID: {story.id ? story.id : 0}
          <br></br>

          Creator: {story.user.name ? story.user.name : "name goes here"}
          <br></br>

          Word Count: {story.content ? story.content.split(' ').length : 0}
          </Card.Meta>

        </Card.Content>

        <Card.Content>
          Genres: {story.content ? story.genres.map((genre) => {return (genre.name) }).join(', ') : 0}
        </Card.Content>

        <Card.Content>
          Plots:  {story.content ? story.plots.map((plot) => {
            let plotTitle = plot.title
            return (plotTitle
              .replace("Halloween", "🔪")
              .replace("Alien", "👽")
              .replace("The Matrix", "⏰")
              .replace("Star Wars", "🚀")
              .replace("E.T.", "📞")
              .replace("Terminator", "🤖")
              .replace("Die Hard", "🔫")
              .replace("Thelma and Louise", "🚘")
              .replace("Home Alone", "😂")
              .replace("Beauty and the Beast", "🦊")
              .replace("La Strada", "💔")
              .replace("The Piano", "💙")
            )
          }).join('   ') : 0}
        </Card.Content>

        <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' as={Link} to={`/stories/${story.id}/edit`}
            >View</Button>

          <Button basic color='red' onClick={() => {props.handleDeleteStory(story.id)}}
            >Delete</Button>
        </div>
      </Card.Content>

      </Card>
  </div>
)

return (
  <div>

    <Grid>
      <Grid.Row>

        <Grid.Column width={10}>

          {/* <all the switches within StoryPage, forms, show, index, etc.../> */}

          <Switch>
            <Route exact path='/'
            render={() => <CreateStoryForm
              handleSubmit={props.handleSubmit}
            />} />

            <Route
              exact path='/stories/:id'
              render={({match}) => {
                const story = props.stories.find( s => s.id === parseInt(match.params.id, 10))
                return <StoryShow
                  story={story}
                  image={props.image} //for now, then will change this... just want to see if i can show the image of a pizza...
                  handleDeleteStory={props.handleDeleteStory}
                  // want it to be able to send user to EditStoryForm
                />
              }} />

              <Route
                path='/stories/:id/edit'
                render={({match}) => {
                  const story = props.stories.find( s => s.id === parseInt(match.params.id, 10))
                  return <EditStoryForm
                    story={story}
                    handleUpdateStory={props.handleUpdateStory}
                    handleDeleteStory={props.handleDeleteStory}
                  />
                }} />

                <Route
                  path='/stories'
                  render={() => <AllStories
                  handleDeleteStory={props.handleDeleteStory}
                  stories={props.stories}
                />} />

              </Switch>
            </Grid.Column>


            <Grid.Column width={6}>
            <br></br>
            <br></br>
            <br></br>
              <div className="nerdy">
                <img src={nerdy} className="nerdy" alt="nerdy gif"/>

                <h1 className="hoverYellow pulse-grow">Word Nerds</h1>
              </div>

            </Grid.Column>


            {/* <Grid.Column width={6}>

              <div className="SideBar-blue">

                <div className="SideBar-header">
                  <h2>Recent Stories</h2>
                </div>

                <ul>{ SideBar.reverse().slice(0, size) }</ul>

              <div className="SideBar-button">
                <Link to={'/stories'}>
                <Button color='blue' compact>All Stories</Button>
              </Link>
              </div>

              </div>

            </Grid.Column> */}

          </Grid.Row>
        </Grid>

      </div>
    )

  } //end of StoryPage

  //////

  StoryPage.defaultProps = {
    story: 'story content here', //need this so props aren't null
    title: 'story title here',
    // image: 'story image here',
    genres: 'story genres here',
    plots: 'story plots here',
    stories: [
      {title: 'title here', 'content': 'words words ----- word words words', genres: 'story genres here', plots: 'story plots here'}
    ]
  }


  export default StoryPage
