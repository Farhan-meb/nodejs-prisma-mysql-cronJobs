const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { PrismaClient, prisma } = require('@prisma/client');
const { Post } = new PrismaClient();

const createPost = catchAsync(async (req,res,next) => {
    const { title, post, isPublished, user_id } = req.body;
    
    await Post.create({
        data : {
            title,
            post,
            isPublished,
            user_id
        }
    })
    
    res.status(201).json({
        message: "Post created succesfully!",
    })
})

const updatePost = catchAsync(async(req,res,next) => {
    const post_id = req.params.post_id * 1;
    const { title, post, isPublished } = req.body;
    
    const doesExist = await Post.findUnique({
        where: {
            id: post_id
        }
    })

    if(doesExist === null){
        return next(new AppError('Post does not exist with given id!'))
    }

    await Post.update({
        where: {
            id: post_id
        },
        data: {
            title, 
            post,
            isPublished
        }
    })

    res.status(204).json({
        message: "Post updated succesfully!"
    })
})

const getPosts = catchAsync(async(req,res,next) => {
    const posts = await Post.findMany({});
    res.status(200).json({
        posts,
    })
})

module.exports = { createPost, updatePost, getPosts }

