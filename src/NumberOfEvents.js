import React, { Component } from 'react'

class NumberOfEvents extends Component {
  state = { numberOfEvents: 20 }

  handleOnNumEventsChange = e => {
    this.setState({ numberOfEvents: e.target.value })
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="numberOfEventsInput"
          min={0}
          max={50}
          value={this.state.numberOfEvents}
          onChange={this.handleOnNumEventsChange}
        />
      </div>
    )
  }
}
export default NumberOfEvents
