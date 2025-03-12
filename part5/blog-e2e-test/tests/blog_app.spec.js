const { test,expect } = require('@playwright/test')
const { loginUser, createBlog } = require('./helper')

test.describe('Blog app', () => {
  
  test.beforeEach(async ({ page,request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data : {
        name : 'root',
        username : 'root',
        password : 'root',
      }
    })
    await request.post('http://localhost:5173/api/users', {
      data : {
        name : 'lalu',
        username : 'lalu',
        password : 'lalu',
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
   await page.getByRole('button',{ name : 'login' }).click()
   await expect(page.getByText('cancel')).toBeVisible()
  })

  test.describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      await loginUser(page,'root','root')
      await expect(page.getByText('root is logged-inlogout')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginUser(page,'root','wrong')
      await expect(page.getByText('username')).toBeVisible()
    })


    test.describe('When logged in', () => {
      test.beforeEach(async ({ page }) => {
        await loginUser(page,'root','root')
      })
    
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page,'Playwright is simple','Dr. left','http://www.testing.com')
        await expect(page.getByText('Playwright is simpleview')).toBeVisible()
      })

      test.describe('liking the blog',() => {

        test.beforeEach(async({page}) => {
          await createBlog(page,'Liking blog using playwright','Dr. love','http://www.hug.com')
        })

        test('liking a specific blog',async({page}) => {
          await page.getByRole('button',{name : 'view'}).click()
          await page.getByRole('button',{ name : 'like' }).click()

          await expect(page.getByText('likes 1like')).toBeVisible()
        })

        test('deleting a blog', async ({ page }) => {
          page.on('dialog',async (dialog) => {
            await dialog.accept();
          } )
          await page.getByRole('button',{name : 'view'}).click()
          await page.getByRole('button',{ name : 'remove'}).click()
          await expect(page.getByText('Liking blog using playwrighthide')).not.toBeVisible()
        })

        test('blog remove not visible', async({ page }) => {
          await page.getByRole('button', { name : 'logout'}).click()
          await loginUser(page,'lalu','lalu')
          await page.getByRole('button',{name : 'view'}).click()
          
          await expect(page.getByText('remove')).not.toBeVisible()

        })
      })
    })
  })
})