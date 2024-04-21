import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  inputValue,
  setInputValue,
  inputRef,
  handleSubmit,
  alertOneRef,
  alertTwoRef,
}) => {
  return (
    <div>
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
        alertOneRef={alertOneRef}
        alertTwoRef={alertTwoRef}
      />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
