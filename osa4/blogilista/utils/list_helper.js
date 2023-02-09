const dummy = (blogs) => {
    return 1
  }
  


const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
      return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (prev, curr) => {
      return (prev.likes > curr.likes) ? prev : curr
  }

  if (blogs.length ===0 ){
    return []
  }else{
    return blogs.reduce(reducer)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
  }