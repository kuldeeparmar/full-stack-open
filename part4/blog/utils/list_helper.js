const dummy = (array) => {
  console.log(array)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator,current) => {
    return accumulator + current.likes
  }

  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  let blog = null
  for(let i = 0; i < blogs.length ;i++)
  {
    if(blog  === null || blog.likes < blogs[i].likes){
      blog = blogs[i]
    }
  }

  return blog
}


const mostBlogs = (blogs) => {
  const blogCounts = {}

  for(const blog of blogs){
    const author = blog.author
    blogCounts[author] = (blogCounts[author] || 0) + 1
  }

  let maxBlogs = 0
  let topAuthor = ''

  for(const [author,counts] of Object.entries(blogCounts)) {
    if(maxBlogs < counts) {
      maxBlogs = counts
      topAuthor = author
    }
  }

  return { author : topAuthor , blogs : maxBlogs }

}

const mostLikes = (blogs) => {
  const likeCounts = {}

  for(const blog of blogs) {
    const author = blog.author
    likeCounts[author] = (likeCounts[author] || 0) + blog.likes
  }

  let maxLikes = 0
  let topAuthor = ''

  for(const [author,counts] of Object.entries(likeCounts)) {
    if(counts > maxLikes) {
      maxLikes = counts
      topAuthor = author
    }
  }

  return { author : topAuthor , likes : maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}