import { signout } from "./api-auth.js";

//sessionStorage stores JWT just in that tab, but localStorage is remembered
//across tabs in the browser

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },
  //cb - callback function
  authenticate(jwt, cb) {
    //only runs if in a browser window
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },
  clearJWT(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
