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
      NumberOfEventsWrapper.find('.numberOfEventsInput').prop('value')
    ).toBe(20)
  })

  test('update state when input changes', () => {
    const eventObject = { target: { value: 50 } }
    const numberOfEventsInput = NumberOfEventsWrapper.find(
      '.numberOfEventsInput'
    )
    numberOfEventsInput.simulate('change', eventObject)

    expect(
      NumberOfEventsWrapper.find('.numberOfEventsInput').prop('value')
    ).toBe(50)
  })
})
