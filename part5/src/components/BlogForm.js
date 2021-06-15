import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [new, setnew ] = useState('')
  const [newauth, setnewauth ] = useState('')
  const [newurl, setnewurl ] = useState('')

  const title = (event) => {
    setnew(event.target.value)
  }

  const author = (event) => {
    setnewauth(event.target.value)
  }

  const urlchange = (event) => {
    setnewurl(event.target.value)
  }

  const add = (event) => {
    event.preventDefault()
    createBlog({
      title: new,
      author: newauth,
      url: newurl
    })
    setnew('')
    setnewauth('')
    setnewurl('')
  }

  return (
    <form onSubmit={add}>
      <div>
        Title: <input id='title' value={new} onChange={title} />
      </div>
      <div>
        Author: <input id='author' value={newauth} onChange={author} />
      </div>
      <div>
        Url: <input id='url' value={newurl} onChange={urlchange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
