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
    <div className="footer footer-expand-lg py-2 bg-black fixed bottom-0 w-full z-50">
      <div className="flex gap-7 text-[12px] text-[#fff] justify-center ">
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
      <div className="flex text-[12px] text-[#fff] justify-center items-center m-1">
        <p> © {new Date().getFullYear()} FashionHub</p>
      </div>
    </div>
  );
};

export default Footer;

/*
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import logo from "/img/logo.png";

function Footer() {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];
  return (
    <>
      <footer className="bg-black px-4 pb-10 z-50 fixed bottom-0 mt-20 w-full">
        <div className="container mx-auto py-5 lg:py-10">
   
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-[5rem] text-left">
       
            <div className="flex flex-col w-full lg:w-1/2 lg:p-0 py-3 gap-8">
              <img src={logo} alt="footer_logo" className="w-[7rem]" />
              <p className="text-[15px] font-medium text-[#fff]">
                Take your fashion to the next level with our fashionable clothes
                designed to help you reach your fashion goals.
              </p>
         
              <div className="flex gap-7 text-[18px] text-[#fff] justify-center lg:justify-start">
                {iconsTab.map(({ icon }, index) => {
                  return (
                    <div
                      key={index}
                      className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-[#00df9a] hover:text-white"
                      style={{ transition: "all 0.3s" }}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
              <p className="text-[14px] font-medium text-[#fff]">
                Privacy Policy | © {new Date().getFullYear()} FashionHub <br />{" "}
                Designed by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.radiustheme.com/"
                >
                  Meiying Hu
                </a>
              </p>
            </div>


            <div className="flex flex-col gap-8 relative mt-5 lg:mt-0 lg:flex lg:flex-col">
              <p className="text-[16px] font-bold text-[#fff] footer-main">
                Our Clothes
              </p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#00df9a]"></span>

              <p className="text-[14px] hover:text-[#00df9a] cursor-pointer text-[#fff] font-medium hover:font-bold">
                Man
              </p>
              <p className="text-[14px] hover:text-[#00df9a] cursor-pointer text-[#fff] font-medium hover:font-bold">
                Woman
              </p>
              <p className="text-[14px] hover:text-[#00df9a] cursor-pointer text-[#fff] font-medium hover:font-bold">
                Child
              </p>
              <p className="text-[14px] hover:text-[#00df9a] cursor-pointer text-[#fff] font-medium hover:font-bold">
                Elder
              </p>
              <p className="text-[14px] hover:text-[#00df9a] cursor-pointer text-[#fff] font-medium hover:font-bold">
                Younger
              </p>
            </div>

       
            <div className="flex flex-col gap-8 relative mt-5 lg:mt-0 lg:flex lg:flex-col">
              <p className="text-[16px] font-bold text-[#fff] footer-main">
                Working Hours
              </p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#00df9a]"></span>

              <p className="text-[14px]  text-[#fff] font-bold">
                Monday - Friday:
              </p>
              <p className="text-[14px] text-[#fff] font-medium">
                7:00am - 21:00pm
              </p>
              <p className="text-[14px] text-[#fff] font-bold">Saturday:</p>
              <p className="text-[14px] text-[#fff] font-medium">
                7:00am - 19:00pm
              </p>
              <p className="text-[14px] text-[#fff] font-bold ">
                Sunday - Closed
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
*/
