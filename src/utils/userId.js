import Cookies from "js-cookie";

// Browser ID
export const getBrowserId = () => {

  let browserId = Cookies.get("browserId");

  if (!browserId) {
    browserId = crypto.randomUUID();

    Cookies.set("browserId", browserId, {
      expires: 365,
      sameSite: "Lax",
      path: "/",
    });
  }

  return browserId;
};

// Portfolio User ID
export const savePortfolioUserId = (userId) => {

  Cookies.set("portfolioUserId", userId, {
    expires: 365,
    sameSite: "Lax",
    path: "/",
  });

};