import { useCallback, useRef, useState } from "react";
import FormRow from "../component/FormRow";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInput((prevInpt) => {
      return { ...prevInpt, [name]: value };
    });
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
      buttonRef.current.style.background = "gray";
    }
    try {
      const resp = await axios.post("http://127.0.01:3000/api/v1/user/signin", {
        username: input.email,
        password: input.password,
      });
      if (resp.data.token) {
        localStorage.setItem("paytmToken", resp.data.token);
      }
      navigate("/dashboard");
      toast.success("Sign In Successful");
    } catch (error) {
      toast.error("Error Signing In! Try Again");
      buttonRef.current.disabled = false;
      buttonRef.current.style.background = "black";
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 h-screen w-screen flex justify-center items-center">
      <div className="rounded-lg shadow-md bg-white text-center p-8 flex-col justify-center">
        <h1 className="text-black text-3xl font-bold">Sign In</h1>
        <h2 className="text-gray-500 pb-2 pt-2 ">
          Enter your credentials to access your account
        </h2>

        <FormRow
          label="Email"
          name="email"
          placeHolder="john@gmail.com"
          value={input.email}
          onChange={handleChange}
        />
        <FormRow
          label="Password"
          name="password"
          placeHolder=""
          isPassword={true}
          value={input.password}
          onChange={handleChange}
        />

        <button
          className="rounded-md bg-black font-semibold text-white mt-10 mb-5 h-10 w-full cursor-pointer"
          onClick={handleClick}
          ref={buttonRef}
          type="submit"
        >
          Sign In
        </button>

        <div className="text-md flex pl-8 ">
          {"Don't Have An Account?"}
          <Link className="underline ml-1" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
