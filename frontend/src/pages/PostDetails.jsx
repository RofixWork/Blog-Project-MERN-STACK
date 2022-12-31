import React, { useEffect, useState } from "react";
import PageTitle from "../helpers/PageTitle";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  fetchComments,
  getPost,
} from "../../app/slices/homeSlice";
import styled from "styled-components";
import Container from "../helpers/Container";
import { htmlToText } from "html-to-text";
import moment from "moment";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
const PostDetails = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading, comment_error, comments } = useSelector(
    (state) => state.home
  );
  const { user } = useSelector((state) => state.auth);

  // comment
  const handleComment = (e) => {
    e.preventDefault();
    const state = {
      comment,
      username: user?.username,
      userId: user?.id,
      postId: post?._id,
    };
    dispatch(createComment({ id: post._id, state }));

    setComment("");
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (comment_error) {
      toast.error(comment_error.replace(/('|")/gi, ""));
    }
  }, [comment_error]);

  useEffect(() => {
    if (post) {
      dispatch(fetchComments(post?._id));
    }
  }, [post]);
  return (
    <>
      <PageTitle title="Details" desc="post details..." />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
      />
      <Container>
        <Wrapper>
          {isLoading && post ? (
            <Loader />
          ) : (
            <>
              {post ? (
                <Post>
                  <PostContent>
                    <PostHeader>
                      <h3>{post?.username[0].toUpperCase()}</h3>
                      <div className="user_info">
                        <h4>{post?.username}</h4>
                        <p>{moment(post?.updatedAt).format("MMM Do YY")}</p>
                      </div>
                    </PostHeader>
                    {/* title */}
                    <Title>{post?.title}</Title>
                    {/* desc */}
                    <p>{htmlToText(post?.body)}</p>
                  </PostContent>
                  <PostImage>
                    <img src={`/images/${post?.image}`} alt={post?.title} />
                  </PostImage>
                  {/* comments */}
                  <CommentWrapper>
                    {comments?.length ? (
                      comments.map((comment) => {
                        return (
                          <Comment key={comment._id}>
                            <div>
                              <h3>{comment?.username}</h3>
                              <h4>{comment?.comment}</h4>
                            </div>
                            <p>{moment(comment?.updatedAt).fromNow()}</p>
                          </Comment>
                        );
                      })
                    ) : (
                      <h5>No Comments Yet</h5>
                    )}
                  </CommentWrapper>
                  {/* comments */}
                  {/* create comment */}
                  {user ? (
                    <Form onSubmit={handleComment}>
                      <Input
                        placeholder="Write your comment here..."
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      {comment ? (
                        <CommentButton>Post Comment</CommentButton>
                      ) : null}
                    </Form>
                  ) : null}
                </Post>
              ) : null}
            </>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default PostDetails;

const Wrapper = styled.section`
  padding-block: 80px;
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Post = styled.article`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 10px;
`;

const PostContent = styled.div`
  padding: 10px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  & h3 {
    background-color: #ccc;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    color: white;
    border-radius: 50%;
    font-size: 14px;
  }

  & h4 {
    font-size: 16px;
    font-weight: 500;
    &::first-letter {
      text-transform: capitalize;
    }
  }

  & p {
    font-size: 12px;
    color: #666;
  }
`;
const PostImage = styled.div`
  height: 400px;
  & img {
    width: 100%;
    height: 100%;
  }
`;
const Title = styled.h3`
  font-size: 22px;
  color: #111;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Form = styled.form`
  padding-top: 0px;
`;
const Input = styled.input`
  padding: 8px 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;
const CommentButton = styled.button.attrs({
  type: "submit",
})`
  display: block;
  background-color: cornflowerblue;
  color: white;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const CommentWrapper = styled.div`
  padding: 40px 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
`;
const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
  }

  & h3 {
    font-size: 14px;
    color: cornflowerblue;
  }
  & h4 {
    font-size: 14px;
    font-weight: 500;
  }

  & p {
    font-size: 12px;
    color: #666;
  }
`;
