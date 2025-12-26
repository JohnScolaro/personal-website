"use client";

import ReactSelect from "../../../../components/wrapped-select";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic<any>(() => import("react-plotly.js"), { ssr: false });

// All data for showing dynamic plots.
import data from "./data.json";
import template from "./template.json";

const CustomFilteredPlotlyChart = () => {
  // State for selected event and gender
  const [selectedEvent, setSelectedEvent] = useState<string>("Marathon");
  const [selectedGender, setSelectedGender] = useState<string>("Both");

  // State for the filtered data
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Function to convert "HH:MM:SS" string to number of seconds for Plotly
  const parseTime = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
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
        marker: { color: "blue" },
      },
    ];

    setFilteredData(plotData);
  }, [selectedEvent, selectedGender]);

  return (
    <div className="space-y-4">
      <div>
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
          required
          onChange={(option) => setSelectedEvent(option.value)}
          id="Race Type Dropdown"
        />
      </div>

      <div>
        <p>Gender:</p>
        <ReactSelect
          options={[
            { value: "Both", label: "Both" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ]}
          defaultValue={{ value: "Both", label: "Both" }}
          required
          onChange={(option) => setSelectedGender(option.value)}
          id="Gender Dropdown"
        />
      </div>

      <div className="w-full h-96">
        <Plot
          data={filteredData}
          layout={{
            title: `${selectedEvent} - ${selectedGender}`,
            xaxis: { title: "Finish Time (seconds)" },
            yaxis: { title: "Count" },
            template: template,
          }}
          config={{ responsive: true, displayModeBar: false }}
        />
      </div>
    </div>
  );
};

export default CustomFilteredPlotlyChart;
