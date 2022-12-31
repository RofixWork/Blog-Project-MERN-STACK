import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  REDIRECT_FALSE,
  removePost,
  REMOVE_MESSAGES,
  REMOVE_POST,
} from "../../app/slices/postSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import PageTitle from "../helpers/PageTitle";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";
import Container from "../helpers/Container";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import moment from "moment";
import { AUTH_REDIRECT_FALSE } from "../../app/slices/authSlice";
const Dashboard = () => {
  // selector
  const {
    redirect,
    post_created,
    isLoading,
    posts,
    counts,
    limit,
    post_updated_success,
    edit_image_success,
    delete_post_success,
  } = useSelector((state) => state.post);
  const {
    user,
    redirect: authRedirect,
    edit_name_success,
  } = useSelector((state) => state.auth);
  // dispatch
  const dispatch = useDispatch();

  // naviagte
  const navigate = useNavigate();

  // state = index
  const [pageNumber, setPageNumber] = useState(1);

  // delete post
  const deletePostUI = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want delete this post?"
    );
    if (confirmDelete) {
      dispatch(removePost(id)).then((data) => {
        console.log(data);
        toast.success(data.payload);
        // fetch posts
        dispatch(fetchPosts(pageNumber));
      });
    }
  };

  useEffect(() => {
    // fetch posts
    dispatch(fetchPosts(pageNumber));

    if (post_updated_success) {
      toast.success(post_updated_success);
    }

    if (edit_image_success) {
      toast.success(edit_image_success);
    }

    if (edit_name_success) {
      toast.success(edit_name_success);
    }

    // remove post
    dispatch(REMOVE_POST());

    if (redirect) {
      dispatch(REDIRECT_FALSE());
    }
    if (post_created) {
      toast.success(post_created);
      dispatch(REMOVE_MESSAGES());
    }

    if (authRedirect) {
      dispatch(AUTH_REDIRECT_FALSE());
    }
  }, [pageNumber]);

  return (
    <>
      <PageTitle title="dashboard" desc="user dashboard" />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
      />
      {/* posts */}
      <Container>
        <Wrapper>
          <Posts>
            <Post>Settings</Post>
            <Post>
              <Desc to={`/edit_name/${user.id}`}>Change Name</Desc>
            </Post>
            <Post>
              <Desc>Change Password</Desc>
            </Post>
          </Posts>
          {!isLoading ? (
            posts.length ? (
              <div>
                <Posts>
                  {posts.map((post) => {
                    return (
                      <Post key={post._id}>
                        <Title>
                          {post.title}
                          <span>({moment(post.updatedAt).fromNow()})</span>
                        </Title>
                        <Icons>
                          <BsCardImage
                            onClick={() => navigate(`/edit-image/${post._id}`)}
                            fontSize={17}
                            cursor="pointer"
                            color="#111"
                          />
                          <FaRegEdit
                            onClick={() => navigate(`/edit/${post._id}`)}
                            cursor="pointer"
                            fontSize={17}
                            color="green"
                          />
                          <FaTrash
                            onClick={() => deletePostUI(post._id)}
                            cursor="pointer"
                            fontSize={17}
                            color="crimson"
                          />
                        </Icons>
                      </Post>
                    );
                  })}
                </Posts>
                <Pagination
                  posts={posts}
                  limit={limit}
                  counts={counts}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              </div>
            ) : (
              <p>don't have any posts...</p>
            )
          ) : (
            <Loader />
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  padding: 80px 0;
  display: grid;
  grid-template-columns: 300px 1fr;
  column-gap: 14px;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    row-gap: 14px;
  }
`;
const Desc = styled(Link)`
  font-size: 13px;
  color: #111;
  font-weight: 400;
`;
const Posts = styled.ul`
  border: 0.1px solid #e5e4e4;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const Post = styled.li`
  border-bottom: 0.1px solid #e5e4e4;

  padding: 12px 10px;
  background-color: white;
  display: block;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom: none;
  }
`;
const Title = styled(Link)`
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: lowercase;
  span {
    font-size: 12px;
    display: inline-block;
    margin-left: 5px;
    color: #666;
  }

  &::first-letter {
    text-transform: uppercase;
  }

  &:hover {
    color: #111;
  }
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
