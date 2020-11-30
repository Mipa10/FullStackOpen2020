const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_NEW_BLOG':
      return [...state, action.data]
    case 'ADD_LIKE':
      const id = action.data.id
      return state.map((blog) => (blog.id === id ? action.data : blog))
    case 'REMOVE':
      const iidee = action.data.id
      return state.filter(element => element.id !== iidee)
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export const addNewBlog = (blog) => {
  return {
    type: 'ADD_NEW_BLOG',
    data: blog,
  }
}

export const addLike = (blog) => {
  return { type: 'ADD_LIKE', data: blog }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE',
    data: blog,
  }
}

export default blogReducer
