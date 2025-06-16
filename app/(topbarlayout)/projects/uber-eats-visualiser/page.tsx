"use client";

import { useState, ReactElement } from "react";
import * as Papa from "papaparse";
import dynamic from "next/dynamic";

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

    // Only add item if it's not already present
    if (!(itemName in map[key].items)) {
      map[key].items[itemName] = itemQuantity;
    }
  }

  return map;
}

function getBasisStatisticsCard(
  orders: Record<OrderKey, AggregatedOrder>
): ReactElement {
  const values = Object.values(orders);
  const totalSpent = values.reduce((sum, order) => sum + order.price, 0);
  const orderCount = values.length;

  return (
    <Card>
      <p>
        <strong>Total Orders:</strong> {orderCount}
      </p>
      <p>
        <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
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
            text: "Most Frequently Ordered From Restaurants",
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

// Placeholder for additional analysis functions
function generateTimeSeriesChart(_orders: Record<OrderKey, AggregatedOrder>) {
  // TODO: Implement time series spend chart
  return null;
}

function generateItemFrequencyChart(
  _orders: Record<OrderKey, AggregatedOrder>
) {
  // TODO: Implement item frequency bar chart
  return null;
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
                {getBasisStatisticsCard(orders)}
                {getTopTenRestaurantsBySpendCard(orders)}
                {getTopTenRestaurantsByCountCard(orders)}
                {getTopTenItemsByFrequencyCard(orders)}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// Ideas:
// Longest Streak
// Longest time w/o uber eats
// Most common day of week
// Most common time of day
// Order Price vs Time of Day chart.
