import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import Balance from "../component/Balance";
import User from "../component/User";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("paytmToken");
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    password: "",
    balance: 0,
  });

  const getUserData = async () => {
    if (!token) {
      navigate("/signup");
    } else {
      try {
        const resp = await axios.get(
          "http://127.0.0.1:3000/api/v1/user/getCurrentUser",
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        if (resp.data.user) {
          var userData = resp.data.user;
        }
        const respBalance = await axios.get(
          "http://127.0.0.1:3000/api/v1/account/balance",
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        if (respBalance.data.balance) {
          var balance = respBalance.data.balance;
        }
        const newUser = { ...userData, balance };

        setUser(newUser);
      } catch (error) {
        toast.error("Error Fetching User Data");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  if (token) {
    return (
      <>
        <Navbar userName={user.firstName} />
        <hr className="m-auto w-[90vw]"></hr>

        <Balance balance={user.balance} />
        <User setUser={setUser} />
      </>
    );
  } else {
    <></>;
  }
};

export default Dashboard;
