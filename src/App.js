import React, { Component } from 'react'
import { getEvents } from './api'
import './App.css'
import EventList from './EventList'
import CitySearch from './CitySearch'
import NumberOfEvents from './NumberOfEvents'

class App extends Component {
  state = { events: [], locations: [] }

  updateEvents = location => {
    getEvents().then(events => {
      const locationEvents = events.filter(event => event.location === location)
      this.setState({ events: locationEvents })
    })
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents testProps="hi" />
        <EventList events={this.state.events} />
      </div>
    )
  }
}

export default App
