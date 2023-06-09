import React from 'react'
import { shallow } from 'enzyme'
import Event from '../Event'
import { mockData } from '../mock-data'

describe('<Event /> component', () => {
  let EventWrapper
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />)
  })

  test('renders event correctly', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1)
  })

  test('details button toggles event details on/off', () => {
    const detailsButton = EventWrapper.find('.details-btn')
    expect(detailsButton.text()).toBe('Show Details')

    detailsButton.simulate('click')
    expect(EventWrapper.find('.event__Details')).toHaveLength(1)
    // need to re-find button node for text to update
    expect(EventWrapper.find('.details-btn').text()).toBe('Hide Details')
  })
})
