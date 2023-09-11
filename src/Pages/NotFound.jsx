import React, { useEffect } from "react";
import error from "../img/error404.png";
import "../Pages/css/error404.css"

const NotFound = () => {
  useEffect(() => {
    const sectionElement = document.querySelector('#error-404');
    if (sectionElement) {
      sectionElement.classList.add('scroll-to'); // Agrega la clase scroll-to
      const yOffset = -200;
      window.scrollTo({ top: sectionElement.offsetTop + yOffset, behavior: 'smooth' });
    }
  }, []);

  return (
    <body>
      <main className="d-flex flex-column align-items-center img-404" id="error-404" >
        <img  className="responsive-error" src={error} alt="imagen error  404"  />
        <h5 className=" text-center col-lg-6">
          The section you're looking for is currently unavailable. Please return to the Home page or contact the administration.
        </h5>
      </main>
    </body>
  );
};

export default NotFound;