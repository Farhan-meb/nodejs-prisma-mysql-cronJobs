const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { PrismaClient, prisma } = require('@prisma/client');
const { User } = new PrismaClient();

const getUsers = catchAsync(async (req, res, next) => {
    const users = await User.findMany({
        select: {
            username: true,
            role: true,
            posts: true,
        },
        //skip: 1,
        //take: 2,
        orderBy: {
            id: 'desc',
        },
    });

    res.status(200).json({
        users,
    });
});

// testing better comment
// ! warning and error comments
// ? query comments
// TODO todo comments

const createUser = catchAsync(async (req, res, next) => {
    const { username, role } = req.body;
    console.log(
        '🚀 ~ file: user.controller.js ~ line 32 ~ createUser ~ role',
        role
    );

    if (username === null || role === null) {
        return next(new AppError('Username & Role is required!'), 4000);
    }

    await User.create({
        data: {
            username,
            role,
        },
    });

    res.status(201).json({
        message: 'User created successfully!',
    });
});

module.exports = { getUsers, createUser };
