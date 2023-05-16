import React, { Component } from 'react'
import { ErrorAlert } from './Alert'

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: ''
  }

  handleOnNumEventsChange = e => {
    const value = Number(e.target.value)
    const invalidNumber = typeof value !== 'number' || value < 0 || value > 32

    this.setState({
      numberOfEvents: value,
      errorText: invalidNumber ? 'The number you entered is invalid' : ''
    })
  }

  render() {
    const { errorText, numberOfEvents } = this.state

    return (
      <div className="numberOfEvents">
        {errorText && <ErrorAlert text={errorText} />}
        <label>
          Number of Events:{' '}
          <input
            type="number"
            min={0}
            max={32}
            value={numberOfEvents}
            onChange={this.handleOnNumEventsChange}
          />
        </label>
      </div>
    )
  }
}
export default NumberOfEvents
