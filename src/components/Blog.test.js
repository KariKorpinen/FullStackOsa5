import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog'

//describe.only('<Blog />', () => {
 it('renders title, author ja likes', () => {
//    console.log('renders kk')
    const blog = {
      //content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Hermanni',
      likes: 5
    }
    console.log('renders kk1 ', blog)
    const blog2 = SimpleBlog(blog)
    console.log('renders kk2 ', blog2)
    
    //<form onSubmit={onSubmit} >
    //   <input />
    //   <button type="submit">Submit</button>
    //</form>

    //console.log('renders kk2 ', blog)
    const blogComponent = shallow(<Blog blog={blog} />)
    //console.log('blogcomponentti kk ' , blogComponent)
    //console.log('blogcomponentti kk ')
    //const contentDiv = blogComponent.find('.content')
    const contentDiv = blogComponent.find('.title')
    //console.log('contentDiv kk ' , contentDiv)
    expect(contentDiv.text()).toContain(blog.title)
    //console.log(contentDiv.debug())
    
  //})
})

it('clicking the button calls event handler once', () => {
    const blog = {
      content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      important: true
    }
   // console.log('blog ', blog)
    const mockHandler = jest.fn()

    //console.log('mockhandler ', mockHandler)
  
    const blogComponent = shallow(
      <Blog
        blog={blog}
        toggleImportance={mockHandler}
      />
    )
    //console.log('blogComponent  ', blogComponent)
    const button = blockComponent.find('button')
    //console.log('button  ', button.length)
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(1)
  })
  