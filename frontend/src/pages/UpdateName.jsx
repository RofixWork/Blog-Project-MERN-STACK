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
import { BiArrowBack } from "react-icons/bi";
import Container from "../helpers/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateName } from "../../app/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
const UpdateName = () => {
  const dispatch = useDispatch();
  const { user, edit_name_error, isLoading, redirect } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    dispatch(updateName({ id, name }));
  };

  useEffect(() => {
    if (user.username) {
      setName(user.username);
    }
  }, []);

  useEffect(() => {
    if (edit_name_error) {
      toast.error(edit_name_error.replace(/("|')/gi, ""));
    }

    if (redirect) {
      navigate("/dashboard");
    }
  }, [edit_name_error, redirect]);
  return (
    <>
      <PageTitle title="Update Username" desc="page for update your username" />
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
          <Form onSubmit={handleUpdateName}>
            <CreatePost>
              <Wrapper>
                <ArrowBack onClick={() => navigate("/dashboard")}>
                  <BiArrowBack />
                </ArrowBack>
                <Title>Edit Name</Title>
                <FormGroup>
                  <Label htmlFor="title">Enter a new name</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter a new name"
                    value={name}
                    name="name"
                    onChange={handleChange}
                  />
                </FormGroup>

                {/* button submit */}
                <FormGroup>
                  <FormButttonSubmit>
                    {isLoading ? "Updating..." : "Update Name"}
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

export default UpdateName;
