import React, { useEffect, useState } from "react";
import PageTitle from "../helpers/PageTitle";
import styled from "styled-components";
import Container from "../helpers/Container";
import { BsCardImage } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import urlSlug from "url-slug";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../app/slices/postSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  CreatePost,
  FileLabel,
  Form,
  FormButttonSubmit,
  FormGroup,
  ImagePreview,
  Input,
  Label,
  Length,
  TextArea,
  Title,
  UpdateButton,
  Wrapper,
} from "../components/styles/globals";
const Create = () => {
  // selector
  const {
    user: { id, username },
  } = useSelector((state) => state.auth);

  const { post_error, post_created, isLoading, redirect } = useSelector(
    (state) => state.post
  );

  // dispatch
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState("Choose Image");
  //   quill
  const [value, setValue] = useState("");

  // state
  const [state, setState] = useState({
    title: "",
    desc: "",
    image: "",
  });

  //   slug
  const [slug, setSlug] = useState("");
  const [btnUpdateSlug, setBtnUpdateSlug] = useState(false);

  //   image preview
  const [imagePreview, setImagePreview] = useState("");

  // file handle
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setCurrentImage(file.name);

      setState((prev) => {
        return {
          ...prev,
          [e.target.name]: file,
        };
      });

      //   crate image URL
      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  //   handle change fn()
  const handleChange = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    // create slug
    const createSlug = urlSlug(e.target.value.trim().toLowerCase());

    setSlug(createSlug);
  };

  // handleDescription
  const handleDescription = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  //   handle slug fn
  const handleSlug = (e) => {
    setBtnUpdateSlug(true);
    setSlug(e.target.value.toLowerCase());
  };
  // handleUpdateURL
  const handleUpdateURL = (e) => {
    e.preventDefault();
    setSlug((prev) => {
      return urlSlug(prev.trim());
    });
    setBtnUpdateSlug(false);
  };

  //   create post
  const handleCreatePost = (e) => {
    e.preventDefault();

    // formdata
    const formData = new FormData();

    formData.append("title", state.title);
    formData.append("image", state.image);
    formData.append("description", state.desc);
    formData.append("slug", slug);
    formData.append("body", value);
    formData.append("username", username);
    formData.append("id", id);

    // console.log(formData);
    dispatch(createPost(formData));
  };

  // show errors
  useEffect(() => {
    if (post_error) {
      toast.error(post_error.replace(/('|")/gi, ""));
    }

    if (redirect) {
      navigate("/dashboard");
    }
  }, [post_error, redirect]);
  return (
    <>
      <PageTitle title="Create Post" desc="create a new post" />

      {/* toast */}
      <Toaster
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
        position="top-center"
      />

      <Container>
        <CreatePost>
          <Form onSubmit={handleCreatePost}>
            {/* left side */}
            <Wrapper>
              <Title>Create a new post</Title>
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

              <FormGroup>
                <FileLabel htmlFor="image">
                  <BsCardImage fontSize={20} />
                  <span>{currentImage}</span>
                </FileLabel>
                <input
                  id="image"
                  type="file"
                  name="image"
                  hidden
                  onChange={handleFile}
                  accept="image/*"
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
                  onChange={handleDescription}
                ></TextArea>
                <Length>
                  {state.desc
                    ? `${state.desc.length} characters`
                    : `${0} characters`}
                </Length>
              </FormGroup>
            </Wrapper>
            {/* right side */}
            <Wrapper>
              <FormGroup>
                <Label htmlFor="slug">Post URL</Label>
                <Input
                  type="text"
                  id="slug"
                  placeholder="Post URL..."
                  value={slug}
                  onChange={handleSlug}
                />
              </FormGroup>
              {/* slug */}
              <FormGroup>
                {btnUpdateSlug ? (
                  <UpdateButton onClick={handleUpdateURL}>Update</UpdateButton>
                ) : null}
              </FormGroup>

              {/* image */}

              {imagePreview ? (
                <FormGroup>
                  <ImagePreview>
                    <img src={imagePreview} alt="image" />
                  </ImagePreview>
                </FormGroup>
              ) : null}
              {/* button submit */}
              <FormGroup>
                <FormButttonSubmit disabled={isLoading ? true : false}>
                  {isLoading ? "Created..." : "Create Post"}
                </FormButttonSubmit>
              </FormGroup>
            </Wrapper>
          </Form>
        </CreatePost>
      </Container>
    </>
  );
};

export default Create;
