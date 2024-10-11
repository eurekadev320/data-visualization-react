import {data} from '../data'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(data.map(store => {
    const [orderTime, pickUpTime, totalTime] = store.reduce((time, row: any) => {
      time[0] += (!row['Order Time'] || isNaN(row['Order Time']) ? 0 : parseInt(row['Order Time']))
      time[1] += (!row['Order Time'] || isNaN(row['Order Time']) ? 0 : parseInt(row['Pickup Time']))
      time[2] += (!row['Order Time'] || isNaN(row['Order Time']) ? 0 : parseInt(row['Total Time']))
      return time
    }, [0, 0, 0])
    return {
      name: store[0]?.Store,
      orders: store.length,
      avgOrderTime: Math.round(orderTime / store.length),
      avgPickupTime: Math.round(pickUpTime / store.length),
      avgTotalTime: Math.round(totalTime / store.length)
    }
  }))
}