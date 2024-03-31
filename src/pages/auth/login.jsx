import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-provider";
import { useLoginForm } from "../../features/auth-user/login/useLoginForm";

const LoginPage = () => {
  const { data } = useContext(AuthContext);
  const history = useHistory();

  if (data) history.push("/dashboard");

  const onSuccess = () => history.push("/dashboard");

  const onError = (error) => console.log(error);

  const { formik, isLoading } = useLoginForm({ onSuccess, onError });

  const handleForm = (event) => {
    const { target } = event;

    formik.setFieldValue(target.name, target.value);
  };

  return (
    <section className="container relative">
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <form onSubmit={formik.handleSubmit}>
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 flex h-28 justify-center items-center"
            >
              <Typography variant="h3" color="white" className="">
                Welcome
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Email"
                size="lg"
                name="email"
                onChange={handleForm}
                error={formik.errors.email && formik.touched && true}
              />
              {formik.errors.email && formik.touched.email && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-2 font-normal"
                >
                  {formik.errors.email}
                </Typography>
              )}
              <Input
                label="Password"
                size="lg"
                type="password"
                name="password"
                onChange={handleForm}
                error={
                  formik.errors.password && formik.touched.password && true
                }
              />
              {formik.errors.password && formik.touched.password && (
                <Typography
                  variant="small"
                  color="red"
                  className="mt-2 font-normal"
                >
                  {formik.errors.password}
                </Typography>
              )}
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              {isLoading ? (
                <Button
                  type="submit"
                  disabled
                  className="mt-6 flex items-center justify-center"
                  fullWidth
                >
                  <Spinner color="green" size="sm" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="mt-6"
                  fullWidth
                  variant="gradient"
                >
                  Login
                </Button>
              )}
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
