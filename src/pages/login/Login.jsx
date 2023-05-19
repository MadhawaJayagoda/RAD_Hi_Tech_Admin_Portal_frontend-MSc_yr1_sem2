import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../common/Axios";
const LOGIN_URL = "/user/login";

const Login = ({ setIsLoggedIn, setUserCode }) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          Email: user,
          Password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data["Status"]) {
        setSuccess(true);
        setIsLoggedIn(true);
        setUserCode(response.data["UserData"].UserCode);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["Result"].AccessToken}`;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userCode", response.data["UserData"].UserCode);
      }
    } catch (err) {
      setErrMsg("Login Failed");
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <div
          className="loginCn"
          style={{
            width: "30%",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 style={{ fontFamily: "sans-serif", fontSize: "40px" }}>
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="username"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label
                htmlFor="password"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button
                style={{
                  marginTop: "50px",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  backgroundColor: "#5C5CFF",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </button>
            </form>
            <p style={{ fontSize: "18px" }}>
              Need an
              <span className="line">
                {/*put router link here*/}
                <a href="#"> Account ? </a>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;
