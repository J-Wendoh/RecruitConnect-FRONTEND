// import React from "react";
// import Slider from "react-slick";
// import { motion } from "framer-motion";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const awards = [
//   {
//     id: 1,
//     image:
//       "https://images.pexels.com/photos/7005031/pexels-photo-7005031.jpeg?auto=compress&cs=tinysrgb&w=300",
//     title: "Best Recruitment Platform 2023",
//     description:
//       "Recognized for our innovative approach to job matching and user experience.",
//   },
//   {
//     id: 2,
//     image:
//       "https://images.pexels.com/photos/6532362/pexels-photo-6532362.jpeg?auto=compress&cs=tinysrgb&w=300",
//     title: "Top Innovator in HR Tech 2022",
//     description:
//       "Awarded for our cutting-edge use of AI in recruitment processes.",
//   },
//   {
//     id: 3,
//     image:
//       "https://images.pexels.com/photos/6532362/pexels-photo-6532362.jpeg?auto=compress&cs=tinysrgb&w=300",
//     title: "Top Innovator in HR Tech 2022",
//     description:
//       "Awarded for our cutting-edge use of AI in recruitment processes.",
//   },
//   {
//     id: 4,
//     image:
//       "https://images.pexels.com/photos/6532362/pexels-photo-6532362.jpeg?auto=compress&cs=tinysrgb&w=300",
//     title: "Top Innovator in HR Tech 2022",
//     description:
//       "Awarded for our cutting-edge use of AI in recruitment processes.",
//   },
//   {
//     id: 5,
//     image:
//       "https://images.pexels.com/photos/6532362/pexels-photo-6532362.jpeg?auto=compress&cs=tinysrgb&w=300",
//     title: "Top Innovator in HR Tech 2022",
//     description:
//       "Awarded for our cutting-edge use of AI in recruitment processes.",
//   },
//   {
//     id: 6,
//     image:
//       "https://media.istockphoto.com/id/482044010/photo/firework-in-cannes.jpg?b=1&s=612x612&w=0&k=20&c=zCBRK8-og10BvIWAbFcyG9DoSta2JP523CMeEKqWCLI=",
//     title: "Top Innovator in HR Tech 2023",
//     description:
//       "Recognized again for our continued innovation and impact in the HR technology space.",
//   },
// ];

// const AwardCard = ({ award }) => (
//   <motion.div
//     className="award"
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//   >
//     <div className="award-image-container">
//       <img src={award.image} alt={award.title} className="award-image" />
//     </div>
//     <h3>{award.title}</h3>
//     <p>{award.description}</p>
//   </motion.div>
// );

// const AwardsSection = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000, // Change this value to control the autoplay interval (in milliseconds)
//   };

//   return (
//     <section className="awards">
//       <div className="container">
//         <h2>Our Awards</h2>
//         <Slider {...settings} className="awards-content">
//           {awards.map((award) => (
//             <AwardCard key={award.id} award={award} />
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default AwardsSection;



import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ... (awards array remains the same)
 const awards = [
   {
     id: 1,
     image:
       "https://images.pexels.com/photos/2098604/pexels-photo-2098604.jpeg?auto=compress&cs=tinysrgb&w=600",
     title: "Best Recruitment Platform 2023",
     description:
       "Recognized for our innovative approach to job matching and user experience.",
   },
   {
     id: 2,
     image:
       "https://images.pexels.com/photos/2098578/pexels-photo-2098578.jpeg?auto=compress&cs=tinysrgb&w=600",
     title: "Top Innovator in HR Tech 2022",
     description:
       "Awarded for our cutting-edge use of AI in recruitment processes.",
   },
   {
     id: 3,
     image:
       "https://media.istockphoto.com/id/1347499538/photo/close-up-low-angle-view-group-of-star-shape-crystal-trophy.jpg?b=1&s=612x612&w=0&k=20&c=xYACIFsXh_rzbFJoBXJ97juLJ6OHePEY_m64L7QJ5SU=",
     title: "Top Innovator in HR Tech 2022",
     description:
       "Awarded for our cutting-edge use of AI in recruitment processes.",
   },
   {
     id: 4,
     image:
       "https://media.istockphoto.com/id/1191017558/photo/close-up-of-trophy-on-table-against-gray-background.jpg?s=612x612&w=0&k=20&c=HX2xKpT-8VY4cD6KEyqlne0OocdKT_midx9NM6pEoGg=",
     title: "Top Innovator in HR Tech 2022",
     description:
       "Awarded for our cutting-edge use of AI in recruitment processes.",
   },
   {
     id: 5,
     image:
       "https://media.istockphoto.com/id/1284059487/photo/star-shape-trophy-on-the-wood-background.jpg?s=612x612&w=0&k=20&c=rhue242F05Vn0L-qultdUicvo4GojuyNGU8Lwkwe0CM=",
     title: "Top Innovator in HR Tech 2022",
     description:
       "Awarded for our cutting-edge use of AI in recruitment processes.",
   },
   {
     id: 6,
     image:
       "https://media.istockphoto.com/id/1346164223/photo/star-shape-trophy.jpg?s=612x612&w=0&k=20&c=NJvQi6Ih5ARDcuYZolx6oBHLVrJef_VSMkGgYOHzWlg=",
     title: "Top Innovator in HR Tech 2023",
     description:
       "Recognized again for our continued innovation and impact in the HR technology space.",
   },
 ];

const AwardCard = ({ award }) => (
  <motion.div
    className="award"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="award-image-container">
      <img src={award.image} alt={award.title} className="award-image" />
    </div>
    <div className="award-content">
      <h3>{award.title}</h3>
      <p>{award.description}</p>
    </div>
  </motion.div>
);

const AwardsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="awards">
      <div className="container">
        <h2>Our Awards</h2>
        <Slider {...settings} className="awards-content">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default AwardsSection;