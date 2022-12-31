import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CLEAR, getAllPosts } from "../../app/slices/homeSlice";
import Loader from "../components/Loader";
import Container from "../helpers/Container";
import PageTitle from "../helpers/PageTitle";
import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, posts, counts, limit } = useSelector(
    (state) => state.home
  );
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    dispatch(getAllPosts(pageNumber));
  }, [pageNumber]);

  useEffect(() => {
    dispatch(CLEAR());
  }, []);
  return (
    <>
      <PageTitle title="Home" desc="home page" />
      <Container>
        <Wrapper>
          {!isLoading ? (
            posts?.length ? (
              <>
                {posts?.map((post) => {
                  const {
                    _id,
                    title,
                    description,
                    image,
                    username,
                    updatedAt,
                    slug,
                  } = post;
                  return (
                    <Post key={_id}>
                      <PostContent>
                        <PostHeader>
                          <h3>{username[0].toUpperCase()}</h3>
                          <div className="user_info">
                            <h4>{username}</h4>
                            <p>{moment(updatedAt).format("MMM Do YY")}</p>
                          </div>
                        </PostHeader>
                        {/* title */}
                        <Title to={`/post_details/${slug}`}>{title}</Title>
                        {/* desc */}
                        <p>{description}</p>
                      </PostContent>
                      <PostImage>
                        <img src={`/images/${image}`} alt={title} />
                      </PostImage>
                    </Post>
                  );
                })}
                <Pagination
                  counts={counts}
                  limit={limit}
                  posts={posts}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              </>
            ) : (
              "no posts"
            )
          ) : (
            <Loader />
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;

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
  display: grid;
  grid-template-columns: 1fr 300px;
  padding: 10px;
`;

const PostContent = styled.div``;

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
  height: 200px;
  & img {
    width: 100%;
    height: 100%;
  }
`;
const Title = styled(Link)`
  font-size: 18px;
  color: #111;
  font-weight: 700;
  margin-bottom: 10px;
`;
