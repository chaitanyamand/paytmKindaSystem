import { memo } from "react";

const FormRow = memo(function FormRow({
  label,
  placeHolder,
  isPassword,
  onChange,
  value,
  name,
}) {
  return (
    <div>
      {label ? (
        <div className="text-lg font-bold mt-3 mb-3 text-left">{label}</div>
      ) : null}

      <input
        type={isPassword == true ? "password" : "text"}
        className="border-2 rounded-md border-gray-200  h-10 w-full p-4"
        placeholder={placeHolder}
        value={value}
        name={name}
        onChange={onChange}
        required
      ></input>
    </div>
  );
});

export default FormRow;
