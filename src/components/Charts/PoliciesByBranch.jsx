import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Card, CardHeader, CardContent } from "@mui/material";
import Chart from "react-apexcharts";

// import NoDataAvailable from "src/components/NoDataAvailable";
import data from "../../data/numberOfPoliciesByBranch.json";

const chartOptions = {
  chart: {
    id: "line-chart",
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
          filename: "Number of policies by branch",
          columnDelimiter: ",",
          headerCategory: "Branch",
          headerValue: "Number of Policies",
          dateFormatter(timestamp) {
            return new Date(timestamp).toDateString();
          },
        },
        svg: {
          filename: "Number of Policies by branch",
        },
        png: {
          filename: "Number of policies by branch",
        },
      },
      autoSelected: "zoom",
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
      text: "Count",
    },
  },
};

const OverviewPolicesByBranch = () => {
  const [barChartData, setBarChartData] = useState({
    dataLabels: {
      enabled: false,
    },
    labels: [],
    series: [],
    chartOptions,
  });

  console.log("bar chart data", barChartData);
  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((item) => item.branch);
      const series = data.map((item) => item.num_policy);

      setBarChartData({
        labels,
        series,
      });
    }
  }, []);

  return (
    <Card>
      <CardHeader title="No of Polices Branch Wise" />
      <CardContent>
        {data?.length == 0 ? (
          <p>No data availabel</p>
        ) : data?.length > 0 ? (
          <Chart
            options={barChartData}
            series={
              barChartData.series
                ? [{ name: "Count", data: barChartData.series }]
                : []
            }
            type="line"
            width="100%"
            height={350}
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default OverviewPolicesByBranch;
OverviewPolicesByBranch.protoTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  sx: PropTypes.object,
};
