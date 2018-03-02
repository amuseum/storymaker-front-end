import React from 'react'

// import { Image, Grid, Button } from 'semantic-ui-react'
// import { Grid, Button, Modal } from 'semantic-ui-react'
import { Grid, Button } from 'semantic-ui-react'

import { Link } from 'react-router-dom'



const StoryShow = (props) => {
  // console.log('StoryShow props ---->>>>>: ', props);
  console.log('StoryShow props.story.id: ', props.story.id);
  // console.log('StoryShow props.story.user: ', props.story.user);

  // console.log('******** >>>>>>> StoryShow props... props.storyIdIsOpen:::: ', props.storyIdIsOpen)

  // console.log('--=-=-=-=-=-=-= props.storyForModal::::', props.storyForModal)
  // below console logs break page on refresh
  // console.log('StoryShow props.story.user.name: ', props.story.user.name);

  // let CoolStoryBro = 'http://i1.kym-cdn.com/photos/images/facebook/000/061/294/1106514-cool_story_bro_super.jpg'

  // let GoogleImage = (<gcse:search></gcse:search>)
  // let GoogleImageHere = (<gcseSearch>pic here</gcseSearch>)
  // let GoogleImageHere = (<gcseSearch>{this.props.image}</gcseSearch>)

  return(
    <div>
      <div>
        {/* {GoogleImageSearchResults} */}
      </div>

      <div>
        {/* {GoogleImageHere} */}
      </div>

      <Grid centered columns={2}>
        <Grid.Column>
          {/* <Image src={props.image ? props.image : CoolStoryBro} size='medium' /> */}
          {/* <Image src={ImageFromGoogleAPI} size='medium' /> */}

        </Grid.Column>
      </Grid>

      <h2>
        Title: { props.story.title ? props.story.title : 0 }
      </h2>

      Edit this story:
      <Link className='btn btn-primary'
        to={`/stories/${props.story.id}/edit`}
        > {props.story.title}</Link>
        <br></br>
        <br></br>

        Story ID: { props.story.id ? props.story.id : "story ID here" }
        <br></br>
        <br></br>

        Story Creator: { props.story.user ? props.story.user.name : "name here" }
        <br></br>
        <br></br>


        Word count: {props.story.content ? props.story.content.split(' ').length : 0}
        <br></br>
        <br></br>


        Genres: {props.story.content ? props.story.genres.map((genre) => {return (genre.name) }).join(', ') : 0}
        <br></br>
        <br></br>


        Plots:  {props.story.content ? props.story.plots.map((plot) => {
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


        <br></br>
        <br></br>

        <strong>
          Story content:
        </strong>

        <br></br>
        <br></br>

        {/* {props.story.content} */}
        {props.story.content ? props.story.content.split('-----').join('\n\n') : "story content will go here"}
        <br></br>
        <br></br>

        {/* Story ID: {props.story.id} */}
        <br></br>

        {/* <Link to={`/stories/${props.story.id}/edit`}>
        <Button color='green' compact
          >Edit Story
        </Button>
      </Link> */}

      {/* {props.storyShowIsModal ? <h1>this is a modal!!!</h1> : <h1>this ain't no modal yo</h1>} */}

      {props.storyShowIsModal ?
        <Button basic color='green'
          onClick={() => { props.toggleStoryShowModalToEditable() }}
          >Edit Story</Button>
          :
          <Link to={`/stories/${props.story.id}/edit`}>
          <Button color='green' compact
            >Edit Story
          </Button>
        </Link>
      }

    </div>
  )
}

StoryShow.defaultProps = {
  content: 'story content here', //need this so props aren't null
  title: 'story title here',
  // image: 'story image here',
  story: {title: 'title', 'content': 'words words ----- word words words',
  genres: ['genres here'], plots: [{title: "Halloween"}]},
}

export default StoryShow
