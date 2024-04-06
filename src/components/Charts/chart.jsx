import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";

import data from "../../data/numberOfPoliceByYear.json";
// import NoDataAvailable from "src/components/NoDataAvailable";

export const OverviewPolicesByYear = () => {
  //   const { sx, startDate = undefined, endDate = undefined } = props;
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    series: [],
  });
  console.log("json data", data);

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          chartOptions: {
            dataLabels: {
              enabled: true, // Display data labels in the exported image
            },
          },
          csv: {
            filename: ` No of Policies Month/Year wise`,
            columnDelimiter: ",",
            Headers: "melkam",
            headerCategory: "Month/year",
            headerValue: "Num of Policies",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: " No of Policies Month/Year wise ",
          },
          png: {
            filename: " No of Policies Month/Year wise",
          },
        },
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: pieChartData.series,
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return pieChartData.series[seriesIndex];
      },
    },
    title: {
      text: "No of Policies Month/Year wise",
      align: "left",
      floating: true,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        margin: "20px",
        fontFamily: undefined,
        color: "#263238",
      },
    },

    labels: pieChartData.labels,
    legend: {
      show: true,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          position: "bottom",
        },
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },

    tooltip: {
      fillSeriesColor: false,
    },
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((status) => status.Month_Year);
      const series = data.map((status) => status.num_polices);

      setPieChartData({
        labels,
        series,
      });
    }
  }, []);

  console.log("picchart", pieChartData);

  //   if (isLoading) {
  //     return <LoadingUI />;
  //   }
  return (
    <Card>
      {/* <Container></Container> */}
      <CardContent>
        {data?.length == 0 ? (
          <p>no data availabel</p>
        ) : data?.length > 0 ? (
          <>
            {" "}
            <Chart
              height={300}
              options={chartOptions}
              series={pieChartData.series}
              type="pie"
              //   width="100%"
            />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 2 }}
            >
              {pieChartData.series.map((item, index) => {
                console.log("");
                const label = pieChartData.labels[index];

                return (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* {iconMap[label]} */}
                    <Typography sx={{ my: 1 }} variant="h6">
                      {label}
                    </Typography>
                    <Typography color="text.secondary" variant="subtitle2">
                      {item}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

OverviewPolicesByYear.propTypes = {
  sx: PropTypes.object,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};
