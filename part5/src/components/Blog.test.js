import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title:"React patterns",
    author:"Michael Chan",
    url:"https://reactpatterns.com/",
    likes:7
  }

  let updablog = jest.fn()
  let deleblog = jest.fn()

  test('renders title and author', () => {
    const com = render(
      <Blog blog={blog} updateBlog={updablog} deleteBlog={deleblog} />
    )
    expect(com.container).toHaveTextContent(
      'React patterns - Michael Chan'
    )
  })

  test('clicking the view button displays url and number of likes', () => {
    const com = render(
      <Blog blog={blog} updateBlog={updablog} deleteBlog={deleblog} />
    )

    const butt = com.getByText('view')
    fireEvent.click(butt)

    expect(com.container).toHaveTextContent(
      'https://reactpatterns.com/'
    )

    expect(com.container).toHaveTextContent(
      '7'
    )
  })
})
