import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Cards({
  className = "",
}: {
  className?: string;
}) {
  const EnterprisePricings = [
    {
      icon: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggb3BhY2l0eT0iMC4zIiBkPSJNMTIgMjJDMTcuNTIyOCAyMiAyMiAxNy41MjI4IDIyIDEyQzIyIDYuNDc3MTUgMTcuNTIyOCAyIDEyIDJDNi40NzcxNSAyIDIgNi40NzcxNSAyIDEyQzIgMTcuNTIyOCA2LjQ3NzE1IDIyIDEyIDIyWiIgZmlsbD0iIzM3N0RGRiI+PC9wYXRoPgogIDxwYXRoIGQ9Ik0xOSAxMC40QzE5IDEwLjMgMTkgMTAuMiAxOSAxMEMxOSA4LjkgMTguMSA4IDE3IDhIMTYuOUMxNS42IDYuMiAxNC42IDQuMjk5OTUgMTMuOSAyLjE5OTk1QzEzLjMgMi4wOTk5NSAxMi42IDIgMTIgMkMxMS45IDIgMTEuOCAyIDExLjcgMkMxMi40IDQuNiAxMy41IDcuMTAwMDUgMTUuMSA5LjMwMDA1QzE1IDkuNTAwMDUgMTUgOS43IDE1IDEwQzE1IDExLjEgMTUuOSAxMiAxNyAxMkMxNy4xIDEyIDE3LjMgMTIgMTcuNCAxMS45QzE4LjYgMTMgMTkuOSAxNCAyMS40IDE0LjhDMjEuNCAxNC44IDIxLjUgMTQuOCAyMS41IDE0LjlDMjEuNyAxNC4yIDIxLjggMTMuNSAyMS45IDEyLjdDMjAuOSAxMi4xIDE5LjkgMTEuMyAxOSAxMC40WiIgZmlsbD0iIzM3N0RGRiI+PC9wYXRoPgogIDxwYXRoIGQ9Ik0xMiAxNUMxMSAxMy4xIDEwLjIgMTEuMiA5LjYwMDAxIDkuMTk5OTVDOS45MDAwMSA4Ljg5OTk1IDEwIDguNCAxMCA4QzEwIDcuMSA5LjQwMDAxIDYuMzk5OTggOC43MDAwMSA2LjA5OTk4QzguNDAwMDEgNC45OTk5OCA4LjIwMDAxIDMuOTAwMDUgOC4wMDAwMSAyLjgwMDA1QzcuMzAwMDEgMy4xMDAwNSA2LjcwMDAxIDMuNDAwMDIgNi4yMDAwMSAzLjkwMDAyQzYuNDAwMDEgNC44MDAwMiA2LjUwMDAxIDUuNiA2LjgwMDAxIDYuNUM2LjQwMDAxIDYuOSA2LjEwMDAxIDcuNCA2LjEwMDAxIDhDNi4xMDAwMSA5IDYuODAwMDEgOS44IDcuODAwMDEgMTBDOC4zMDAwMSAxMS42IDkuMDAwMDEgMTMuMiA5LjcwMDAxIDE0LjdDNy4xMDAwMSAxMy4yIDQuNzAwMDEgMTEuNSAyLjQwMDAxIDkuNUMyLjIwMDAxIDEwLjMgMi4xMDAwMSAxMS4xIDIuMTAwMDEgMTEuOUM0LjYwMDAxIDEzLjkgNy4zMDAwMSAxNS43IDEwLjEgMTcuMkMxMC4yIDE4LjIgMTEgMTkgMTIgMTlDMTIuNiAyMCAxMy4yIDIwLjkgMTMuOSAyMS44QzE0LjYgMjEuNyAxNS4zIDIxLjUgMTUuOSAyMS4yQzE1LjQgMjAuNSAxNC45IDE5LjggMTQuNCAxOS4xQzE1LjUgMTkuNSAxNi41IDE5LjkgMTcuNiAyMC4yQzE4LjMgMTkuOCAxOC45IDE5LjIgMTkuNCAxOC42QzE3LjYgMTguMSAxNS43IDE3LjUgMTQgMTYuN0MxMy45IDE1LjggMTMuMSAxNSAxMiAxNVoiIGZpbGw9IiMzNzdERkYiPjwvcGF0aD4KPC9zdmc+Cg==",
      name: "Bandwidth",
      description: "Deliver content to users around the world.",
      price: "0.09",
      currency: "$",
      unit: "GB",
    },
    {
      icon: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggb3BhY2l0eT0iMC4zIiBkPSJNNSA4LjA0OTk5TDExLjggMTEuOTVWMTkuODVMNSAxNS44NVY4LjA0OTk5WiIgZmlsbD0iIzM3N0RGRiI+PC9wYXRoPgogIDxwYXRoIGQ9Ik0yMC4xIDYuNjVMMTIuMyAyLjE1QzEyIDEuOTUgMTEuNiAxLjk1IDExLjMgMi4xNUwzLjUgNi42NUMzLjIgNi44NSAzIDcuMTUgMyA3LjQ1VjE2LjQ1QzMgMTYuNzUgMy4yIDE3LjE1IDMuNSAxNy4yNUwxMS4zIDIxLjc1QzExLjUgMjEuODUgMTEuNiAyMS44NSAxMS44IDIxLjg1QzEyIDIxLjg1IDEyLjEgMjEuODUgMTIuMyAyMS43NUwyMC4xIDE3LjI1QzIwLjQgMTcuMDUgMjAuNiAxNi43NSAyMC42IDE2LjQ1VjcuNDVDMjAuNiA3LjE1IDIwLjQgNi43NSAyMC4xIDYuNjVaTTUgMTUuODVWNy45NUwxMS44IDQuMDVMMTguNiA3Ljk1TDExLjggMTEuOTVWMTkuODVMNSAxNS44NVoiIGZpbGw9IiMzNzdERkYiPjwvcGF0aD4KPC9zdmc+Cg==",
      name: "Built-in Storage",
      description: "Store files using Bytescale's built-in storage.",
      price: "0.03",
      currency: "$",
      unit: "GB",
    },
    {
      icon: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggb3BhY2l0eT0iMC4zIiBkPSJNMi4xMDAwMSAxMEMzLjAwMDAxIDUuNiA2LjY5OTk4IDIuMyAxMS4yIDJMOC43OTk5OSA0LjM5OTk5TDExLjEgN0M5LjYwMDAxIDcuMyA4LjMwMDAxIDguMTk5OTkgNy42MDAwMSA5LjU5OTk5TDQuNSAxMi40TDIuMTAwMDEgMTBaTTE5LjMgMTEuNUwxNi40IDE0QzE1LjcgMTUuNSAxNC40IDE2LjYgMTIuNyAxNi45TDE1IDE5LjVMMTIuNiAyMS45QzE3LjEgMjEuNiAyMC44IDE4LjIgMjEuNyAxMy45TDE5LjMgMTEuNVoiIGZpbGw9IiMzNzdERkYiPjwvcGF0aD4KICA8cGF0aCBkPSJNMTMuOCAyLjA5OTk4QzE4LjIgMi45OTk5OCAyMS41IDYuNjk5OTggMjEuOCAxMS4yTDE5LjQgOC43OTk5N0wxNi44IDExQzE2LjUgOS4zOTk5OCAxNS41IDguMDk5OTggMTQgNy4zOTk5OEwxMS40IDQuMzk5OThMMTMuOCAyLjA5OTk4Wk0xMi4zIDE5LjRMOS42OTk5OCAxNi40QzguMjk5OTggMTUuNyA3LjMgMTQuNCA3IDEyLjhMNC4zOTk5OSAxNS4xTDIgMTIuN0MyLjMgMTcuMiA1LjcgMjAuOSAxMCAyMS44TDEyLjMgMTkuNFoiIGZpbGw9IiMzNzdERkYiPjwvcGF0aD4KPC9zdmc+Cg==",
      name: "Processing",
      description: "Optimize images & transcode videos in real-time.",
      price: "1.5",
      currency: "$",
      unit: "CPU hour",
    },
    {
      icon: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggb3BhY2l0eT0iMC4zIiBkPSJNNSAxNkMzLjMgMTYgMiAxNC43IDIgMTNDMiAxMS4zIDMuMyAxMCA1IDEwSDUuMUM1IDkuNyA1IDkuMyA1IDlDNSA2LjIgNy4yIDQgMTAgNEMxMS45IDQgMTMuNSA1IDE0LjMgNi41QzE0LjggNi4yIDE1LjQgNiAxNiA2QzE3LjcgNiAxOSA3LjMgMTkgOUMxOSA5LjQgMTguOSA5LjcgMTguOCAxMEMxOC45IDEwIDE4LjkgMTAgMTkgMTBDMjAuNyAxMCAyMiAxMS4zIDIyIDEzQzIyIDE0LjcgMjAuNyAxNiAxOSAxNkg1Wk04IDEzLjZIMTZMMTIuNyAxMC4zQzEyLjMgOS44OTk5OSAxMS43IDkuODk5OTkgMTEuMyAxMC4zTDggMTMuNloiIGZpbGw9IiMzNzdERkYiPjwvcGF0aD4KICA8cGF0aCBkPSJNMTEgMTMuNlYxOUMxMSAxOS42IDExLjQgMjAgMTIgMjBDMTIuNiAyMCAxMyAxOS42IDEzIDE5VjEzLjZIMTFaIiBmaWxsPSIjMzc3REZGIj48L3BhdGg+Cjwvc3ZnPgo=",
      name: "Uploads",
      description: "Receive file uploads from your users.",
      price: "0.0004 ",
      currency: "$",
      unit: "upload",
    },
  ];

  return (
    <>
      {EnterprisePricings.map((item, i) => (
        <div key={i} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image src={item.icon} alt="icon" width={46} height={46} />
          <a href="#">
            <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            {item.description}
          </p>

          <p className="mb-3 font-normal text-gray-500">
          As low as:

          </p>

          <a
            href="#"
            className="inline-flex font-medium items-center  hover:underline"
          >
            <span className="ml-1 text-2xl text-gray-900">{item.currency}</span>
            <span className="text-gray-900 text-2xl">{item.price}</span>
            <span className="ml-1 text-2xl font-bold text-gray-400">/{item.unit}</span>
           
          </a>
        </div>
      ))}
    </>
  );
}
