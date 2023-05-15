import React, { Component } from 'react'
import { extractLocations, getEvents } from './api'
import EventList from './EventList'
import CitySearch from './CitySearch'
import NumberOfEvents from './NumberOfEvents'

class App extends Component {
  state = { events: [], locations: [] }

  componentDidMount() {
    this.mounted = true
    getEvents().then((events = []) => {
      console.log(events)
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) })
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  updateEvents = location => {
    getEvents().then(events => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter(event => event.location === location)
      this.setState({ events: locationEvents })
    })
  }

  render() {
    return (
      <div className="app">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    )
  }
}

export default App