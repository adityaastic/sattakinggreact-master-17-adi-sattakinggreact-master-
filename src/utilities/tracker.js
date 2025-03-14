import axios from "axios";

const trackVisitor = () => {
  const siteName = window.location.hostname; // Use the domain name as the site name
  const visitorId = localStorage.getItem("visitorId") || null;
  const timestamp = new Date().toISOString();
  const payload = { siteName, visitorId, timestamp };

  axios
    .post("https://api.sattakingvip.co.in/track", payload)
    .then((response) => {
      if (response.data.newVisitor) {
        localStorage.setItem("visitorId", response.data.visitorId);
      } else {
        return;
      }
    })
    .catch((error) => {
      console.error("Error tracking visitor:", error);
    });
};

export default trackVisitor;
