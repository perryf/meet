import React, { Component } from 'react'

class Event extends Component {
  state = { showDetails: false }

  handleOnClick = () => {
    this.setState(state => ({ showDetails: !state.showDetails }))
  }

  render() {
    const { showDetails } = this.state

    return (
      <div className="Event">
        {showDetails && <div className="details-info"></div>}

        <button className="details-button" onClick={this.handleOnClick}>
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>
    )
  }
}
export default Event
