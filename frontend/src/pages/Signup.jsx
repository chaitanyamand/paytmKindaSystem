import { useCallback, useRef, useState } from "react";
import FormRow from "../component/FormRow";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
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
      const resp = await axios.post("http://127.0.01:3000/api/v1/user/signup", {
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.email,
        password: input.password,
      });
      if (resp.data.message === "User created successfully") {
        localStorage.setItem("paytmToken", resp.data.token);
      }
      toast.success("Sign Up Successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error Signing Up! Try Again");
      buttonRef.current.disabled = false;
      buttonRef.current.style.background = "black";
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 h-screen w-screen flex justify-center items-center">
      <div className="rounded-lg shadow-md bg-white text-center p-8 flex-col justify-center">
        <h1 className="text-black text-3xl font-bold">Sign Up</h1>
        <h2 className="text-gray-500 pt-2 pb-2">
          Enter your information to create an account
        </h2>
        <FormRow
          label="First Name"
          name="firstName"
          placeHolder="John"
          value={input.firstName}
          onChange={handleChange}
        />
        <FormRow
          label="Last Name"
          name="lastName"
          placeHolder="Doe"
          value={input.lastName}
          onChange={handleChange}
        />
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
        >
          Sign Up
        </button>
        <div className="text-md flex pl-8">
          Already Have An Account?{" "}
          <Link className="underline ml-1" to="/signin">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
