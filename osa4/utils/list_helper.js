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

module.exports = {
  dummy,
  totalLikes,
};
