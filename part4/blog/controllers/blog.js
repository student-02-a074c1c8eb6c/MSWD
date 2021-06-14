const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const tn = request.tn
    const decotn = jwt.verify(tn, process.env.SECRET)

    const user = await User.findById(decotn.id)

    if (!body.likes) {
        body.likes = 0
    }

    if (!body.comments) {
        body.comments = []
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments,
        user: user._id
    })

    try {
        const sdblog = await blog.save()
        logger.info(`added ${blog.title} to the blog list`)
        user.blogs = user.blogs.concat(sdblog._id)
        await user.save()
        logger.info(`blog linked to user ${user.username}`)
        response.json(sdblog.toJSON())
    } catch(exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const tn = request.tn
    const decotn = jwt.verify(tn, process.env.SECRET)

    const user = await User.findById(decotn.id)

    const blogdel = await Blog.findById(request.params.id)

    if ( blogdel.user._id.toString() === user._id.toString() ) {
        try {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
          } catch (exception) {
            next(exception)
          }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }
  })

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }

    if (!body.comments) {
        body.comments = []
    }

    const tn = request.tn
    const decotn = jwt.verify(tn, process.env.SECRET)
    const user = await User.findById(decotn.id)

    const blogupd = await Blog.findById(request.params.id)

    if ( blogupd.user._id.toString() === user._id.toString() ) {
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments,
        }

        try {
            const upblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            logger.info(`blog ${blog.title} successfully updated`)
            response.json(upblog.toJSON())
        } catch (exception) {
            next(exception)
        }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }
})

module.exports = blogRouter
