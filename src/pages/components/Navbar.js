import React from "react";
import Link from "next/link";
import Image from "next/image";
import masters from '../../../public/masters.png'

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href='/' className="btn btn-ghost text-xl">Peen Masters</Link>
      </div>
      <div className="flex-none">
        

        <div className="drawer z-10 drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn"
            >
              <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-menu"
            width={32}
            height={32}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1={4} y1={8} x2={20} y2={8} />
            <line x1={4} y1={16} x2={20} y2={16} />
          </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              
            <Image src={masters} width={100} height={100} className="mb-8" />

              <li>
                <Link href="/">
                  Peen Fantasy Home
                </Link>
              </li>
              <li>
                <Link href="/leaderboard">
                  Masters Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
