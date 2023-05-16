import React from 'react'
import { mount } from 'enzyme'
import { loadFeature, defineFeature } from 'jest-cucumber'
import App from '../App'
import { mockData } from '../mock-data'

const feature = loadFeature('./src/features/filterEventsByCity.feature')

defineFeature(feature, test => {
  // Feature file has a scenario titled "When user hasn’t searched for a city, show upcoming events from all cities.", but no match found in step definitions. Try adding the following code:
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({
    given,
    when,
    then
  }) => {
    given('user hasn’t searched for any city', () => {})

    let AppWrapper
    when('the user opens the app', () => {
      AppWrapper = mount(<App />)
    })

    then('the user should see the list of upcoming events.', () => {
      AppWrapper.update()
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    })
  })

  // Feature file has a scenario titled "User should see a list of suggestions when they search for a city", but no match found in step definitions. Try adding the following code:
  test('User should see a list of suggestions when they search for a city', ({
    given,
    when,
    then
  }) => {
    given('the main page is open', () => {})

    when('the user starts typing in the city textbox', () => {})

    then(
      'the user should receive a list of cities (suggestions) that match what they’ve typed',
      () => {}
    )
  })

  // Feature file has a scenario titled "User can select a city from the suggested list", but no match found in step definitions. Try adding the following code:
  test('User can select a city from the suggested list', ({
    given,
    and,
    when,
    then
  }) => {
    given('user was typing “Berlin” in the city textbox', () => {})

    and('the list of suggested cities is showing', () => {})

    when(
      'the user selects a city (e.g., “Berlin, Germany”) from the list',
      () => {}
    )

    then(
      'their city should be changed to that city (i.e., “Berlin, Germany”)',
      () => {}
    )

    and(
      'the user should receive a list of upcoming events in that city',
      () => {}
    )
  })
})
