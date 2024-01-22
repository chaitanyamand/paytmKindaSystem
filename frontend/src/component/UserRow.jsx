import { memo } from "react";
import Modal from "./Modal";

const UserRow = memo(function UserRow({
  firstName,
  lastName,
  userId,
  token,
  setUser,
}) {
  return (
    <div className="flex justify-between my-6">
      <div className="flex items-center">
        <div className="w-11 h-11 mr-4 flex items-center justify-center rounded-full bg-gray-300 ">
          <p className="text-xl  text-gray-800">
            {firstName[0] ? firstName[0].toUpperCase() : null}
            {lastName[0] ? lastName[0].toUpperCase() : null}
          </p>
        </div>
        <h2 className="flex text-xl font-semibold">
          <div className="mr-1 ml-4">
            {firstName ? firstName[0].toUpperCase() + firstName.slice(1) : null}
          </div>
          <div className="ml-1">
            {lastName ? lastName[0].toUpperCase() + lastName.slice(1) : null}
          </div>
        </h2>
      </div>
      <Modal
        firstName={firstName}
        lastName={lastName}
        userId={userId}
        token={token}
        setUser={setUser}
      />
    </div>
  );
});

export default UserRow;
