const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentBlog) => accumulator + currentBlog.likes, 0)
}

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}