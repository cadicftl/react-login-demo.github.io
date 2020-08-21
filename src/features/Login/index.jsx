import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import userApi from "../../api/userApi";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setisLoginSuccess] = useState(true);
  const history = useHistory();
  const login = async (e) => {
    try {
      const data = {
        username: userName,
        password: password,
      };
      e.preventDefault();
      const response = await userApi.login(data);
      localStorage.setItem("token", response.token);
      history.push("/dashboard");
    } catch (error) {
      setisLoginSuccess(false);
      console.log("Error", { error });
    }
  };

  return (
    <>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
              <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div class="brand-logo">
                    <img src="images/logo.svg" alt="logo" />
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 class="font-weight-light">Sign in to continue.</h6>
                  <form class="needs-validation" onSubmit={login}>
                    <div class="form-group">
                      <input
                        type="text"
                        aria-describedby="inputGroupPrepend"
                        class="form-control form-control-lg mt-5"
                        required
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        id="exampleInputPassword1"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    {!isLoginSuccess && (
                      <div class="text-danger">
                        Please check your username and password.
                      </div>
                    )}
                    <div class="mt-3">
                      <button
                        type="submit"
                        class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      >
                        SIGN IN
                      </button>
                    </div>
                  </form>
                  <div class="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/register" class="text-primary">
                      Create
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
