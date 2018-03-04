import React from 'react'
import Togglable from './Togglable'

//const Blog = ({blog}) => (
//  <div>
//    {blog.title} {blog.author}
//  </div>  
//)
const updateLike = (event) => {
  console.log('update like ', event)
 
  event.preventDefault()
  console.log('title eka  ',this.state.title )
} 

//export default Blog
const Blog = ({ blog, toggleImportance }) => {
  
  
  // toggleVisible = () => {
 //   this.setState({ showAll: !this.state.showAll })
 //   console.log('visible press')
 // }
  //console.log('blog sisällä ', blog)
  //this.setState({ this.state.bgColor:'white'})
  //const label = blog.important ? 'make not important' : 'make important'
  //////////////////
  //{blog.likes} likes <button onClick={onClick}>
  //         Like
  //        </button>


  return (
    <li className="blog">
    
     <Togglable buttonLabel= {blog.title} ref={component => this.t2 = component}>
      {blog.title} <br />
      
      {blog.author} <br />
      {blog.url} <br />
      {blog.likes} likes          
        <br />
      </Togglable>
    </li>
   )
}

export default Blog