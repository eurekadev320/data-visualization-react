import type { NextApiRequest, NextApiResponse } from 'next'
import {data as stores} from '../data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let { sortBy, desc } = req.query
  let data = stores.filter((store: any) => store[0].Store == req.query.store)[0].map((d: any) => ({
    arrivalTime: d['Arrival Time'],
    orderTime: (!d['Order Time'] || isNaN(d['Order Time'])) ? null : parseInt(d['Order Time']),
    pickupTime: (!d['Pickup Time'] || isNaN(d['Pickup Time'])) ? null : parseInt(d['Pickup Time']),
    totalTime: (!d['Total Time'] || isNaN(d['Total Time'])) ? null : parseInt(d['Total Time']),
  }))
  switch(sortBy) {
    case 'arrivalTime':
      data = data.sort((a, b) => {
        if (desc == '1') return new Date('2023 ' + a.arrivalTime).valueOf() - new Date('2023 ' + b.arrivalTime).valueOf()
        else return new Date('2023 ' + b.arrivalTime).valueOf() - new Date('2023 ' + a.arrivalTime).valueOf()
      })
      break
    case 'orderTime':
      data = data.sort((a, b) => {
        if (a.orderTime === null) return 1
        if (b.orderTime === null) return -1
        if (desc == '1') return a.orderTime - b.orderTime
        else return b.orderTime - a.orderTime
      })
      break
    case 'pickupTime':
      data = data.sort((a, b) => {
        if (a.pickupTime === null) return 1
        if (b.pickupTime === null) return -1
        if (desc == '1') return a.pickupTime - b.pickupTime
        else return b.pickupTime - a.pickupTime
      })
      break
    case 'totalTime':
      data = data.sort((a, b) => {
        if (a.totalTime === null) return 1
        if (b.totalTime === null) return -1
        if (desc == '1') return a.totalTime - b.totalTime
        else return b.totalTime - a.totalTime
      })
      break
  }

  let page = 0
  if (typeof req.query.page === 'string') {
    page = parseInt(req.query.page)
  }
  const limit = (page + 1) * 10 < data.length ? 10 : (data.length - page * 10)
  res.status(200).json({data: [...data].splice(page * 10, limit), count: data.length})
}