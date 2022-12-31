import PageTitle from "../helpers/PageTitle";
import {
  ArrowBack,
  CreatePost,
  Form,
  FormButttonSubmit,
  FormGroup,
  Input,
  Label,
  Length,
  TextArea,
  Title,
  Wrapper,
} from "../components/styles/globals";
import Container from "../helpers/Container";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { getPost, updatePost } from "../../app/slices/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import { BiArrowBack } from "react-icons/bi";
const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, post_updated_error, isLoading, redirect } = useSelector(
    (state) => state.post
  );
  const [state, setState] = useState({
    title: "",
    desc: "",
  });
  const [value, setValue] = useState("");
  const { id } = useParams();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        id,
        state: { ...state, body: value },
      })
    );
  };

  //   get post
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      setState({
        title: post?.title,
        desc: post?.description,
      });

      setValue(post?.body);
    }
  }, [post]);

  useEffect(() => {
    if (post_updated_error) {
      toast.error(post_updated_error.replace(/('|")/gi, ""));
    }
  }, [post_updated_error]);

  useEffect(() => {
    if (redirect) {
      navigate("/dashboard");
    }
  }, [redirect]);
  return (
    <>
      <PageTitle title="Edit Post" desc="update post" />

      {/* toaster */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Form onSubmit={handleUpdatePost}>
            <CreatePost>
              <Wrapper>
                <ArrowBack onClick={() => navigate("/dashboard")}>
                  <BiArrowBack />
                </ArrowBack>
                <Title>Edit a post</Title>
                <FormGroup>
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Post Title..."
                    name="title"
                    value={state.title}
                    onChange={handleChange}
                  />
                </FormGroup>

                {/* quill */}
                <FormGroup>
                  <div>
                    <ReactQuill
                      placeholder="Post Body..."
                      theme="snow"
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="desc">Meta Description</Label>
                  <TextArea
                    defaultValue={state.desc}
                    name="desc"
                    onChange={handleChange}
                  ></TextArea>
                  <Length>
                    {state.desc
                      ? `${state.desc.length} characters`
                      : `${0} characters`}
                  </Length>
                </FormGroup>
                {/* button submit */}
                <FormGroup>
                  <FormButttonSubmit>
                    {isLoading ? "Updating..." : "Update Post"}
                  </FormButttonSubmit>
                </FormGroup>
              </Wrapper>
            </CreatePost>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Edit;
