'use client';

import CATEGORY_OPTIONS from '@/constants/Category';
import Category from '@/constants/Category';
import UserStatisticsDTO from '@/dtos/userStatistics.dto';
import { AdminStatService } from '@/services/AdminStatService';
import { useUser } from '@/UserContext';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Index() {
  const userContext = useUser();

  if (!userContext.user) {
    return notFound();
  }

  const [data, setData] = useState([] as UserStatisticsDTO[]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await new AdminStatService().getStatistics(userContext);

    console.log(response);

    if (response.data) {
      setData(response.data);
    }
  };

  const averageItemsPerCategory = () => {
    const totalCounts = new Map<string, number>();
    const occurrenceCounts = new Map<string, number>();

    for (const userStatistics of data) {
      for (const [category, count] of Object.entries(userStatistics.categoryItemCount)) {
        totalCounts.set(category, (totalCounts.get(category) || 0) + count);
        occurrenceCounts.set(category, (occurrenceCounts.get(category) || 0) + 1);
      }
    }

    const averages = new Map<string, number>();
    totalCounts.forEach((total, category) => {
      averages.set(category, total / occurrenceCounts.get(category)!);
    });

    return averages;
  };

  const getTopUsersByCategory = () => {
    const categoryMax: { [category: string]: { email: string; count: number; }; } = {};

    for (const userStatistics of data) {
      for (const [category, count] of Object.entries(userStatistics.categoryItemCount)) {
        if (!categoryMax[category] || count > categoryMax[category].count) {
          categoryMax[category] = { email: userStatistics.email, count };
        }
      }
    }

    return categoryMax;
  };

  return (
    <>
      <h1>Statistics</h1>

      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Number of items per category</th>
          </tr>
        </thead>
        <tbody>
          {data.map(u =>
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>
                <table>
                  <tbody>
                    {Object.entries(u.categoryItemCount).map(([category, count]) => (
                      <tr key={category}>
                        <td>{category}: {count}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <b>Total: {Object.values(u.categoryItemCount).reduce((acc, val) => acc + val, 0)}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <br />

      <h2>Users with most items per category</h2>

      <hr />

      <table className='table'>
        <tbody>
          {Object.entries(getTopUsersByCategory()).map(([category, userCount]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{userCount.email} ({userCount.count} items)</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h2>Average number of items per category</h2>

      <hr />

      <table className='table'>
        <tbody>
          {Array.from(averageItemsPerCategory().entries()).map(([category, count]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};