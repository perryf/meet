import React, { Component } from 'react'

class NumberOfEvents extends Component {
  state = { numberOfEvents: 32 }

  handleOnNumEventsChange = e => {
    this.setState({ numberOfEvents: e.target.value })
  }

  render() {
    return (
      <div className="numberOfEvents">
        <label>
          Number of Events:{' '}
          <input
            type="number"
            min={0}
            max={32}
            value={this.state.numberOfEvents}
            onChange={this.handleOnNumEventsChange}
          />
        </label>
      </div>
    )
  }
}
export default NumberOfEvents
