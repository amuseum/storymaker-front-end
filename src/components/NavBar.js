import React, { Component } from 'react'

import { Menu } from 'semantic-ui-react'

import { Link } from 'react-router-dom'


class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { activeItem: 'home' }
  }

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    console.log('NavBar state: ', this.state);

    return (

      <div>
        <Menu inverted >

          <Menu.Item
            as={Link} to="/"
            name='home'
            active={activeItem === 'home'}
            color={'yellow'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link} to="/stories"
            name='stories'
            active={activeItem === 'stories'}
            color={'yellow'}
            onClick={this.handleItemClick}
          />


          <Menu.Menu position='right'>

            <Menu.Item
              as={Link} to="/"
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.logout}
            />

          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default NavBar
