import React, { useEffect, useState } from "react";
import PageTitle from "../helpers/PageTitle";
import {
  CreatePost,
  FileLabel,
  Form,
  FormButttonSubmit,
  FormGroup,
  ImagePreview,
  Title,
  Wrapper,
  ArrowBack,
} from "../components/styles/globals";
import Container from "../helpers/Container";
import { BsCardImage } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostImage, updatePostImage } from "../../app/slices/postSlice";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
const EditImage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post_image, isLoading, edit_image_error, redirect } = useSelector(
    (state) => state.post
  );
  const navigate = useNavigate();
  const [postImage, setpostImage] = useState("");
  const [imageName, setImageName] = useState("choose image");
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      setpostImage(file);

      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      setImageName("choose image");
      setpostImage("");
      setImagePreview("");
    }
  };

  const handleUpdatePostImage = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", postImage);

    dispatch(updatePostImage({ id, formData }));
  };

  //   get image post
  useEffect(() => {
    dispatch(getPostImage(id));
  }, [id]);

  useEffect(() => {
    if (post_image) {
      setImageName(post_image);
      setImagePreview(`/images/${post_image}`);
    }
  }, [post_image]);

  //   errors
  useEffect(() => {
    if (edit_image_error) {
      toast.error(edit_image_error.replace(/("|')/gi, ""));
    }
    if (redirect) {
      navigate("/dashboard");
    }
  }, [edit_image_error, redirect]);
  return (
    <>
      <PageTitle title="Edit Image" desc="edit post image" />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: 14 },
        }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Form onSubmit={handleUpdatePostImage}>
            <CreatePost>
              <Wrapper>
                <ArrowBack onClick={() => navigate("/dashboard")}>
                  <BiArrowBack />
                </ArrowBack>
                <Title>Edit Post Image</Title>
                <FormGroup>
                  <FileLabel htmlFor="image">
                    <BsCardImage fontSize={20} />
                    <span>{imageName}</span>
                  </FileLabel>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  {imagePreview ? (
                    <ImagePreview>
                      <img src={imagePreview} alt="image" />
                    </ImagePreview>
                  ) : null}
                </FormGroup>

                {/* button submit */}
                <FormGroup>
                  <FormButttonSubmit>Update Image</FormButttonSubmit>
                </FormGroup>
              </Wrapper>
            </CreatePost>
          </Form>
        </Container>
      )}
    </>
  );
};

export default EditImage;
