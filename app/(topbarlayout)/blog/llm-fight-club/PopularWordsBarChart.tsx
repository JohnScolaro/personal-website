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

export default function PopularWordsHorizontalBarChart() {
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
const barChartCsvData = `god,6.257
will,5.490
university,4.848
community,4.721
keep,4.602
city,4.491
life,4.491
country,4.289
people,4.289
fact,3.862
might,3.449
family,3.388
police,3.388
war,3.328
saw,3.328
right,3.328
state,3.328
idea,3.270
world,3.103
woman,3.051
group,2.948
year,2.899
enough,2.803
being,2.756
there,2.620
child,2.620
deal,2.534
reason,2.491
million,2.368
area,2.368
home,2.328
job,2.328
change,2.288
story,2.249
heart,2.249
much,2.249
head,2.211
start,2.211
president,2.173
information,2.173
room,2.098
act,2.098
court,1.988
man,1.988
general,1.952
news,1.952
thought,1.917
history,1.882
today,1.847
research,1.812
making,1.744
body,1.711
mind,1.644
national,1.578
person,1.546
government,1.529
here,1.514
think,1.514
more,1.505
age,1.450
given,1.426
team,1.418
love,1.386
day,1.386
turn,1.386
game,1.355
problem,1.324
morning,1.293
house,1.262
place,1.201
power,1.201
time,1.201
company,1.140
law,1.140
hope,1.110
move,1.110
night,1.110
run,1.080
friend,1.080
show,1.050
international,1.020
working,1.020
kind,0.990
side,0.960
book,0.931
due,0.931
two,0.901
service,0.901
music,0.901
development,0.843
car,0.813
business,0.813
past,0.813
watch,0.784
call,0.755
lot,0.755
hand,0.726
days,0.697
office,0.697
work,0.697
minutes,0.639
can,0.639
white,0.581
real,0.553
guy,0.524
read,0.524
order,0.466
level,0.466
look,0.438
school,0.380
need,0.380
party,0.380
while,0.380
saying,0.307
data,0.294
play,0.294
yes,0.266
system,0.237
following,0.237
course,0.237
series,0.180
last,0.180
money,0.123
question,0.123
red,0.094
must,0.094
york,0.094
know,0.036
health,0.036
american,0.036
class,-0.021
are,-0.050
season,-0.079
video,-0.079
true,-0.100
water,-0.108
death,-0.137
cause,-0.195
air,-0.195
face,-0.312
black,-0.312
way,-0.312
large,-0.351
things,-0.370
high,-0.370
leave,-0.370
number,-0.400
name,-0.430
short,-0.439
services,-0.549
first,-0.549
control,-0.579
then,-0.609
going,-0.639
see,-0.700
few,-0.739
still,-0.761
one,-0.792
over,-0.792
whole,-0.823
girl,-0.823
old,-0.823
hours,-0.854
good,-0.980
form,-0.980
stay,-0.980
check,-1.011
four,-1.076
five,-1.108
support,-1.108
future,-1.140
north,-1.206
mean,-1.239
report,-1.272
nice,-1.305
great,-1.339
local,-1.339
found,-1.339
public,-1.373
end,-1.407
wrong,-1.407
light,-1.441
thing,-1.510
tell,-1.510
better,-1.545
thanks,-1.580
may,-1.724
week,-1.724
best,-1.761
take,-1.761
bit,-1.767
playing,-1.835
like,-1.835
stop,-1.873
possible,-1.911
top,-1.911
why,-1.949
half,-1.949
out,-1.949
single,-2.027
wait,-2.027
feel,-2.067
times,-2.106
case,-2.147
down,-2.147
least,-2.192
well,-2.229
win,-2.271
say,-2.313
south,-2.356
food,-2.399
fuck,-2.399
john,-2.487
post,-2.533
get,-2.625
three,-2.719
second,-2.719
third,-2.817
now,-2.970
looking,-3.077
matter,-3.304
special,-3.304
free,-3.364
point,-3.425
give,-3.425
nothing,-3.488
use,-3.552
shit,-3.618
hit,-3.686
line,-3.828
means,-3.828
part,-3.828
talk,-3.902
little,-3.902
set,-3.979
care,-4.058
open,-4.058
young,-4.058
back,-4.837
left,-4.837
low,-4.837
small,-4.962
bad,-4.962
let,-5.787`;
