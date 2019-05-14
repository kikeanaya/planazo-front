import React, { Component } from 'react'
import Stories from 'react-insta-stories'
 
class InstaStories extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stories: props.images
      }
}

  render () {
    return (
      <Stories 
        stories={this.state.stories}
        defaultInterval={3000}
        width={287}
        height={511}
      />
    )
  }
}
 
export default InstaStories