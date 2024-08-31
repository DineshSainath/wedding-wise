/* eslint-disable */
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function LandingCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://themaharanidiaries.com/wp-content/uploads/2020/03/The-Ultimate-Wedding-Planning-Checklist-Printable_The-Maharani-Diaries-scaled.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="caption">
          <h1>
            <strong>Wedding Wise</strong>
          </h1>
          <p>Creating Heaven for Marriages</p>
          <Link to="/events" className="btn btn-primary">
            Start Planning
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://myboundlessthoughts.wordpress.com/wp-content/uploads/2013/09/mg_0241.jpg"
          alt="Second slide"
        />
        <Carousel.Caption className="caption">
          <h1>
            <strong>Wedding Wise</strong>
          </h1>
          <p>Creating Heaven for Marriages</p>
          <Button> Start Planning </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://miro.medium.com/v2/resize:fit:1024/1*cMOShxni5kn-gJ3qHqDgKw.jpeg"
          alt="Third slide"
        />
        <Carousel.Caption className="caption">
          <h1>
            <strong>Wedding Wise</strong>
          </h1>
          <p>Creating Heaven for Marriages</p>
          <Button> Start Planning </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default LandingCarousel;
