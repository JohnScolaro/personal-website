"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const AnimatedBarChart = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const option = {
    title: {
      text: "LLM Fight Wins",
      left: "center",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Model A", "Model B", "Model C", "Model D"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        data: inView ? [5, 20, 36, 10] : [0, 0, 0, 0],
        animationDuration: 1000,
        animationEasing: "cubicOut",
      },
    ],
  };

  return (
    <div ref={ref} className="my-8">
      <ReactECharts option={option} style={{ height: "400px" }} />
      <p className="text-center mt-4 text-gray-600">
        Number of fights won by each language model.
      </p>
    </div>
  );
};

export default AnimatedBarChart;
