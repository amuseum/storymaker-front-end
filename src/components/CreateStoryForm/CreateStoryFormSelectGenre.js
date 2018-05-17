import React, { Component } from 'react'

import { Form, Header, Grid } from 'semantic-ui-react'

class CreateStoryFormSelectGenre extends Component {

  constructor(props) {
    console.log('**** props from CreateStoryFormSelectGenre:', props)
    super(props)
    this.state=({ //organizing this so it's not nested, but post request will be nested

    //genres: ['random'], //will replace this with below...
    //for now, will make genre selection radio buttons
    //in the future, will make it so user can select multiple, or random, which selects from all
    //and if user deselects all, it automatically selects random
    //perhaps could have random be a radio button and everything else be a select button
    genreSelection: "random", //default... ok to set default for controlled component in state?
    filteredPlotsByGenre: this.props.plots.length,
    filteredPlotsByTitle: this.props.plots.filter(plotObject => plotObject).map(object => object.title) //default for now... 0 is false, so won't break trying to render
  })
} //end of constructor

componentWillReceiveProps(nextProps) { //need this lifecycle method to update filteredPlotsByTitle
  // console.log('CreateStoryFormSelectGenre nextProps is: ', nextProps)
  if (this.props.plots.length !== nextProps.plots.length) {
    this.setState({
      filteredPlotsByGenre: nextProps.plots.length,
      filteredPlotsByTitle: nextProps.plots.filter(plotObject => plotObject).map(object => object.title)
    })
  }
}

handleGenreSelectionChange(event) {
  const genreSelection = event.target.value
  // console.log('--->>> CreateStoryFormSelectGenre: genreSelection is: ', genreSelection)
  ////not DRY!!!! refactor below....
  var horrorPlots = this.props.plots.filter(plotObject => plotObject.genre_id === 1)
  var sciFiPlots = this.props.plots.filter(plotObject => plotObject.genre_id === 2)
  var actionPlots = this.props.plots.filter(plotObject => plotObject.genre_id === 3)
  var dramaPlots = this.props.plots.filter(plotObject => plotObject.genre_id === 4)
  var fantasyPlots = this.props.plots.filter(plotObject => plotObject.genre_id === 5)
  var comedyPlots = this.props.plots.filter(plotObject => plotObject.genre_id === 6)
  var romancePlots = this.props.plots.filter(plotObject => plotObject.genre_id === 7)
  var randomPlots = this.props.plots.filter(plotObject => plotObject)
  // console.log('randomPlots is: ', randomPlots) //an array
  // console.log('this.props.plots.filter(plotObject => plotObject).map(object => object.title) is: ', this.props.plots.filter(plotObject => plotObject).map(object => object.title) )

  if (genreSelection === "horror") {
    this.setState({ filteredPlotsByGenre: horrorPlots.length, filteredPlotsByTitle: horrorPlots.map(object => object.title) })
  }
  if (genreSelection === "scifi") {
    this.setState({ filteredPlotsByGenre: sciFiPlots.length, filteredPlotsByTitle: sciFiPlots.map(object => object.title) })
  }
  if (genreSelection === "action") {
    this.setState({ filteredPlotsByGenre: actionPlots.length, filteredPlotsByTitle: actionPlots.map(object => object.title) })
  }
  if (genreSelection === "drama") {
    this.setState({ filteredPlotsByGenre: dramaPlots.length, filteredPlotsByTitle: dramaPlots.map(object => object.title) })
  }
  if (genreSelection === "fantasy") {
    this.setState({ filteredPlotsByGenre: fantasyPlots.length, filteredPlotsByTitle: fantasyPlots.map(object => object.title) })
  }
  if (genreSelection === "comedy") {
    this.setState({ filteredPlotsByGenre: comedyPlots.length, filteredPlotsByTitle: comedyPlots.map(object => object.title) })
  }
  if (genreSelection === "romance") {
    this.setState({ filteredPlotsByGenre: romancePlots.length, filteredPlotsByTitle: romancePlots.map(object => object.title) })
  }
  if (genreSelection === "random") {
    this.setState({ filteredPlotsByGenre: randomPlots.length, filteredPlotsByTitle: randomPlots.map(object => object.title) })
  }
  this.props.handleGenreChange( genreSelection ) //this will pass genreSelection up to state in StoryContainer
  this.setState({ genreSelection: genreSelection })
}



render() {
  // console.log('****>>>>>> state from CreateStoryFormSelectGenre:', this.state)
  return(

    <div className="CreateStoryFormSelectGenre">

        {/* //comments here and above
          //for now, will make genre selection radio buttons
          //in the future, will make it so user can select multiple, or random, which selects from all
          //and if user deselects all, it automatically selects random
          //perhaps could have random be a radio button and everything else be a select button */}

          <Header as='h2' textAlign='center'>
            Choose Genre or Genres
          </Header>

          <Form.Group grouped className="genreSelection">

            <Grid columns={2} centered>
              <Grid.Row className="genreSelectionRow">
                <Grid.Column>
                  <Form.Field label="horror"
                    value="horror"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "horror"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                  <Form.Field label="sci-fi"
                    value="scifi"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "scifi"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                  <Form.Field label="action"
                    value="action"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "action"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                  <Form.Field label="drama"
                    value="drama"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "drama"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                </Grid.Column>

                <Grid.Column>
                  <Form.Field label="fantasy"
                    value="fantasy"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "fantasy"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                  <Form.Field label="comedy"
                    value="comedy"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "comedy"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                  <Form.Field label="romance"
                    value="romance"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "romance"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                  <Form.Field label="random"
                    value="random"
                    control="input" type="radio"
                    checked={this.state.genreSelection === "random"}
                    onChange={this.handleGenreSelectionChange.bind(this)}
                  />
                </Grid.Column>
              </Grid.Row>


              {/* <Form.Field label="random"
                value="random"
                control="input" type="radio"
                checked={this.state.genreSelection === "random"}
                onChange={this.handleGenreSelectionChange.bind(this)}
              /> */}


            </Grid>
          </Form.Group>

          <Header as='h3' textAlign='center'>
            You chose: {this.state.genreSelection}
            <br></br>
            <br></br>

            {this.state.genreSelection} plots: { this.state.filteredPlotsByGenre }
            <br></br>
            <br></br>

            <div>{this.state.filteredPlotsByTitle ? this.state.filteredPlotsByTitle.map((plotTitle) => {
              return (
                plotTitle
                .replace("Halloween", "🔪")
                .replace("Alien", "👽")
                .replace("The Matrix", "⏰")
                .replace("Star Wars", "🚀")
                .replace("E.T.", "📞")
                .replace("Terminator", "🤖")
                .replace("Die Hard", "🔫")
                .replace("Thelma and Louise", "🚘")
                .replace("The Last Unicorn - Wikipedia.rb", " //🤷🤷🤷// ")
                .replace("Home Alone", "😂")
                .replace("Frozen (2013 film) - Wikipedia.rb", " //🤷🤷🤷// ")
                .replace("Toy Story - Wikipedia.rb", " //🤷🤷🤷// ")
                .replace("Beauty and the Beast", "🦊")
                .replace("La Strada", "💔")
                .replace("The Piano", "💙")
              )
            }).join('   ') : 0}</div>

            <br></br>

            {/* Total plots in database: {this.props.plots.length}
            <br></br> */}
          </Header>

          </div>
        )
      }
    }

    export default CreateStoryFormSelectGenre
