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

export default function AnimalsHorizontalBarChart() {
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
const barChartCsvData = `dinosaur,8.313
hippopotamus,8.313
jaguar,7.819
wolverine,6.554
alligator,6.329
tiger,6.328
leopard,6.124
elephant,5.936
crocodile,5.449
walrus,5.039
bear,5.038
shark,4.725
badger,4.680
buffalo,4.569
chimpanzee,4.569
panther,4.569
whale,4.569
mammoth,4.461
rhinoceros,4.320
cougar,4.306
eagle,4.255
cheetah,4.156
dolphin,4.155
gorilla,4.058
moose,3.964
ram,3.963
echidna,3.603
beaver,3.576
lion,3.516
mongoose,3.186
boar,3.185
octopus,3.185
bobcat,3.105
kangaroo,3.105
wolf,3.105
horse,2.949
ostrich,2.873
ape,2.797
bull,2.796
falcon,2.647
hyena,2.576
hawk,2.576
seal,2.292
narwhal,2.284
giraffe,2.223
barracuda,2.223
otter,2.087
squid,2.085
camel,2.018
porcupine,1.824
spider,1.757
porpoise,1.756
cat,1.634
locust,1.628
weasel,1.571
goat,1.571
hornet,1.510
baboon,1.449
armadillo,1.268
monkey,1.209
lyrebird,1.209
crab,1.093
goose,1.093
cow,1.036
snake,1.036
hare,0.922
lobster,0.808
deer,0.591
ox,0.591
wombat,0.538
dog,0.538
owl,0.484
stingray,0.476
turtle,0.379
wasp,0.328
viper,0.274
llama,0.274
zebra,0.274
raccoon,0.226
anteater,0.171
aardvark,0.069
raven,0.069
crane,0.069
pelican,-0.132
gazelle,-0.132
pig,-0.132
turkey,-0.182
mole,-0.232
fox,-0.281
heron,-0.331
platypus,-0.376
polar bear,-0.390
salmon,-0.424
donkey,-0.429
penguin,-0.474
albatross,-0.522
mink,-0.526
iguana,-0.575
human,-0.616
ferret,-0.664
cobra,-0.720
komodo dragon,-0.738
crow,-1.004
alpaca,-1.004
bat,-1.057
bee,-1.057
dragonfly,-1.057
curlew,-1.153
swan,-1.153
sea lion,-1.254
toucan,-1.290
salamander,-1.297
emu,-1.385
squirrel,-1.442
lizard,-1.475
mosquito,-1.475
gecko,-1.532
skink,-1.578
ibis,-1.585
meerkat,-1.619
frog,-1.627
gull,-1.677
pony,-1.686
skunk,-1.724
rabbit,-1.861
flamingo,-1.871
rat,-1.910
shrew,-1.921
lemur,-2.009
jay,-2.009
seahorse,-2.070
pheasant,-2.073
parrot,-2.073
hummingbird,-2.108
toad,-2.222
opossum,-2.259
panda,-2.273
cockroach,-2.406
duck,-2.413
mallard,-2.464
starfish,-2.481
chicken,-2.484
koala,-2.562
ant,-2.676
termite,-2.918
sea otter,-2.962
eel,-2.983
quail,-3.096
bird,-3.122
beetle,-3.122
mouse,-3.153
sandpiper,-3.166
sheep,-3.166
red panda,-3.216
grasshopper,-3.224
newt,-3.285
sardine,-3.300
pigeon,-3.344
pug,-3.361
cod,-3.466
jellyfish,-3.595
herring,-3.637
oyster,-3.773
fish,-3.860
kite,-3.862
snail,-3.865
cardinal,-3.932
hamster,-3.973
manatee,-4.153
gerbil,-4.247
hermit crab,-4.260
sloth,-4.308
sand dollar,-4.388
moth,-4.404
gnat,-4.844
fly,-4.844
ladybug,-4.943
budgerigar,-5.047
guinea pig,-5.116
finch,-5.274
dove,-5.395
butterfly,-5.528`;
