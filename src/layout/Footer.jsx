import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";

const Footer = () => {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];

  return (
    <div className="footer footer-expand-lg py-2 bg-black fixed bottom-0 w-full h-16 z-50 shadow-sm shadow-slate-100">
      <div className="flex gap-7 text-[12px] text-[#fff] justify-center">
        {iconsTab.map(({ icon }, index) => {
          return (
            <div
              key={index}
              className="text-md bg-[#000] p-2 rounded-full hover:bg-[#00df9a] hover:text-white cursor-pointer"
              style={{ transition: "all 0.3s" }}
            >
              {icon}
            </div>
          );
        })}
      </div>
      <div className="flex text-[12px] text-[#fff] justify-center items-center m-0">
        <p> © {new Date().getFullYear()} FashionHub</p>
      </div>
    </div>
  );
};

export default Footer;
