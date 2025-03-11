import { render,screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

const blog = {
  "title": "Physics Anomaly",
  "author": "Dr. Gauss",
  "url": "http://www.worldphysics.com",
  "likes": 109,
  "user": {
    "username": "kuldeep",
    "name": "parmar",
    "id": "67c6d64bacb51e98babc6181"
  },
  "id": "67c6edd511623cb8a0f428b4"
}



describe('<Blog />', () => {
  let container
  let handleLikeUpdate = vi.fn()
  beforeEach(() => {
    container = render(<Blog blog={blog} handleLikeUpdate={handleLikeUpdate}/>).container
  })


  test('rendering the blog title',() => {
    const element = screen.getByText("Physics Anomaly")
    screen.debug(element)
  })
  
  test('url and likes not shown first',() => {
  
    const div = container.querySelector('.toggleDetails')
  
    screen.debug(div)
  
    expect(div).toHaveStyle('display:none')
  
  })

  test('button is clicked and the detail show', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')
    screen.debug(button)
    await user.click(button)

    const div = container.querySelector('.toggleDetails')
    expect(div).not.toHaveStyle('display:none')

  })

  test('when like is clicked', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('like')
    screen.debug(button)
    await user.click(button)

    await user.click(button)

    expect(handleLikeUpdate.mock.calls).toHaveLength(2)
  })




})