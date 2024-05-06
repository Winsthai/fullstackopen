const dummy = (blogs) => {
    return 1
}

// Returns total amount of likes across all blogs
const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentBlog) => accumulator + currentBlog.likes, 0)
}

// Returns blog with most likes
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { return {} }

    let highestLikesBlog = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > highestLikesBlog.likes) { highestLikesBlog = blog }
    })

    return {
        title: highestLikesBlog.title,
        author: highestLikesBlog.author,
        likes: highestLikesBlog.likes
    }
}

// Returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}

    let map1 = new Map()

    blogs.forEach(x => {
        map1.has(x.author) ? map1.set(x.author, map1.get(x.author) + 1) : map1.set(x.author, 1)
    })
    
    const mostBlogsAuthor = [...map1.entries()].reduce((highestAuthor, currentAuthor) => highestAuthor[1] > currentAuthor[1] ? highestAuthor : currentAuthor)

    return {
        author: mostBlogsAuthor[0],
        blogs: mostBlogsAuthor[1]
    }
}

// Returns the author, whose blog posts have the largest amount of likes
const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}

    let map1 = new Map()

    blogs.forEach(x => {
        map1.has(x.author) ? map1.set(x.author, map1.get(x.author) + x.likes) : map1.set(x.author, x.likes)
    })

    const mostLikesAuthor = [...map1.entries()].reduce((highestAuthor, currentAuthor) => highestAuthor[1] > currentAuthor[1] ? highestAuthor : currentAuthor)

    return {
        author: mostLikesAuthor[0],
        likes: mostLikesAuthor[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}