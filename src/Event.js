import React, { Component } from 'react'

class Event extends Component {
  state = { showDetails: false }

  handleOnClick = () => {
    this.setState(state => ({ showDetails: !state.showDetails }))
  }

  render() {
    const { event } = this.props
    const { showDetails } = this.state

    return (
      <div className="event">
        <h2>{event.summary}</h2>
        <p>
          {event.start.dateTime} ({event.start.timeZone})
        </p>
        <p>
          @{event.summary} | {event.location}
        </p>

        {showDetails && (
          <div className="event__Details">{event.description}</div>
        )}

        <button className="details-btn" onClick={this.handleOnClick}>
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>
    )
  }
}
export default Event
