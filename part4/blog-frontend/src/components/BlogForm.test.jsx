import { render,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe } from "vitest"
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container
  let createBlog = vi.fn()

  beforeEach(() => {
    container = render(<BlogForm createBlog={createBlog} />)
  })

  
  test('form testing the form',async () => {
    const input = screen.getByPlaceholderText('blog title')
    const button = screen.getByText('create')
    screen.debug(button)
    screen.debug(input)
    const user = userEvent.setup()

    await user.type(input,'testing the form')

    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)

    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls[0][0].title).toBe('testing the form')
  })
})