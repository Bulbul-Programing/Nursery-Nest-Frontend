
import { Gallery } from "react-grid-gallery";
import { images } from "./images";
const ImagesSection = () => {
  return (
    <div className="m-5">
        <h1 className="text-4xl font-bold text-center my-5">Our Gallery</h1>
      <Gallery
        images={images}
        enableImageSelection={false}
      />
    </div>
  );
};

export default ImagesSection;
