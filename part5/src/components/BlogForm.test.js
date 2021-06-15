import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const create = jest.fn()

  const comp = render(
    <BlogForm create={create} />
  )

  const inputform = comp.container.querySelector('#title')
  const form = comp.container.querySelector('form')

  fireEvent.change(inputform, {
    target: { value: 'Go To Statement Considered Harmful' }
  })
  fireEvent.submit(form)

  expect(create.mock.calls).toHaveLength(1)
  expect(create.mock.calls[0][0].title).toBe('Go To Statement Considered Harmful' )
})
