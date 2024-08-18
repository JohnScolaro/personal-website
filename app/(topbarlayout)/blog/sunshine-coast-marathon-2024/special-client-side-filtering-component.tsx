"use client";

import ReactSelect from "../../../../components/wrapped-select";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// All data for showing dynamic plots.
import data from "./data.json";
import template from "./template.json";

const CustomFilteredPlotlyChart = () => {
  const PlotlyChart = dynamic(
    () => import("../../../../components/wrapped-plotly-chart"),
    {
      ssr: false,
    }
  );

  // State for selected event and gender
  const [selectedEvent, setSelectedEvent] = useState("Marathon");
  const [selectedGender, setSelectedGender] = useState("Both");

  // State for the filtered data
  const [filteredData, setFilteredData] = useState([]);
  // Function to convert "HH:MM:SS" string to a Date object for Plotly
  const parseTime = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return new Date(1970, 0, 1, hours, minutes, seconds);
  };

  // Filter data based on selected event and gender
  useEffect(() => {
    let filtered = data.filter((d) => d.event_name === selectedEvent);
    if (selectedGender !== "Both") {
      filtered = filtered.filter((d) => d.gender === selectedGender);
    }

    // Filter and parse valid time strings
    const validTimes = filtered
      .map((d) => d.time)
      .filter((time) => /^\d{2}:\d{2}:\d{2}$/.test(time)) // Keep only "HH:MM:SS" format
      .map(parseTime); // Convert to Date objects

    // Format the filtered data for Plotly
    const plotData = [
      {
        x: validTimes, // Use parsed times for x-axis
        type: "histogram",
        marker: {
          color: "blue",
        },
      },
    ];

    setFilteredData(plotData);
  }, [selectedEvent, selectedGender]);
  return (
    <>
      <p>Event:</p>
      <ReactSelect
        options={[
          { value: "Marathon", label: "Marathon" },
          { value: "Half Marathon", label: "Half Marathon" },
          { value: "10km", label: "10km" },
          { value: "5km", label: "5km" },
          { value: "2km", label: "2km" },
        ]}
        defaultValue={{ value: "Marathon", label: "Marathon" }}
        required={true}
        onChange={(option) => setSelectedEvent(option.value)}
      ></ReactSelect>
      <p>Gender:</p>
      <ReactSelect
        options={[
          { value: "Both", label: "Both" },
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
        defaultValue={{ value: "Both", label: "Both" }}
        required={true}
        onChange={(option) => setSelectedGender(option.value)}
      ></ReactSelect>
      <PlotlyChart
        data={filteredData}
        layout={{
          title: `${selectedEvent} - ${selectedGender}`,
          xaxis: { title: "Finish Time" },
          yaxis: { title: "Count" },
          template: template,
        }}
        config={{ responsive: true, displayModeBar: false }}
      />
    </>
  );
};

export default CustomFilteredPlotlyChart;
