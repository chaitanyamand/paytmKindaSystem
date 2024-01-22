const Balance = ({ balance }) => {
  return (
    <div className="m-8">
      <div className="flex">
        <div className="text-2xl font-bold">Your Balance</div>
        <div className="mx-12 text-2xl font-semibold">${balance}</div>
      </div>
    </div>
  );
};

export default Balance;
