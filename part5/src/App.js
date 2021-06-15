import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [allblo, setallblo] = useState([])
  const [userna, setuserna] = useState('')
  const [password, setPassword] = useState('')
  const [errormess, seterrormess] = useState(null)
  const [successmess, setsuccessmess] = useState(null)
  const [user, setUser] = useState(null)

  const blogref = React.createRef()

  useEffect(() => {
    const logged = window.localStorage.getItem('loggedBlogappUser')
    if (logged) {
      const user = JSON.parse(logged)
      setUser(user)
      blogService.setToken(user.token)
      getall()
    }
  }, [])

  const getall = async () => {
    const blogs = await blogService.getAll()
    setallblo(blogs)
  }

  const handlogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        userna, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setuserna('')
      setPassword('')
    } catch (exception) {
      seterrormess('Wrong credentials')
      setsuccessmess(null)
      setTimeout(() => {
        seterrormess(null)
      }, 5000)
    }
  }

  const handlogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const create = async (BlogToAdd) => {
    try {
      blogref.current.toggleVisibility()
      const createdBlog = await blogService
        .create(BlogToAdd)
      setsuccessmess(
        `Blog ${BlogToAdd.title} was successfully added`
      )
      setallblo(allblo.concat(createdBlog))
      seterrormess(null)
      setTimeout(() => {
        setsuccessmess(null)
      }, 5000)
    } catch(exception) {
      seterrormess(
        `Cannot add blog ${BlogToAdd.title}`
      )
      setsuccessmess(null)
      setTimeout(() => {
        setsuccessmess(null)
      }, 5000)
    }
  }

  const upd = async (BlogToUpdate) => {
    try {
      const updblog = await blogService
        .update(BlogToUpdate)
      setsuccessmess(
        `Blog ${BlogToUpdate.title} was successfully updated`
      )
      setallblo(allblo.map(blog => blog.id !== BlogToUpdate.id ? blog : updblog))
      seterrormess(null)
      setTimeout(() => {
        setsuccessmess(null)
      }, 5000)
    } catch(exception) {
      seterrormess(
        `Cannot update blog ${BlogToUpdate.title}`
      )
      setsuccessmess(null)
      setTimeout(() => {
        setsuccessmess(null)
      }, 5000)
    }
  }

  const del = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService
          .remove(BlogToDelete.id)
        setsuccessmess(
          `Blog ${BlogToDelete.title} was successfully deleted`
        )
        setallblo(allblo.filter(blog => blog.id !== BlogToDelete.id))
        seterrormess(null)
        setTimeout(() => {
          setsuccessmess(null)
        }, 5000)
      }
    } catch(exception) {
      seterrormess(
        `Cannot delete blog ${BlogToDelete.title}`
      )
      setsuccessmess(null)
      setTimeout(() => {
        setsuccessmess(null)
      }, 5000)
    }
  }

  const like = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>Blogs</h2>
      <Notification errormess={errormess} successmess={successmess} />
      {user === null ?
        <LoginForm
          handlogin={handlogin}
          userna={userna}
          setuserna={setuserna}
          setPassword={setPassword}
          password={password}
        /> :
        <div>
          <p>{user.name} logged in<button onClick={handlogout} type="submit">logout</button></p>
          <Togglable buttonLabel="Add new blog" ref={blogref}>
            <BlogForm
              create={create}
            />
          </Togglable>
          {allblo.sort(like).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              upd={upd}
              del={del}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
