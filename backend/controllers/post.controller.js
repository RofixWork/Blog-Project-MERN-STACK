const formidable = require("formidable");
const postValidate = require("../schema/post-validate");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");
const BadRequest = require("../errors/BadRequest");
const { convert } = require("html-to-text");
const postUpdatedValidate = require("../schema/post-update-validate");
const commentValidate = require("../schema/comment-validate");
const Comment = require("../models/Comment");

// create post
const createPost = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    const { error, value } = postValidate(fields);
    // check fields
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: error.message,
      });
    }

    if (Object.keys(files).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: "Image Post is required",
      });
    } else {
      const file = files.image;

      const fileType = file.mimetype.split("/").at(1).toLowerCase();
      const extensions = ["jpg", "jpeg", "png", "jfif"];
      // check image type
      if (!extensions.includes(fileType)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: false,
          message: `NOT SUPPORTED this extension: ${fileType}`,
        });
      } else {
        file.originalFilename = `${uuidv4()}.${fileType}`;
      }
    }
    const newPath = path.join(
      "D:",
      "MERN STACK Blog rofix",
      "frontend",
      "public",
      "images",
      files.image.originalFilename
    );
    console.log(newPath);
    fs.copyFile(files.image.filepath, newPath, async (err) => {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          message: err.message,
        });
        return;
      }
      const checkSlug = await Post.findOne({
        slug: { $eq: fields.slug },
      });

      if (checkSlug) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: false,
          message: "Please enter another Post URL...",
        });
      }
      // craete new post
      await Post.create({
        title: fields.title,
        body: fields.body,
        description: fields.description,
        slug: fields.slug,
        image: files.image.originalFilename,
        userId: fields.id,
        username: fields.username,
      });
      return res
        .status(StatusCodes.CREATED)
        .json({ status: true, message: "Your post has been created" });
    });
  });
};

// get al posts
const getAllPosts = async (req, res) => {
  const { id } = req.user;
  console.log("posts", id);

  // pagoination
  const page = Number(req.query.page) || 1;
  const limit = 3;
  const skip = (page - 1) * limit;
  // pagoination
  const counts = await Post.find({
    userId: { $eq: id },
  }).countDocuments();

  const posts = await Post.find({
    userId: { $eq: id },
  })
    .skip(skip)
    .limit(limit)
    .sort("-updatedAt");

  res.status(StatusCodes.OK).json({ status: true, posts, counts, limit });
};

// get post
const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOne({
    _id: { $eq: id },
  });

  if (!post) {
    throw new BadRequest(`not exist any post by this id => ${id}`);
  }

  res.status(StatusCodes.OK).json({
    status: true,
    post,
  });
};

// update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { body } = req.body;
  const checkBody = convert(body);
  const { error, value } = postUpdatedValidate({
    ...req.body,
    body: checkBody,
  });

  if (error) {
    throw new BadRequest(error.message);
  }

  // update post
  await Post.findOneAndUpdate(
    {
      _id: { $eq: id },
      userId: { $eq: userId },
    },
    { ...value, description: value.desc, body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({
    status: true,
    message: "Your post has been updated successfully...",
  });
};

// get post image
const getPostImage = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  console.log("image post", id);

  const post = await Post.findOne({
    _id: { $eq: id },
    userId: { $eq: userId },
  }).select("image");

  if (!post) {
    throw new BadRequest(`not exist any post by this id => ${id}`);
  }

  res.status(StatusCodes.OK).json({
    status: true,
    image: post.image,
  });
};

// update
const updatePostImage = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    // check files
    if (Object.keys(files).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: "Please choose an image",
      });
    } else {
      // check type
      const types = ["jpg", "jpeg", "png", "jfif"];
      const fileType = files.image.mimetype.split("/").at(1);
      if (!types.includes(fileType)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: false,
          message: `this Extension not SUPPORTED (${fileType})`,
        });
      } else {
        files.image.originalFilename = `${uuidv4()}.${fileType}`;
      }
    }
    const newPath = path.join(
      "D:",
      "MERN STACK Blog rofix",
      "frontend",
      "public",
      "images",
      files.image.originalFilename
    );
    fs.copyFile(files.image.filepath, newPath, async (err) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: false,
          message: err.message,
        });
      } else {
        const post = await Post.findOneAndUpdate(
          {
            _id: { $eq: id },
            userId: { $eq: userId },
          },
          {
            image: files.image.originalFilename,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return res.status(StatusCodes.OK).json({
          status: true,
          message: "Post Image has been Updated",
        });
      }
    });
  });
};

// deletePost
const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const post = await Post.findOne({
    _id: { $eq: id },
    userId: { $eq: userId },
  });

  if (!post) {
    throw new BadRequest(`not exist any post by this id => ${id}`);
  }

  await Post.findOneAndDelete({
    _id: { $eq: id },
    userId: { $eq: userId },
  });

  res.status(StatusCodes.OK).json({
    status: true,
    message: "Your post has been deleted",
  });
};

// const HOMEPOSTS
const homePosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  const postsCount = await Post.find({}).countDocuments();
  const posts = await Post.find({}).skip(skip).limit(limit).sort("-updatedAt");

  res.status(StatusCodes.OK).json({
    status: true,
    counts: postsCount,
    limit,
    posts,
  });
};

// home post
const homePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    slug: { $eq: id },
  });

  if (!post) {
    throw new BadRequest(`not exist any post by this id => ${id}`);
  }

  res.status(StatusCodes.OK).json({
    succes: true,
    post,
  });
};

// create comment
const createComment = async (req, res) => {
  const { error, value } = commentValidate(req.body);

  if (error) {
    throw new BadRequest(error.message);
  }
  await Comment.create(value);
  res.status(StatusCodes.OK).json({
    status: true,
    message: "Your comment has been created",
  });
};

// fetch comments
const fetchComment = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({
    postId: { $eq: id },
  }).sort("-updatedAt");

  res.status(StatusCodes.OK).json({
    status: true,
    comments,
  });
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  getPost,
  updatePostImage,
  getPostImage,
  deletePost,
  homePosts,
  homePost,
  createComment,
  fetchComment,
};
