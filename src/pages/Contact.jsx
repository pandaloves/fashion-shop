import { ArrowLeftIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <HStack className="mt-28 mb-3 ml-5">
        <Link to="/" size="xl">
          {/* The default icon size is 1em (16px) */}
          <ArrowLeftIcon boxSize={4} color="blue.500" className="mr-1" />
          Tillbaka
        </Link>
      </HStack>

      <div className="rounded-md mt-5 mb-28 mx-8 px-5 pt-3 pb-10 bg-gray-50 transform hover:scale-105 hover:shadow-xl transition delay-50 duration-300 ease-in-out cursor-pointer">
        <div>
          <h2 className="mb-5 text-lg font-bold text-[#00df9a] text-center">
            <b>Kontakta oss</b>
          </h2>
          <p className="mb-2">
            <b>Adress:</b> Vikingagatan 7, Stockholm 113 42 Sweden
          </p>
          <p className="mb-2">
            <b>Telefon:</b>{" "}
            <a className="footer-tel" href="tel:+46 8335523">
              +46 8335523
            </a>
          </p>
          <p className="mb-4">
            <b>Öppettider:</b> Från 8.00 till 18.00
          </p>
          <p className="text-lg">
            Kontakta oss gärna via vårt kontaktformulär. Vi försöker återkomma
            till dig inom 12 timmar under våra öppettider.
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
