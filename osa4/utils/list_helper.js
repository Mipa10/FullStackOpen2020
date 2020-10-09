const _ = require('lodash')


const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length) {
    return 0;
  }
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    const reducer = (most, current) => {
        if(most.likes > current.likes){
            return most
            
            
        }
        return current

    }
    let favorite = blogs.reduce(reducer,blogs[0])
  
    
    favorite = {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
    return favorite
}

const mostBlogs = (blogs) => {
  
  const inOrder = _.countBy(blogs, blog => blog.author)
 
  var maxKey = _.max(Object.keys(inOrder))
  var maxValue = _.max(Object.values(inOrder))

  const response = {
    author: maxKey,
    blogs: maxValue
  }
  return response
  
}

const mostLikes = (blogs) => {
  const group = _.groupBy(blogs, blog => blog.author)
  const sortedByAuthor = _.map(group, author => {
    const likes = author.map( blog => {
       return blog.likes
     })
     const reducer = (sum, item) => {
       return sum + item
     }
     const total = likes.reduce(reducer,0)
     return {
       author: author[0].author,
       likes:total
      }
  })
  const reducer = (most, current) => {
    if(most.likes > current.likes){
        return most  
    }
    return current

}
let favorite = sortedByAuthor.reduce(reducer,sortedByAuthor[0])

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
