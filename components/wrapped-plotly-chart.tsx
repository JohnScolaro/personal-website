// components/wrapped-plotly-chart.tsx
"use client";

import dynamic from "next/dynamic";

// don't SSR Plotly
const Plot = dynamic<any>(() => import("react-plotly.js"), { ssr: false });

interface PlotlyChartProps {
  data: any[];
  layout?: any;
  config?: any;
}

export default function PlotlyChart({
  data,
  layout,
  config,
}: PlotlyChartProps) {
  // NOTE: remove the manual window.dispatchEvent('resize') call entirely.
  // rely on react-plotly's useResizeHandler and an explicit container height.

  return (
    <div className="w-full overflow-hidden" style={{ minHeight: 300 }}>
      <Plot
        data={data}
        layout={{
          autosize: true,
          ...layout,
        }}
        config={{
          responsive: true,
          displayModeBar: false,
          ...config,
        }}
        style={{ width: "100%", height: layout?.height ?? "100%" }}
        useResizeHandler={true}
      />
    </div>
  );
}
