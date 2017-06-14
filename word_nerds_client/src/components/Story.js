import React from 'react'

import CreateStoryForm from '../components/CreateStoryForm'
import EditStoryForm from '../components/EditStoryForm'
import StoryList from '../components/StoryList'

import { Switch, Route } from 'react-router-dom'


const Story = (props) => {
  console.log('Story props: ', props)

  //putting this here for now...
  // function replaceAll(string, find, replace) {
  //   // return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  //   return string.replace(new RegExp(find, 'g'), replace)
  // }

  const eachStory = props.stories.map( (story, index) =>
      <div key={index} className="Story-orange">

        <h2>
          {/* Story Title: {story.title} */}

          {/* <a><Route
            exact path="/stories/:id/edit"
            // href="#EditStoryForm"
            onClick={() => {props.renderEditForm(story.id)}}>
            Story Title: {story.title}
          </Route></a> */}
          <a
            href="#EditStoryForm"
            onClick={() => {props.renderEditForm(story.id)}}>
            Story Title: {story.title}
          </a>
          {/* <Link to={`/stories/${story.id}`}>{story.content}</Link> */}
        </h2>
          {/* Story content: {story.paragraphs.map } */}

          Story ID: {story.id}
          <br></br>
          <br></br>



          <strong>
            Story content:
          </strong> (splitting and adding line breaks)

          <br></br>
          <br></br>

          {/* {paragraph.text} */}
          {/* {story.paragraphs.map((paragraph, key) => {
            return (
              <span key={key}>
                {replaceAll(paragraph.text, "HERO", story.characters[0] ? story.characters[0].name : 'Hero')}
                <br></br>
                <br></br>
              </span>
            )
          })} */}

          {/* now doing above, below is the old way: */}
          {/* old way is better way???: */}
          {story.content.split('-----').map((paragraph, key) => {
            return (
            <span key={key}>
              {paragraph}
              <br/><br/>
            </span>
          )
          })}

          Story ID: {story.id}
          <br></br>

          <div>
            {/* <a
              href="#EditStoryForm"
              onClick={() => {props.renderEditForm(story.id)}}>
              Edit
            </a>

            <span>   </span> */}

            <button
              href="#delete"
              onClick={() => {props.handleDeleteStory(story.id)}}>
              Delete
            </button>
          </div>

      </div>
  )


  // <Switch>
  //   <Route path="/students/new" render={() => < StudentForm  onSubmit={ props.onSubmit }/>}/>
  //   <Route exact path="/students/:id" render={ ({match}) => {
  //     const student = props.students.find(student => student.id === parseInt(match.params.id))
  //     return < StudentShow student={student} onDelete={ props.onDelete }/>
  //   } }/>
  //   <Route path="/students/:id/edit" render={({match}) => {
  //     const student = props.students.find( s => s.id === parseInt(match.params.id))
  //     return < StudentEdit student={student} onSubmit={ props.onUpdate } />
  //   }} />
  // </Switch>


  return(
    <div>
      <ul>{ eachStory.reverse() }</ul>
        {/* reverse so most recent story is on the top  */}
        <Switch>
          <Route path="/stories/new" render={() => <CreateStoryForm onSubmit={ props.onSubmit }/>}/>
          <Route exact path="/stories/:id" render={ ({match}) => {
            const story = props.stories.find(story => story.id === parseInt(match.params.id))
            return <EditStoryForm story={story} onDelete={ props.onDelete }/>
          } }/>
        </Switch>
      <p>each story can be clicked, which renders it in the EditStoryForm</p>
    </div>
  )

  {/* <div>
    <div className='col-md-4'>
      <ul>
        { nameEls }
      </ul>
      <Switch>
        <Route path="/students/new" />
        <Route path="/students" render={() => <Link to="/students/new">Add Student</Link>} />
      </Switch>
    </div>

    <div className='col-md-8'>
      <Switch>
        <Route path="/students/new" render={() => <StudentForm onSubmit={ props.onSubmit }/>}/>
        <Route exact path="/students/:id" render={ ({match}) => {
          const student = props.students.find(student => student.id === parseInt(match.params.id))
          return <StudentShow student={student} onDelete={ props.onDelete }/>
        } }/>
        <Route path="/students/:id/edit" render={({match}) => {
          const student = props.students.find( s => s.id === parseInt(match.params.id))
          return <StudentEdit student={student} onSubmit={ props.onUpdate } />
        }} />
      </Switch>
    </div>
  </div> */}

} //end of const Story

export default Story
