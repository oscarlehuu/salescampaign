// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../../../@component/MDBox";
import MDTypography from "../../../../../../@component/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "../../../../../../@examples/Timeline/TimelineItem";
import { ROLE } from "constants/common";
import { formatDay } from "utils/formatDay";
import { DAY_FORMAT } from "constants/common";

function OrdersOverview({ resellerRanking, role }) {
  const {
    subscriptions_to_top,
    user_rank,
    top: [firstRankingData, secondRankingData, thirdRankingData],
  } = resellerRanking;

  const getRankingValue = (data) => {
    return role === ROLE.ADMIN && data ? Object.values(data)[0] : data;
  };

  const firstRanking = getRankingValue(firstRankingData);
  const secondRanking = getRankingValue(secondRankingData);
  const thirdRanking = getRankingValue(thirdRankingData);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Ranking overview
        </MDTypography>
        {subscriptions_to_top && (
          <MDBox mt={0} mb={2}>
            <MDTypography variant="button" color="text" fontWeight="regular">
              <MDTypography display="inline" variant="body2" verticalAlign="middle">
                <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
              </MDTypography>
              &nbsp;
              <MDTypography variant="button" color="text" fontWeight="medium">
                {subscriptions_to_top} new licenses
              </MDTypography>{" "}
              to get 1st
            </MDTypography>
          </MDBox>
        )}
      </MDBox>
      <MDBox p={2}>
        {firstRanking && (
          <TimelineItem
            color="success"
            icon="military_tech"
            title={`1st ranking has ${firstRanking.today} new licenses today`}
            dateTime={`${role === ROLE.ADMIN ? firstRanking.name : "Total"} - ${
              firstRanking.quantity
            } licenses`}
          />
        )}
        {secondRanking && (
          <TimelineItem
            color="error"
            icon="star_rate"
            title={`2nd ranking has ${secondRanking.today} new licenses today`}
            dateTime={`${role === ROLE.ADMIN ? secondRanking.name : "Total"} - ${
              secondRanking.quantity
            } licenses`}
          />
        )}
        {thirdRanking && (
          <TimelineItem
            color="info"
            icon="star_half"
            title={`3rd ranking has ${thirdRanking.today} new licenses today`}
            dateTime={`${role === ROLE.ADMIN ? thirdRanking.name : "Total"} - ${
              thirdRanking.quantity
            } licenses`}
          />
        )}
        <TimelineItem
          color="primary"
          icon="star_border_purple500"
          title={`Your ranking now is ${user_rank ? user_rank : "unranked"}`}
          dateTime={formatDay(Date.now(), DAY_FORMAT.DISPLAY)}
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
