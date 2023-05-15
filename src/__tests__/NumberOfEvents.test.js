import React from 'react'
import { shallow } from 'enzyme'
import NumberOfEvents from '../NumberOfEvents'

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />)
  })

  test('textbox displays default number of events', () => {
    expect(
      NumberOfEventsWrapper.find('.numberOfEvents input').prop('value')
    ).toBe(32)
  })

  test('update state when input changes', () => {
    const eventObject = { target: { value: 16 } }
    const numberOfEventsInput = NumberOfEventsWrapper.find(
      '.numberOfEvents input'
    )
    numberOfEventsInput.simulate('change', eventObject)

    expect(
      NumberOfEventsWrapper.find('.numberOfEvents input').prop('value')
    ).toBe(16)
  })
})
