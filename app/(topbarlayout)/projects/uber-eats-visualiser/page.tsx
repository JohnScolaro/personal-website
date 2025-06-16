"use client";

import { useState, ReactElement } from "react";
import * as Papa from "papaparse";
import dynamic from "next/dynamic";
import { parseISO, differenceInDays, addDays, format } from "date-fns";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
    {children}
  </div>
);

// ----- Types -----
type OrderKey = string;
type AggregatedOrder = {
  city: string;
  restaurant: string;
  requestTime: string;
  deliveryTime: string;
  currency: string;
  price: number;
  items: Record<string, number>;
};

// ----- Analysis Utils -----
function buildOrderMap(rows: any[]): Record<OrderKey, AggregatedOrder> {
  const map: Record<string, AggregatedOrder> = {};

  for (const row of rows) {
    // Skip rows where order status isn't "completed"
    if (row.Order_Status?.toLowerCase() !== "completed") continue;

    const key = `${row.Restaurant_Name}__${row.Request_Time_Local}`;
    const itemName = row.Item_Name;
    const itemQuantity = parseInt(row.Item_Quantity || "1", 10) || 1;

    if (!map[key]) {
      map[key] = {
        city: row.City_Name,
        restaurant: row.Restaurant_Name,
        requestTime: row.Request_Time_Local,
        deliveryTime: row.Final_Delivery_Time_Local,
        currency: row.Currency,
        price: parseFloat(row.Order_Price || "0"),
        items: {},
      };
    }

    if (!(itemName in map[key].items)) {
      map[key].items[itemName] = itemQuantity;
    }
  }

  return map;
}

function getBasicStatisticsCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const values = Object.values(orders);
  const totalSpent = values.reduce((sum, order) => sum + order.price, 0);
  const orderCount = values.length;

  // Get all unique order dates (YYYY-MM-DD)
  const orderDates = new Set<string>();
  values.forEach((order) => {
    const dateOnly = order.requestTime.split("T")[0]; // or slice(0, 10)
    orderDates.add(dateOnly);
  });

  const sortedDates = Array.from(orderDates)
    .map((d) => parseISO(d))
    .sort((a, b) => a.getTime() - b.getTime());

  let longestStreak = 0;
  let currentStreak = 1;
  let longestStreakRange: [Date, Date] = [sortedDates[0], sortedDates[0]];
  let currentStart = sortedDates[0];

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const curr = sortedDates[i];
    const diff = differenceInDays(curr, prev);

    if (diff === 1) {
      currentStreak += 1;
    } else {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        longestStreakRange = [currentStart, prev];
      }
      currentStreak = 1;
      currentStart = curr;
    }
  }

  // Final streak check
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    longestStreakRange = [currentStart, sortedDates[sortedDates.length - 1]];
  }

  // Longest streak *without* Uber Eats
  let longestGap = 0;
  let longestGapRange: [Date, Date] | null = null;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = sortedDates[i - 1];
    const curr = sortedDates[i];
    const gap = differenceInDays(curr, prev);

    if (gap > longestGap + 1) {
      longestGap = gap - 1;
      longestGapRange = [addDays(prev, 1), addDays(curr, -1)];
    }
  }

  // Most expensive order
  const mostExpensiveOrder = values.reduce((max, order) =>
    order.price > max.price ? order : max
  );

  const averageOrderCost = totalSpent / orderCount;

  return (
    <Card>
      <p>
        <strong>Total Successful Orders:</strong> {orderCount}
      </p>
      <p>
        <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
      </p>
      <p>
        <strong>Average Order Cost:</strong> ${averageOrderCost.toFixed(2)}
      </p>
      <p>
        <strong>Longest Daily Streak:</strong> {longestStreak} days (
        {format(longestStreakRange[0], "yyyy-MM-dd")} to{" "}
        {format(longestStreakRange[1], "yyyy-MM-dd")})
      </p>
      {longestGapRange && (
        <p>
          <strong>Longest Break Without Uber Eats:</strong> {longestGap} days (
          {format(longestGapRange[0], "yyyy-MM-dd")} to{" "}
          {format(longestGapRange[1], "yyyy-MM-dd")})
        </p>
      )}
      <p>
        <strong>Most Expensive Order:</strong> $
        {mostExpensiveOrder.price.toFixed(2)} at {mostExpensiveOrder.restaurant}{" "}
        on {format(parseISO(mostExpensiveOrder.requestTime), "yyyy-MM-dd")}
      </p>
    </Card>
  );
}

function getTopTenRestaurantsBySpendCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const values = Object.values(orders);
  const perRestaurant: Record<string, number> = {};

  values.forEach((order) => {
    perRestaurant[order.restaurant] =
      (perRestaurant[order.restaurant] || 0) + order.price;
  });

  const topTen = Object.entries(perRestaurant)
    .sort((a, b) => b[1] - a[1]) // sort by spend descending
    .slice(0, 10); // take top 10

  return (
    <Card>
      <ReactECharts
        option={{
          title: {
            text: "Spending by Restaurant",
          },
          tooltip: {},
          grid: { bottom: 150 },
          xAxis: {
            type: "category",
            data: topTen.map(([name]) => name), // restaurant names
            axisLabel: {
              rotate: 90,
              interval: 0,
              overflow: "truncate", // optional: or use "break" to wrap
              formatter: (value: string) =>
                value.length > 25 ? value.slice(0, 25) + "…" : value,
            },
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              type: "bar",
              data: topTen.map(([_, spend]) => spend), // spend amounts
            },
          ],
        }}
        style={{ height: 500 }}
      />
    </Card>
  );
}

function getTopTenRestaurantsByCountCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const values = Object.values(orders);
  const frequencyPerRestaurant: Record<string, number> = {};

  values.forEach((order) => {
    frequencyPerRestaurant[order.restaurant] =
      (frequencyPerRestaurant[order.restaurant] || 0) + 1;
  });

  const topTwo = Object.entries(frequencyPerRestaurant)
    .sort((a, b) => b[1] - a[1]) // sort by frequency descending
    .slice(0, 10);

  return (
    <Card>
      <ReactECharts
        option={{
          title: {
            text: "Most Frequented Restaurants",
          },
          tooltip: {},
          grid: { bottom: 150 },
          xAxis: {
            type: "category",
            data: topTwo.map(([name]) => name),
            axisLabel: {
              rotate: 90,
              interval: 0,
              formatter: (value: string) =>
                value.length > 25 ? value.slice(0, 25) + "…" : value,
            },
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              type: "bar",
              data: topTwo.map(([_, count]) => count),
            },
          ],
        }}
        style={{ height: 400 }}
      />
    </Card>
  );
}

function getTopTenItemsByFrequencyCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const values = Object.values(orders);
  const itemCounts: Record<string, number> = {};

  values.forEach((order) => {
    Object.entries(order.items).forEach(([itemName, quantity]) => {
      itemCounts[itemName] = (itemCounts[itemName] || 0) + quantity;
    });
  });

  const topTenItems = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1]) // sort by total quantity descending
    .slice(0, 10); // take top 10

  return (
    <Card>
      <ReactECharts
        option={{
          title: {
            text: "Top 10 Most Ordered Items",
          },
          tooltip: {},
          grid: { bottom: 150 },
          xAxis: {
            type: "category",
            data: topTenItems.map(([item]) => item),
            axisLabel: {
              rotate: 90,
              interval: 0,
              formatter: (value: string) =>
                value.length > 25 ? value.slice(0, 25) + "…" : value,
            },
          },
          yAxis: {
            type: "value",
            name: "Orders",
          },
          series: [
            {
              type: "bar",
              data: topTenItems.map(([_, count]) => count),
            },
          ],
        }}
        style={{ height: 500 }}
      />
    </Card>
  );
}
function getDayOfWeekCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const dayCounts: Record<string, number> = {};
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  Object.values(orders).forEach((order) => {
    const day = days[parseISO(order.requestTime).getDay()];
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });

  return (
    <Card>
      <ReactECharts
        option={{
          title: { text: "Most Common Day of Week" },
          tooltip: {},
          xAxis: {
            type: "category",
            data: days,
          },
          yAxis: {
            type: "value",
            name: "Orders",
          },
          series: [
            {
              type: "bar",
              data: days.map((d) => dayCounts[d] || 0),
            },
          ],
        }}
        style={{ height: 400 }}
      />
    </Card>
  );
}

function getTimeOfDayCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const hourCounts: number[] = new Array(24).fill(0);

  Object.values(orders).forEach((order) => {
    const utcDate = parseISO(order.requestTime); // This is UTC
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000 * -1
    ); // Convert to browser local time
    const hour = localDate.getHours(); // Local hour
    hourCounts[hour]++;
  });

  return (
    <Card>
      <div className="p-4">
        <p className="text-sm text-gray-500 italic mb-2">
          Times shown in your local timezone (
          {Intl.DateTimeFormat().resolvedOptions().timeZone})
        </p>
        <ReactECharts
          option={{
            title: { text: "Most Common Time of Day" },
            tooltip: {},
            xAxis: {
              type: "category",
              data: Array.from({ length: 24 }, (_, h) => `${h}:00`),
              axisLabel: { rotate: 45 },
            },
            yAxis: {
              type: "value",
              name: "Orders",
            },
            series: [
              {
                type: "bar",
                data: hourCounts,
              },
            ],
          }}
          style={{ height: 400 }}
        />
      </div>
    </Card>
  );
}

function getPriceVsTimeOfDayScatterCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const points: [number, number][] = [];

  Object.values(orders).forEach((order) => {
    const utcDate = parseISO(order.requestTime); // This is UTC
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * -60000
    ); // Convert to local time
    const hour = localDate.getHours() + localDate.getMinutes() / 60;
    points.push([hour, order.price]);
  });

  return (
    <Card>
      <div className="p-4">
        <p className="text-sm text-gray-500 italic mb-2">
          Times shown in your local timezone (
          {Intl.DateTimeFormat().resolvedOptions().timeZone})
        </p>
        <ReactECharts
          option={{
            title: { text: "Order Price vs Time of Day" },
            tooltip: {
              formatter: ({ data }: { data: [number, number] }) =>
                `Time: ${data[0].toFixed(2)}h<br/>Price: $${data[1].toFixed(
                  2
                )}`,
            },
            xAxis: {
              type: "value",
              name: "Time of Day (hours)",
              min: 0,
              max: 24,
              interval: 1,
              axisLabel: {
                formatter: (val: number) => `${Math.floor(val)}:00`,
              },
            },
            yAxis: {
              type: "value",
              name: "Order Price ($)",
            },
            series: [
              {
                type: "scatter",
                data: points,
                symbolSize: 8,
                itemStyle: {
                  color: "#5470C6",
                },
              },
            ],
          }}
          style={{ height: 400 }}
        />
      </div>
    </Card>
  );
}

export default function UberEatsAnalysisPage() {
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Record<
    OrderKey,
    AggregatedOrder
  > | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data as any[];
          const requiredHeaders = [
            "City_Name",
            "Restaurant_Name",
            "Request_Time_Local",
            "Final_Delivery_Time_Local",
            "Order_Status",
            "Item_Name",
            "Item_quantity",
            "Item_Price",
            "Order_Price",
            "Currency",
          ];

          const headers = Object.keys(data[0]);
          const missing = requiredHeaders.filter((h) => !headers.includes(h));

          if (missing.length > 0) {
            throw new Error(`Missing columns: ${missing.join(", ")}`);
          }

          const cleaned = data.filter(
            (row) => row.Order_Status === "completed"
          );
          const orderMap = buildOrderMap(cleaned);

          setOrders(orderMap);
          setError(null);
        } catch (e: any) {
          setOrders(null);
          setError(e.message);
        }
      },
      error: (err) => setError(err.message),
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Uber Eats Order Analysis</h1>
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-2"
        />
        <br />
      </div>
      {error && <p className="text-red-600 mt-4">Error: {error}</p>}
      <hr className="my-6" />

      {orders && (
        <div className="space-y-6">
          {(() => {
            return (
              <>
                {getBasicStatisticsCard(orders)}
                {getTopTenRestaurantsBySpendCard(orders)}
                {getTopTenRestaurantsByCountCard(orders)}
                {getTopTenItemsByFrequencyCard(orders)}
                {getDayOfWeekCard(orders)}
                {getTimeOfDayCard(orders)}
                {getPriceVsTimeOfDayScatterCard(orders)}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
