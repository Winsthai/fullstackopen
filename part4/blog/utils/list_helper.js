const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentBlog) => accumulator + currentBlog.likes, 0)
}

module.exports = {
    dummy,
    totalLikes
}