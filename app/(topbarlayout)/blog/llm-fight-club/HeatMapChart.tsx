"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

interface HeatmapProps {
  players: string[];
  results: number[][];
}

export default function BattleHeatmap({ players, results }: HeatmapProps) {
  const option = {
    tooltip: {
      position: "top",
      formatter: ({ value }: { value: [number, number, number] }) => {
        const [x, y, result] = value; // IMPORTANT: x is opponent, y is battler
        if (x === y) return "Same player";
        const battler = players[y];
        const opponent = players[x];
        if (result === 1) return `${battler} beat ${opponent}`;
        if (result === -1) return `${battler} lost to ${opponent}`;
        return `${battler} tied with ${opponent}`;
      },
    },
    grid: {
      height: "80%",
      width: "80%",
      top: "10%",
      left: "10%",
    },
    xAxis: {
      type: "category",
      data: players,
      name: "Opponent",
      nameLocation: "middle",
      nameGap: 30,
      splitArea: {
        show: true,
      },
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: "category",
      data: players,
      name: "Battler",
      nameLocation: "middle",
      nameGap: 50,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "2%",
      inRange: {
        color: ["#d73027", "#ffffbf", "#1a9850"], // red = loss, yellow = tie, green = win
      },
      show: false,
    },
    series: [
      {
        name: "Battle Results",
        type: "heatmap",
        data: generateHeatmapData(results),
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
      <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

function generateHeatmapData(results: number[][]) {
  const data: [number, number, number][] = [];
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].length; j++) {
      data.push([j, i, results[i][j]]); // x = opponent (j), y = battler (i)
    }
  }
  return data;
}
