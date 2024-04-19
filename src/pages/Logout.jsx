import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Logga ut framgångsrikt");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <>
      <div className="mt-24 mb-28 mx-3 pt-3 pb-10"></div>
      <ToastContainer />
    </>
  );
};

export default Logout;
