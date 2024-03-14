// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "../../../../../../../@component/MDBox";
import MDTypography from "../../../../../../../@component/MDTypography";
import MDAvatar from "../../../../../../../@component/MDAvatar";
import MDProgress from "../../../../../../../@component/MDProgress";

// Images
import logoXD from "../../../../../../../../assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "../../../../../../../../assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "../../../../../../../../assets/images/small-logos/logo-slack.svg";
import logoSpotify from "../../../../../../../../assets/images/small-logos/logo-spotify.svg";
import logoJira from "../../../../../../../../assets/images/small-logos/logo-jira.svg";
import logoInvesion from "../../../../../../../../assets/images/small-logos/logo-invision.svg";

import team1 from "../../../../../../../../assets/images/team-1.jpg";
import team2 from "../../../../../../../../assets/images/team-2.jpg";
import team3 from "../../../../../../../../assets/images/team-3.jpg";
import team4 from "../../../../../../../../assets/images/team-4.jpg";
import { formatDay } from "utils/formatDay";
import { DAY_FORMAT } from "constants/common";

export default function data(subscriptions) {
  const subscriptionTable = Object.values(subscriptions.data).reduce((prev, current) => {
    return [...prev, ...current.items];
  }, []);

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDTypography variant="button" fontWeight="medium" ml={0} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );
  const rows =
    subscriptionTable.length > 0
      ? subscriptionTable.map((elem) => ({
          subscriptionName: <Company name={elem.name} />,
          customer: <Company name={elem.account.name} />,
          quantity: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {elem.quantity}
            </MDTypography>
          ),
          activationDate: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {formatDay(elem.activationDate, DAY_FORMAT.DISPLAY)}
            </MDTypography>
          ),
          amount: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {elem.subscriptionAmount}
            </MDTypography>
          ),
        }))
      : [];

  return {
    columns: [
      { Header: "subscription name", accessor: "subscriptionName", width: "30%", align: "left" },
      { Header: "customer", accessor: "customer", width: "10%", align: "left" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      // { Header: "renewal", accessor: "renewal", align: "center" },
      { Header: "activation date", accessor: "activationDate", align: "center" },
      { Header: "amount", accessor: "amount", align: "center" },
    ],
    rows: rows,
  };
}
