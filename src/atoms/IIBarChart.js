import React from 'react';
import "./IIBarChart.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function IIBarChart() {
  const data = [
    {
      name: 'Mbarara',
      NewCrimes: 4000,
      ClosedCrimes: 2400,
      amt: 2400,
    },
    {
      name: 'Kampala',
      NewCrimes: 3000,
      ClosedCrimes: 1398,
      amt: 2210,
    },
    {
      name: 'Masaka',
      NewCrimes: 2000,
      ClosedCrimes: 9800,
      amt: 2290,
    },
    {
      name: 'Hoima',
      NewCrimes: 2780,
      ClosedCrimes: 3908,
      amt: 2000,
    },
    {
      name: 'Masindi',
      NewCrimes: 1890,
      ClosedCrimes: 4800,
      amt: 2181,
    },
    {
      name: 'Soroti',
      NewCrimes: 2390,
      ClosedCrimes: 3800,
      amt: 2500,
    },
    {
      name: 'Gulu',
      NewCrimes: 3490,
      ClosedCrimes: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className='bar-sect'>
      <div className='bar-chart-holder'>
        <div className='activity-text'>
          <h3 className='activity-title'>Subversion Activities By District</h3>
        </div>
        <div className='bar-holder'>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ClosedCrimes" fill="#8884d8" />
              <Bar dataKey="NewCrimes" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default IIBarChart;
