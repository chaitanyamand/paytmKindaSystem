import axios from "axios";
import { useEffect, useState, useRef } from "react";
import FormRow from "./FormRow";
import UserRow from "./UserRow";
import { toast } from "react-toastify";

const User = ({ setUser }) => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const token = localStorage.getItem("paytmToken");

  const debounceRef = useRef(null);

  const handleChange = (event) => {
    const val = event.target.value;
    setInput(val);
  };

  const getUsers = async () => {
    try {
      const resp = await axios.get("http://127.0.0.1:3000/api/v1/user/bulk", {
        headers: {
          authorization: "Bearer " + token,
        },
        params: { filter: input },
      });
      if (resp.data.user) {
        setUsers(resp.data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching the users!");
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      getUsers();
    }, 600);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [input]);

  return (
    <div className="m-8">
      <h1 className="text-2xl font-bold mb-8">Users</h1>
      <FormRow
        placeHolder="Search Users.."
        name="dashboardSearch"
        onChange={handleChange}
        value={input}
      />
      {users.map((user) => {
        return (
          <UserRow
            firstName={user.firstName}
            lastName={user.lastName}
            key={user._id}
            userId={user._id}
            token={token}
            setUser={setUser}
          />
        );
      })}
    </div>
  );
};

export default User;
