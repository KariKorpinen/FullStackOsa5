import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import Togglable from './components/Togglable'
import SimpleBlog from './components/SimpleBlog'

class App extends React.Component {
  //constructor(props) {
  constructor() {
  //super(props)
    super()
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      added: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 
  componentWillMount() {
    blogService
      .getAll()
      .then(blogs => {
        this.setState({ blogs })
      })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }    
  }

  addBlog = (event) => {
    console.log('title event ',event )
    
    event.preventDefault()
    console.log('title eka  ',this.state.title )
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      likes: 0,
      user: this.state.user.name
      
    }
    console.log('title ',blogObject )

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: ''
        })
      })
      this.setState({
        added: 'a new blog '  + this.state.title + ' by ' + this.state.author + ' added'        
        //added: 'lisätty' + this.state.title 
      })
      setTimeout(() => {
        this.setState({ added: null })
      }, 5000)
  }
//'käyttäjätunnus tai salasana virheellinen',
  toggleImportanceOf = (id) => {
    return () => {
      const blog = this.state.blogs.find(n => n.id === id)
      const changedBlog = { ...blog, important: !blog.important }

      blogService
        .update(id, changedBlog)
        .then(changedBlog => {
          this.setState({
            blogs: this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
          })
        })
        .catch(error => {
          this.setState({
            error: `muistiinpano '${blog.content}' on jo valitettavasti poistettu palvelimelta`,
            blogs: this.state.blogs.filter(n => n.id !== id)
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 50000)
        })
    }
  }
  
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log('user token ', user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('logOut with', this.state.user = null) 
    
 }    

 updateLike = (event) => {
  console.log('update like ',event )
  
  event.preventDefault()
  console.log('title eka  ',this.state.title )
  
}

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }

  handleUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
    //console.log('visible press')
  }
  deleteItem = ()=>{
    console.log('delete ')
    if (window.confirm("Do you really want delete item?")) { 
      window.open("index.html", "Thanks for Visiting!");
    }
  }

  likeItem = ()=>{
    console.log('delete ')
    if (window.confirm("Do you really want like this item?")) { 
      window.open("index.html", "Thanks for Visiting!");
    }

  }  
  simpleLog = () => {
    SimpleBlog(Blog, 0)  
  }
    
  render() {
   //console.log('this state user ', this.state.user)
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const sortBlogObject = () => {
      
      let numbers = [].concat(this.state.blogs)
       .sort((a,b)=> a.likes > b.likes)
       .reverse().map((blog, i) =>
       <Togglable buttonLabel= {blog.title} ref={component => this.t2 = component}>
       <div key={i}> {blog.title}<br />{blog.author} <br />{blog.url} <br /> {blog.likes} likes <button onClick={this.likeItem}>
            Like
          </button>
        <br />
        added by käyttäjä <br /><button onClick={this.deleteItem}>
            Delete
          </button>
        </div>
       </Togglable>
      );
     
      return numbers
    }   
    const blogsToShow =
    this.state.showAll ?
    this.state.blogs :
    this.state.blogs.filter(blog => blog.important === false)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
    
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }
    
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }
    
    //}
    const blogForm = () => (
      <div>
       
        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.addBlog}>
        <label htmlFor="title">title</label>
          <input 
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <br />
          <label htmlFor="author">author</label>
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleAuthorChange}
          />
          <br />
          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleUrlChange}
          />
          <button>tallenna</button>
        </form>
      </div>
    )
    const logOutForm = () => (
        <form onSubmit={this.logOut}>
          <button>logout</button>
        </form>
    )
    

    return (
      <div>
        <Notification message={this.state.added} />
        <Notification message={this.state.error} />

        { this.state.user === null ?
          loginForm() :
          <div>
            <br />
            {this.state.user.name} logged in
            {logOutForm()}
            <Togglable buttonLabel="Lisää blogi" ref={component => this.t1 = component}>
           Lisää blogi
        
            {blogForm()}
            </Togglable>    
           
          </div>
          
        }
       <div>
         
       </div>

        
        <div style={blogStyle}>
           {sortBlogObject()}
        </div>
        
      </div>
    )
  }
}

export default App;
