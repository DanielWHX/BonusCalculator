// src/components/profitCalculator.js

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function profitCalculator() {
  const [items, setItems] = useState([
    { name: 'Rocket Pack', cost: 2, price: 4, quantity: 120 },
    { name: 'Rocket Bag', cost: 70 / 30, price: 4, quantity: 120 },
    { name: 'Hot Wind Pack', cost: 1.6, price: 3, quantity: 120 },
  ]);
  const [hours, setHours] = useState(4);
  const [wage, setWage] = useState(15);
  const [feeRate, setFeeRate] = useState(0.2);

  const totalCost = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  const grossRevenue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const netRevenue = grossRevenue * (1 - feeRate);
  const employeeCost = wage * hours;
  const netProfit = netRevenue - totalCost - employeeCost;
  const profitRate = (netProfit / netRevenue) * 100;

  const chartData = {
    labels: ['Cost', 'Employee Pay', 'Profit'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [totalCost.toFixed(2), employeeCost.toFixed(2), netProfit.toFixed(2)],
        backgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
      },
    ],
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">TCG Profit Calculator</h2>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center">
            <input
              type="text"
              value={item.name}
              onChange={(e) => {
                const updated = [...items];
                updated[index].name = e.target.value;
                setItems(updated);
              }}
              className="border p-2"
            />
            <input
              type="number"
              value={item.cost}
              onChange={(e) => {
                const updated = [...items];
                updated[index].cost = parseFloat(e.target.value);
                setItems(updated);
              }}
              className="border p-2"
              placeholder="Cost"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => {
                const updated = [...items];
                updated[index].price = parseFloat(e.target.value);
                setItems(updated);
              }}
              className="border p-2"
              placeholder="Price"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const updated = [...items];
                updated[index].quantity = parseInt(e.target.value);
                setItems(updated);
              }}
              className="border p-2"
              placeholder="Qty"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseFloat(e.target.value))}
          className="border p-2"
          placeholder="Hours"
        />
        <input
          type="number"
          value={wage}
          onChange={(e) => setWage(parseFloat(e.target.value))}
          className="border p-2"
          placeholder="Wage/hr"
        />
        <input
          type="number"
          value={feeRate}
          onChange={(e) => setFeeRate(parseFloat(e.target.value))}
          className="border p-2"
          placeholder="Platform Fee (e.g. 0.2)"
        />
      </div>

      <div className="mt-6 text-lg">
        <p><strong>Gross Revenue:</strong> ${grossRevenue.toFixed(2)}</p>
        <p><strong>Net Revenue (after fees):</strong> ${netRevenue.toFixed(2)}</p>
        <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
        <p><strong>Employee Pay:</strong> ${employeeCost.toFixed(2)}</p>
        <p><strong>Net Profit:</strong> ${netProfit.toFixed(2)}</p>
        <p><strong>Profit Rate:</strong> {profitRate.toFixed(2)}%</p>
      </div>

      <div className="mt-8">
        <Bar data={chartData} />
      </div>
    </div>
  );
}
