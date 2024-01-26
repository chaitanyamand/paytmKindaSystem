import * as Dialog from "@radix-ui/react-dialog";
import "../../styles.css";
import FormRow from "./FormRow.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const Modal = ({ firstName, lastName, userId, token, setUser }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const inputVal = Number(input);
      if (inputVal <= 0) {
        toast.error("Amount has to be positive!");
        navigate("/dashboard");
      }
      const resp = await axios.post(
        "http://127.0.0.1:3000/api/v1/account/transfer",
        {
          amount: inputVal,
          to: userId,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.message === "Transfer successful") {
        toast.success(
          `Successfully transferred ₹${inputVal} to ${firstName}'s account!`
        );
        setUser((prevUser) => {
          return { ...prevUser, balance: prevUser.balance - inputVal };
        });
      }
    } catch (error) {
      toast.error("Error Transfering Money");
      console.log(error);
      navigate("/dashboard");
    }
  };
  const handleChange = (event) => {
    const val = event.target.value;
    setInput(val);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-black text-white text-md font-semibold rounded-lg p-2">
          Send Money
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <div>
            <div className="flex justify-center">
              <div className="text-2xl font-bold">Send Money</div>
            </div>
            <div className="flex items-center mt-8 justify-center mb-8">
              <div className="w-12 h-12  flex items-center justify-center rounded-full bg-green-400 ">
                <p className="text-2xl font-semibold text-black">
                  {firstName[0] ? firstName[0].toUpperCase() : null}
                </p>
              </div>
              <div className="ml-2 text-2xl font-semibold flex">
                <div className="mr-1 ml-4">
                  {firstName
                    ? firstName[0].toUpperCase() + firstName.slice(1)
                    : null}
                </div>
                <div className="ml-1">
                  {lastName
                    ? lastName[0].toUpperCase() + lastName.slice(1)
                    : null}
                </div>
              </div>
            </div>
            <FormRow
              placeHolder="Enter Amount To Send"
              name="amount"
              value={input}
              onChange={handleChange}
            ></FormRow>
            <Dialog.Close asChild>
              <button
                className="rounded-md bg-green-500 text-xl font-semibold text-white mt-10 mb-5 h-10 w-full cursor-pointer"
                onClick={handleClick}
                type="submit"
              >
                Initiate Transfer
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
