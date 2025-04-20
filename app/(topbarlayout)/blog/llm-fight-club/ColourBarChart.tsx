"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import echarts-for-react for client-side rendering
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Define the structure for parsed data items
interface ChartDataItem {
  name: string;
  value: number;
}

// Define the structure for the state holding processed chart data
interface ChartData {
  categories: string[];
  values: number[];
}

export default function ColourHorizontalBarChart() {
  // State to hold the processed data for the chart
  const [chartData, setChartData] = useState<ChartData>({
    categories: [],
    values: [],
  });

  // useEffect to parse the CSV data once on component mount
  useEffect(() => {
    const { categories, values } = parseBarChartCSV(barChartCsvData);
    setChartData({ categories, values });
  }, []); // Empty dependency array ensures this runs only once client-side

  // ECharts configuration object for a horizontal bar chart
  const option = {
    tooltip: {
      trigger: "axis", // Trigger tooltip when hovering over the axis item
      axisPointer: {
        type: "shadow", // Use a shadow to highlight the hovered bar
      },
      // Formatter to show category name and value
      formatter: "{b}: {c}", // {b} is category name, {c} is value
    },
    grid: {
      // Adjust grid padding
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true, // Ensure labels (like long category names) fit
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: chartData.categories,
      inverse: true,
      axisLabel: {
        show: false, // Hide y-axis category labels
      },
    },
    series: [
      {
        name: "Score", // Name for the data series (useful for legends if enabled)
        type: "bar", // Specify chart type as bar
        data: chartData.values, // Set values from processed data
        label: {
          show: true,
          position: "inside", // Show inside the left side of bar
          formatter: "{b}", // Display the name (category) inside bar
          color: "#000", // White text for contrast (assuming blue bars)
          fontWeight: "bold",
        },
        // Optional: Style the bars
        itemStyle: {
          color: "#5470C6", // Example bar color
        },
      },
    ],
  };

  // Determine a suitable height based on the number of bars, or use a fixed height
  const chartHeight = Math.max(300, chartData.categories.length * 15) + "px"; // Min height 300px, add 35px per bar

  return (
    // Container div to control chart size
    // Width is 100%, height adjusts based on the number of items
    <div style={{ width: "100%", height: chartHeight }}>
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        notMerge={true} // Ensures options completely replace previous ones
        lazyUpdate={true} // Updates chart lazily
      />
    </div>
  );
}

/**
 * Parses CSV data for a bar chart.
 * Assumes CSV format: CategoryName,Value
 * Sorts the data by value in descending order.
 * @param csv The CSV string data.
 * @returns An object containing arrays of sorted categories and values.
 */
function parseBarChartCSV(csv: string): ChartData {
  if (!csv || csv.trim() === "") {
    return { categories: [], values: [] };
  }
  const rows = csv
    .trim()
    .split("\n")
    .map((row) => row.split(","));

  const dataItems: ChartDataItem[] = [];

  // Parse rows into structured data items
  rows.forEach(([name, valueStr]) => {
    const value = parseFloat(valueStr); // Use parseFloat for potential decimal values
    if (name && !isNaN(value)) {
      dataItems.push({ name: name.trim(), value });
    } else {
      console.warn(
        `Skipping invalid row in bar chart CSV: ${name},${valueStr}`
      );
    }
  });

  // Sort data items by value in descending order (highest value first)
  dataItems.sort((a, b) => b.value - a.value);

  // Extract sorted names and values into separate arrays
  const categories = dataItems.map((item) => item.name);
  const values = dataItems.map((item) => item.value);

  return { categories, values };
}

// ==================================================
// Sample CSV Data for the Horizontal Bar Chart
// Format: BattlerName,Value
// ==================================================
const barChartCsvData = `orange,1.502
red,1.224
yellow,0.910
black,0.558
green,-0.267
violet,-0.267
white,-0.760
indigo,-0.760
blue,-2.140`;
