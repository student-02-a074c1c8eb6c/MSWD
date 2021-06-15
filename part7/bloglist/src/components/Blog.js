import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const dch = useDispatch()

  const [visible, setVisible] = useState(false)
  const show = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    dch(like(blog))
    dch(
      setNotification(`Blog ${blog.title} successfully updated`, 'success', 5)
    )
  }

  const rembl = () => {
    dch(deleteBlog(blog.id))
    dch(
      setNotification(`Blog ${blog.title} successfully deleted`, 'success', 5)
    )
  }

  return (
    <tr>
      <td>
        <div className="blog">
          <div>
            <p>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>{' '}
              <Button variant="primary" onClick={toggleVisibility}>{buttonLabel}</Button>
            </p>
          </div>
          <div style={show}>
            <p>{blog.url}</p>
            <p>
              {blog.likes}{' '}
              <Button variant="primary" id="like-button" onClick={increaseLikes}>
                like
              </Button>
            </p>
            <Button variant="danger" id="remove" onClick={rembl}>
              remove
            </Button>
          </div>
        </div>
      </td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
