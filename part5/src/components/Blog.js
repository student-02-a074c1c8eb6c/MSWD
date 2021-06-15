import React , { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const visible = { display: visible ? '' : 'none' }

  const toggvisi = () => {
    setVisible(!visible)
  }

  const button = visible ? 'hide' : 'view'

  const increli = () => {
    const upd = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(upd)
    setBlogObject(upd)
  }

  const remove = () => props.deleteBlog(blog)

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style} className='blog'>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggvisi}>{button}</button></p>
      </div>
      <div style={visible}>
        <p>{blog.url}</p>
        <p>{ blogObject.likes } <button id='like-button' onClick={increli}>like</button></p>
        <button id='remove' onClick={remove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
