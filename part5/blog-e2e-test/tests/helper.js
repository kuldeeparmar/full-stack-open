const loginUser = async (page,username,password) => {
  await page.getByRole('button',{ name : 'login' }).click()
  await page.getByRole('textbox').first().fill(username)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button',{ name : 'login' }).click()
}

const createBlog = async (page,title,author,url) => {
  await page.getByRole('button', { name : 'new blog'}).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button',{ name : 'create' }).click()
}

export { loginUser , createBlog }