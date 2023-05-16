import React, { Component } from 'react'
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'
import { extractLocations, getEvents } from './api'
import EventList from './EventList'
import CitySearch from './CitySearch'
import NumberOfEvents from './NumberOfEvents'

class App extends Component {
  state = {
    events: [],
    locations: []
    // ? is this needed?
    // numberOfEvents
  }

  componentDidMount() {
    this.mounted = true
    getEvents().then((events = []) => {
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

  getData = () => {
    const { locations, events } = this.state
    const data = locations.map(location => {
      const number = events.filter(event => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number }
    })
    return data
  }

  render() {
    const data = this.getData()

    return (
      <div className="app">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
        // ? Needed?
        // updateEvents={this.updateEvents}
        // numberOfEvents={numberOfEvents}
        />
        <ResponsiveContainer height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              type="number"
              dataKey="number"
              name="number of events"
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Meet ups" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>

        <EventList events={this.state.events} />
      </div>
    )
  }
}

export default App
