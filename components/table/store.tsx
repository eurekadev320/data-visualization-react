import { Query, Store } from "@/pages/store/[store]";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const StoreTable: React.FC<{
  data: Store[];
  count: number;
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
}> = ({ data, count, query, setQuery }) => {
  const [pages, setPages] = useState<{
    prev: number[];
    mid: number[];
    last: boolean;
  }>({
    prev: [],
    mid: [],
    last: true,
  });
  useEffect(() => {
    let prev: number[] = [],
      mid: number[] = [],
      last = false;
    const all = Math.floor(count / 10);
    if (query.page < 5) {
      prev = Array.from({ length: all > 7 ? 5 : all }, (_, i) => i + 1);
    }
    if (query.page > 4) {
      mid = Array.from({ length: 5 }, (_, i) =>
        query.page < all - 5 ? i + query.page - 1 : i + all - 4
      );
      if (!mid.includes(2)) prev = [1];
    }
    if (!prev.includes(all) && !mid.includes(all + 1)) last = true;
    setPages({ prev, mid, last });
  }, [query, count]);
  return (
    <>
      <table className="w-full mt-0 text-gray-500 text-sm font-normal">
        <thead className="text-left text-gray-500 font-semibold">
          <tr>
            <th className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold hover:bg-gray-100 cursor-pointer">
              #
            </th>
            <th
              onClick={() =>
                setQuery({
                  page: 0,
                  sortBy: "arrivalTime",
                  desc: query.sortBy == "arrivalTime" && query.desc ? 0 : 1,
                })
              }
              className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                Arrival Time
                <svg
                  className={classNames(
                    "h-5 w-5",
                    query.sortBy == "arrivalTime"
                      ? "text-gray-900"
                      : "text-gray-300 -rotate-90",
                    query.desc && query.sortBy == "arrivalTime"
                      ? "-rotate-90"
                      : "rotate-90"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </th>
            <th
              onClick={() =>
                setQuery({
                  page: 0,
                  sortBy: "orderTime",
                  desc: query.sortBy == "orderTime" && query.desc ? 0 : 1,
                })
              }
              className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                Order Time
                <svg
                  className={classNames(
                    "h-5 w-5",
                    query.sortBy == "orderTime"
                      ? "text-gray-900"
                      : "text-gray-300 -rotate-90",
                    query.desc && query.sortBy == "orderTime"
                      ? "-rotate-90"
                      : "rotate-90"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </th>
            <th
              onClick={() =>
                setQuery({
                  page: 0,
                  sortBy: "pickupTime",
                  desc: query.sortBy == "pickupTime" && query.desc ? 0 : 1,
                })
              }
              className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                Pickup Time
                <svg
                  className={classNames(
                    "h-5 w-5",
                    query.sortBy == "pickupTime"
                      ? "text-gray-900"
                      : "text-gray-300 -rotate-90",
                    query.desc && query.sortBy == "pickupTime"
                      ? "-rotate-90"
                      : "rotate-90"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </th>
            <th
              onClick={() =>
                setQuery({
                  page: 0,
                  sortBy: "totalTime",
                  desc: query.sortBy == "totalTime" && query.desc ? 0 : 1,
                })
              }
              className="whitespace-nowrap text-left text-gray-500 top-0 pl-4 pr-4 pt-3.5 pb-3.5 font-semibold hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                Total Time
                <svg
                  className={classNames(
                    "h-5 w-5",
                    query.sortBy == "totalTime"
                      ? "text-gray-900"
                      : "text-gray-300 -rotate-90",
                    query.desc && query.sortBy == "totalTime"
                      ? "-rotate-90"
                      : "rotate-90"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="align-top overflow-x-auto divide-y divide-gray-200">
          {data.map((d, index) => (
            <tr key={index}>
              <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
                {index + 1 + query.page * 10}
              </td>
              <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
                {d.arrivalTime}
              </td>
              <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
                {d.orderTime}
              </td>
              <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
                {d.pickupTime}
              </td>
              <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4">
                {d.totalTime}
              </td>
              <td className="align-middle whitespace-nowrap tabular-nums text-left pl-4 pr-4 pt-4 pb-4"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium mx-1">{query.page * 10 + 1}</span>
            to
            <span className="font-medium mx-1">
              {query.page == Math.floor(count / 10)
                ? count
                : query.page * 10 + 10}
            </span>
            of
            <span className="font-medium mx-1">{count}</span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => {
                setQuery({
                  ...query,
                  page: query.page - 1,
                });
              }}
              disabled={query.page === 0}
              className={classNames(
                "relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                query.page ? "text-gray-400" : "text-gray-200"
              )}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {pages.prev.map((page) => (
              <button
                key={page}
                onClick={() => setQuery({ ...query, page: page - 1 })}
                className={classNames(
                  "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                  query.page == page - 1
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            ))}
            {pages.last && (
              <button
                onClick={() =>
                  setQuery({
                    ...query,
                    page: pages.mid.length ? query.page - 1 : query.page + 1,
                  })
                }
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 hover:bg-gray-50"
              >
                ...
              </button>
            )}
            {pages.mid.map((page) => (
              <button
                key={page}
                onClick={() => setQuery({ ...query, page: page - 1 })}
                className={classNames(
                  "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                  query.page == page - 1
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            ))}
            {!!pages.mid.length &&
              !pages.prev.includes(Math.floor(count / 10)) &&
              !pages.mid.includes(Math.floor(count / 10)) && (
                <button
                  onClick={() => setQuery({ ...query, page: query.page + 1 })}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 hover:bg-gray-50"
                >
                  ...
                </button>
              )}
            {pages.last && (
              <button
                onClick={() =>
                  setQuery({ ...query, page: Math.floor(count / 10) })
                }
                className={classNames(
                  "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                  query.page == Math.floor(count / 10)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                )}
              >
                {Math.floor(count / 10) + 1}
              </button>
            )}
            <button
              onClick={() => {
                setQuery({
                  ...query,
                  page: query.page + 1,
                });
              }}
              disabled={Math.floor(count / 10) == query.page}
              className={classNames(
                "relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                Math.floor(count / 10) == query.page
                  ? "text-gray-200"
                  : "text-gray-400"
              )}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default StoreTable;
