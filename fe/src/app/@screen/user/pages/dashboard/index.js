// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../../../@component/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../../@examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../@examples/Navbars/DashboardNavbar";
import Footer from "../../../../@examples/Footer";
import ReportsBarChart from "../../../../@examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "../../../../@examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "../../../../@examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "../dashboard/components/Projects";
import OrdersOverview from "../dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../../../../config/api";
import { axiosInstance } from "../../../../../config/axios";
import { CircularProgress, Icon, Snackbar } from "@mui/material";
import { useAuthContext } from "provider/AuthProvider";
import { ROLE } from "constants/common";
import { DAY_FORMAT } from "constants/common";
import { formatDay } from "utils/formatDay";
import { reportChartData } from "utils/reportChartData";

function Dashboard() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState({});
  const [endUsers, setEndUsers] = useState({});
  const [subscriptions, setSubscriptions] = useState({});
  const [ranking, setRanking] = useState({});

  const userRanking = ranking.user_rank ?? "unranked";
  const todayEndUsers =
    endUsers?.data && endUsers?.data[formatDay(Date.now(), DAY_FORMAT.API_RESPONSE)]?.count;
  const todaySubscriptions =
    subscriptions?.data &&
    subscriptions?.data[formatDay(Date.now(), DAY_FORMAT.API_RESPONSE)]?.quantity;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const endUsersPromise = axiosInstance.get(API_ENDPOINT.ENDUSERS);
        const subscriptionsPromise = axiosInstance.get(API_ENDPOINT.SUBSCRIPTIONS);
        const rankingPromise = axiosInstance.get(API_ENDPOINT.ACTIVE_RANKING);
        const campaignPromise = axiosInstance.get(API_ENDPOINT.CAMPAIGNS);
        const [endUsersData, subscriptionsData, rankingData, campaignData] = (
          await Promise.all([
            endUsersPromise,
            subscriptionsPromise,
            rankingPromise,
            campaignPromise,
          ])
        ).map((response) => (response?.data ? response.data : response[0]));

        setEndUsers(endUsersData);
        setSubscriptions(subscriptionsData);
        setRanking(rankingData);
        setCampaign(campaignData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, []);

  return (
    <DashboardLayout>
      {isLoading ? (
        <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
          <CircularProgress />
        </MDBox>
      ) : (
        <>
          <DashboardNavbar />
          <MDBox py={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="success"
                    icon="emoji_events"
                    title="Ranking"
                    count={userRanking}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+1%",
                    //   label: "than yesterday",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon="weekend"
                    title="Total End-users"
                    count={endUsers.totalRecords}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+55%",
                    //   label: "than lask week",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon="person_add"
                    title="Today's New Users"
                    count={todayEndUsers ? todayEndUsers : 0}
                    // percentage={{
                    //   color: "success",
                    //   amount: "+3%",
                    //   label: "than last month",
                    // }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon="leaderboard"
                    title="New Quantity"
                    count={todaySubscriptions ? todaySubscriptions : 0}
                    // percentage={{
                    //   color: "success",
                    //   amount: "",
                    //   label: "Just updated",
                    // }}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="info"
                      title="new customers"
                      description="Last Update Perfomance"
                      date={`campaign starts on ${formatDay(
                        campaign.start_date,
                        DAY_FORMAT.DISPLAY
                      )}`}
                      chart={reportChartData(endUsers.data, "count")}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title="daily new quantity"
                      description={
                        <>
                          Last Update Perfomance
                          {/* (<strong>+15%</strong>) increase in today sales. */}
                        </>
                      }
                      date="live update"
                      chart={reportChartData(subscriptions.data, "quantity")}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="dark"
                      title="total subscriptions"
                      description="Last Campaign Performance"
                      date="just updated"
                      chart={reportChartData(subscriptions.data, "count")}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                  <Projects subscriptions={subscriptions} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <OrdersOverview resellerRanking={ranking} role={user.role} />
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
          <Footer />
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
