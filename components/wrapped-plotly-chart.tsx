"use client";

import Plot from "react-plotly.js";

const PlotlyChart = ({ data, layout, config }) => {
  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default PlotlyChart;
