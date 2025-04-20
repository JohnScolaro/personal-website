"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Dynamically import echarts-for-react to ensure it only runs on the client-side
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function ColourHeatmap() {
  const [data, setData] = useState<{ players: string[]; results: number[][] }>({
    players: [],
    results: [],
  });

  // Use useEffect to parse data only once on component mount (client-side)
  useEffect(() => {
    const { players, results } = parseCSV(processedData);
    setData({ players, results });
  }, []); // Empty dependency array ensures this runs only once

  const { players: heatmapPlayers, results: heatmapResults } = data;

  // ECharts configuration object
  const option = {
    title: {
      text: "Battle Heatmap", // The title of the chart
      left: "center", // Positioning the title in the center
      top: "top", // Positioning the title at the top
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      position: "top",
      // Custom formatter for tooltip content based on heatmap data point
      formatter: ({ value }: { value: [number, number, number] }) => {
        const [x, y, result] = value; // x=opponentIndex, y=battlerIndex, result=outcome
        // Handle diagonal case (player vs self)
        if (x === y) return "Same player";
        const battler = heatmapPlayers[y]; // Player on the y-axis
        const opponent = heatmapPlayers[x]; // Player on the x-axis
        // Display result based on the value (-1, 0, 1)
        if (result === 1) return `"${battler}" beat "${opponent}"`;
        if (result === -1) return `"${battler}" lost to "${opponent}"`;
        return `"${battler}" tied with "${opponent}"`; // Assuming 0 means tie
      },
    },
    grid: {
      // Adjust grid positioning
      height: "80%",
      width: "80%",
      top: "10%",
      left: "10%",
    },
    xAxis: {
      type: "category",
      data: heatmapPlayers, // Player names for the x-axis labels
      name: "Opponent",
      nameLocation: "middle",
      nameGap: 50, // Increased gap for rotated labels
      splitArea: {
        show: true, // Show alternating background colors for readability
      },
      axisLabel: {
        rotate: 90, // Rotate labels to prevent overlap
      },
    },
    yAxis: {
      type: "category",
      data: heatmapPlayers, // Player names for the y-axis labels
      name: "Player",
      nameLocation: "middle",
      nameGap: 50, // Adjust gap for y-axis name
      splitArea: {
        show: true, // Show alternating background colors
      },
      inverse: true, // Invert y-axis so (0,0) is top-left
    },
    visualMap: {
      // Defines how data values map to colors
      min: -1, // Minimum data value (loss)
      max: 1, // Maximum data value (win)
      calculable: true, // Allow user interaction with the legend (if shown)
      orient: "horizontal",
      left: "center",
      bottom: "2%",
      inRange: {
        // Color mapping: red for loss, yellow for tie, green for win
        color: ["#d73027", "#ffffbf", "#1a9850"],
      },
      show: false, // Hide the visualMap legend component itself
    },
    series: [
      {
        name: "Battle Results",
        type: "heatmap",
        // Generate data in the format [xIndex, yIndex, value]
        data: generateHeatmapData(heatmapResults),
        label: {
          show: false, // Do not show labels on heatmap cells
        },
        emphasis: {
          // Style on hover
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    // Container div to control chart size, aspect ratio ensures it's square
    <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
      <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

/**
 * Parses CSV data into a sorted player list and a corresponding results matrix.
 * Assumes CSV format: PlayerA,PlayerB,Result (where Result is for PlayerA vs PlayerB)
 * Result: 1 = PlayerA wins, -1 = PlayerA loses, 0 = Tie
 * Sorts players by total wins in descending order.
 */
function parseCSV(csv: string): { players: string[]; results: number[][] } {
  if (!csv || csv.trim() === "") {
    return { players: [], results: [] };
  }
  const rows = csv
    .trim()
    .split("\n")
    .map((row) => row.split(","));

  const playerSet = new Set<string>();
  const winCounts: { [key: string]: number } = {};

  // Extract unique player names and initialize win counts
  rows.forEach(([playerA, playerB]) => {
    playerSet.add(playerA);
    playerSet.add(playerB);
    if (!(playerA in winCounts)) winCounts[playerA] = 0;
    if (!(playerB in winCounts)) winCounts[playerB] = 0;
  });

  const uniquePlayers = Array.from(playerSet);
  const numPlayers = uniquePlayers.length;
  const playerIndexMap: { [key: string]: number } = {};
  uniquePlayers.forEach((player, index) => {
    playerIndexMap[player] = index;
  });

  // Initialise results matrix with zeros (representing ties or no match initially).
  // The diagonal (player vs self) will remain 0.
  const initialResults: number[][] = Array(numPlayers)
    .fill(0)
    .map(() => Array(numPlayers).fill(0));

  // Populate the results matrix and accumulate wins
  rows.forEach(([playerA, playerB, resultStr]) => {
    const result = parseInt(resultStr, 10); // Result for PlayerA vs PlayerB
    const indexA = playerIndexMap[playerA];
    const indexB = playerIndexMap[playerB];

    // Ensure indices are valid before proceeding
    if (indexA === undefined || indexB === undefined || isNaN(result)) {
      console.warn(`Skipping invalid row: ${playerA},${playerB},${resultStr}`);
      return;
    }

    // Record the result from A's perspective
    initialResults[indexA][indexB] = result;
    // Record the inverse result from B's perspective
    initialResults[indexB][indexA] = -result; // Win becomes loss, loss becomes win, tie remains tie

    // Update win counts based on the result
    if (result === 1) {
      // Player A won
      winCounts[playerA]++;
    } else if (result === -1) {
      // Player B won (since A lost)
      winCounts[playerB]++;
    }
    // Ties (result === 0) don't contribute to win counts
  });

  // Create the list of players sorted by number of wins (descending)
  const sortedPlayers = [...uniquePlayers].sort(
    (a, b) => winCounts[b] - winCounts[a]
  );

  // Create a new player index map based on the sorted order
  const sortedPlayerIndexMap: { [key: string]: number } = {};
  sortedPlayers.forEach((player, index) => {
    sortedPlayerIndexMap[player] = index;
  });

  // Populate the final sorted results matrix according to the sorted player order
  const sortedResults: number[][] = Array(numPlayers)
    .fill(0)
    .map(() => Array(numPlayers).fill(0));

  for (let i = 0; i < numPlayers; i++) {
    // Row index (Battler)
    for (let j = 0; j < numPlayers; j++) {
      // Column index (Opponent)
      const battler = sortedPlayers[i];
      const opponent = sortedPlayers[j];
      // Find original indices to look up the result in the initial matrix
      const originalBattlerIndex = playerIndexMap[battler];
      const originalOpponentIndex = playerIndexMap[opponent];
      // Assign the result to the correct position in the sorted matrix
      sortedResults[i][j] =
        initialResults[originalBattlerIndex][originalOpponentIndex];
    }
  }

  return { players: sortedPlayers, results: sortedResults };
}

/**
 * Transforms the 2D results matrix into the format required by ECharts heatmap series.
 * ECharts format: [xIndex, yIndex, value]
 */
function generateHeatmapData(results: number[][]): [number, number, number][] {
  const data: [number, number, number][] = [];
  // Iterate through rows (y-axis, battler)
  for (let i = 0; i < results.length; i++) {
    // Iterate through columns (x-axis, opponent)
    for (let j = 0; j < results[i].length; j++) {
      // Add data point: [opponentIndex, battlerIndex, resultValue]
      data.push([j, i, results[i][j]]);
    }
  }
  return data;
}

const processedData = `Red,Orange,-1
Red,Yellow,1
Red,Green,1
Red,Blue,1
Red,Indigo,1
Red,Violet,1
Red,Black,1
Red,White,1
Orange,Yellow,1
Orange,Green,1
Orange,Blue,1
Orange,Indigo,1
Orange,Violet,1
Orange,Black,1
Orange,White,1
Yellow,Green,1
Yellow,Blue,1
Yellow,Indigo,1
Yellow,Violet,1
Yellow,Black,1
Yellow,White,1
Green,Blue,1
Green,Indigo,1
Green,Violet,1
Green,Black,-1
Green,White,-1
Blue,Indigo,-1
Blue,Violet,-1
Blue,Black,-1
Blue,White,-1
Indigo,Violet,-1
Indigo,Black,-1
Indigo,White,1
Violet,Black,-1
Violet,White,1
Black,White,1
`;
