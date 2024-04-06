import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Card, CardHeader, CardContent } from "@mui/material";
import Chart from "react-apexcharts";

// import NoDataAvailable from "src/components/NoDataAvailable";
import data from "../../data/GWPbuisinesswise.json";

const chartOptions = {
  chart: {
    id: "bar",
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: 0,
      tools: {
        download: true,
        selection: true,
      },
      export: {
        csv: {
          filename: "GWP Business source wise",
          columnDelimiter: ",",
          headerCategory: "Business source",
          headerValue: "value",
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString();
          },
        },
        svg: {
          filename: "GWP Business source wise",
        },
        png: {
          filename: "GWP Business source wise",
        },
      },
      autoSelected: "zoom",
    },
  },
  title: {
    text: "No of Policies Business Source wise",
    align: "left",
    // floating: true,
    style: {
      fontSize: "20px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#263238",
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: "cylinder", // Set endingShape to 'cylinder'
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
      },
    },
  },
  yaxis: {
    title: {
      text: "No of Policy",
    },
  },
};

const OverviewGWPByBusines = () => {
  const [barChartData, setBarChartData] = useState({
    dataLabels: {
      enabled: true,
    },
    labels: [],
    series: [],
    chartOptions,
  });

  console.log("bar chart data", barChartData);
  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((item) => item.busines_source);
      const series = data.map((item) => item.GWP_birr);

      setBarChartData({
        labels,
        series,
      });
    }
  }, []);

  return (
    <Card>
      <CardHeader title="GWP Business Source wise" />
      <CardContent>
        {data?.length == 0 ? (
          <p>No data availabel</p>
        ) : data?.length > 0 ? (
          <Chart
            options={barChartData}
            series={
              barChartData.series
                ? [{ name: "GWP(Birr)", data: barChartData.series }]
                : []
            }
            type="bar"
            width="100%"
            height={350}
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default OverviewGWPByBusines;
OverviewGWPByBusines.protoTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  sx: PropTypes.object,
};
