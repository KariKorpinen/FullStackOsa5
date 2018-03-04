const Blog = ({ blog, toggleImportance }) => {
    const label = blog.important ? 'make not important' : 'make important'
    return (
      <div className="wrapper">
        <div className="content">
          {blog.content}
        </div>
        <div>
          <button onClick={toggleImportance}>{label}</button>
        </div>
      </div>
    )
  }