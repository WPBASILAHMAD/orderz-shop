/** @format */

import { v4 as uuidv4 } from "uuid";

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },

  {
    title: "Products",
    url: "/products",
  },
  // {
  //   title: "Events",
  //   url: "/events",
  // },
  {
    title: "FAQ",
    url: "/faq",
  },
  {
    title: "All Stores",
    url: "/all-stores",
  },
];

// branding data
export const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 100$",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1H5.63636V24.1818H35"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
        <path
          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
        <path
          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
        <path
          d="M34.9982 1H11.8164V18H34.9982V1Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
        <path
          d="M11.8164 7.18164H34.9982"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: (
      <svg
        width="32"
        height="34"
        viewBox="0 0 32 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"></path>
        <path
          d="M30.7 2L29.5 10.85L20.5 9.65"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Affortable Prices",
    Description: "Get Factory direct price",
    icon: (
      <svg
        width="32"
        height="35"
        viewBox="0 0 32 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"></path>
        <path
          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"></path>
        <path
          d="M16 28V22"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"></path>
        <path
          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
        <path
          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Secure Payments",
    Description: "100% protected payments",
    icon: (
      <svg
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
        <path
          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
        <path
          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"></path>
      </svg>
    ),
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "",
    image_Url:
      "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
    subcategories: [],
  },
  {
    id: 2,
    title: "Cosmetics and Body care",
    subTitle: "",
    image_Url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkXEvv3PmzwG8J18yPzx76gfjzO9Wq_OS8Q&s",
    subcategories: [],
  },
  {
    id: 3,
    title: "Accessories",
    subTitle: "",
    image_Url:
      "https://static.vecteezy.com/system/resources/thumbnails/022/255/548/small_2x/women-s-accessories-and-gadgets-on-a-gray-background-3d-rendering-generative-ai-photo.jpg",
    subcategories: [],
  },
  {
    id: 4,
    title: "Cloths",
    subTitle: "",
    image_Url:
      "https://media.istockphoto.com/id/916092484/photo/women-clothes-hanging-on-hangers-clothing-rails-fashion-design.jpg?s=612x612&w=0&k=20&c=fUpcbOITkQqitglZfgJkWO3py-jsbuhc8eZfb4sdrfE=",
    subcategories: [
      {
        id: 41, // Changed to 4 + 1
        title: "Kids",
        image_Url:
          "https://media.istockphoto.com/id/916092484/photo/women-clothes-hanging-on-hangers-clothing-rails-fashion-design.jpg?s=612x612&w=0&k=20&c=fUpcbOITkQqitglZfgJkWO3py-jsbuhc8eZfb4sdrfE=",
      },
      {
        id: 42, // Changed to 4 + 2
        title: "Men's",
        image_Url:
          "https://media.istockphoto.com/id/916092484/photo/women-clothes-hanging-on-hangers-clothing-rails-fashion-design.jpg?s=612x612&w=0&k=20&c=fUpcbOITkQqitglZfgJkWO3py-jsbuhc8eZfb4sdrfE=",
      },
      {
        id: 43, // Changed to 4 + 3
        title: "Women's",
        image_Url: "https://example.com/womens-clothes.jpg",
      },
    ],
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: "",
    image_Url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU",
    subcategories: [],
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: "",
    image_Url:
      "https://www.bworldonline.com/wp-content/uploads/2021/12/03-gifts.jpg",
    subcategories: [],
  },
  {
    id: 7,
    title: "Pet Care",
    subTitle: "",
    image_Url:
      "https://www.scotsman.com/webimg/b25lY21zOjQ2MmM5NDg1LWFhNTktNDQ1Ni1hMjEwLWE2OTc5MjM1ZmNlNDoyOTg0YzhhYS1lYmU3LTQxN2YtOTVkMS01NzEwNWFlYWUyNmM=.jpg?crop=3:2,smart&trim=&width=640&quality=65&enable=upscale",
    subcategories: [],
  },
  {
    id: 8,
    title: "Mobile and Tablets",
    subTitle: "",
    image_Url:
      "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg",
    subcategories: [],
  },
  {
    id: 9,
    title: "Music and Gaming",
    subTitle: "",
    image_Url:
      "https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png",
    subcategories: [],
  },
  {
    id: 10,
    title: "Others",
    subTitle: "",
    image_Url:
      "https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
    subcategories: [],
  },
];

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/carrers",
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Game & Video",
  },
  {
    name: "Phone &Tablets",
  },
  {
    name: "Computers & Laptop",
  },
  {
    name: "Sport Watches",
  },
  {
    name: "Events",
  },
];

export const footerSupportLinks = [
  // {
  //   id: uuidv4(),
  //   title: "Events",
  //   url: "/events",
  // },
  {
    id: uuidv4(),
    title: "Products",
    url: "/products",
  },
  {
    id: uuidv4(),
    title: "FAQ",
    url: "/faq",
  },
  {
    id: uuidv4(),
    title: "Chat Support",
    url: "/chat-with-us",
  },
];
