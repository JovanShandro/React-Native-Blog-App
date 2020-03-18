import * as R from "ramda";

const initialState = {
  0: {
    id: "0",
    image:
      "https://cdn.thewirecutter.com/wp-content/uploads/2018/07/laptops-under-500-lowres-9990.jpg",
    title: "Newest Macbook Pro!!",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  },
  1: {
    id: "1",
    image:
      "https://pix6.agoda.net/hotelImages/41483/-1/aab9e70361132c8cd6d5d2baa4a68002.jpg?s=1024x768",
    title: "The Best Vacation!",
    description:
      "LLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.:orem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  },
  2: {
    id: "2",
    image:
      "https://i.pinimg.com/originals/6b/bd/d2/6bbdd2fa99868367453b6bbb02de6346.png",
    title: "Managing Time efficently",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  }
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      break;
    case "ADD":
      break;
    case "DELETE":
      return R.reject(R.pipe(R.prop("id"), R.equals(action.id)), state);
    default:
      return state;
  }
};

export default postsReducer;
