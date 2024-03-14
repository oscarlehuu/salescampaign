// Images 
import help from "../../../../../../assets/images/help.png";
import billing from "../../../../../../assets/images/billiing.png";
import sales from "../../../../../../assets/images/sales.png";
import team3 from "../../../../../../assets/images/team-3.jpg";
import team4 from "../../../../../../assets/images/team-4.jpg";

const data = [
  {
    image: help,
    name: "Technical Support",
    description: "It seems like you have a questions.",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "email technical team",
    },
  },
  {
    image: billing,
    name: "Billing Support",
    description: "I am here to help with your billing.",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "email billing team",
    },
  },
  {
    image: sales,
    name: "Sales Support",
    description: "We miss you so so much...",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "email sales team",
    },
  }
];
export default data