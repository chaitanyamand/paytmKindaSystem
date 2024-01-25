import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, []);

  return <div></div>;
};

export default Landing;
