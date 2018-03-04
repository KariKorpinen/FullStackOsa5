import React from 'react'

const SimpleBlog = ({ blog }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      
    </div>
  </div>
)

export default SimpleBlog
