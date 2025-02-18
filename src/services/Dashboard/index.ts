"use server";

import { cookies } from "next/headers";

export const getDashboardStatResponse = async () => {
  try {
    const res = await fetch(
      "https://dummy-1.hiublue.com/api/dashboard/stat?filter=this-week",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value},`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!data) throw new Error("Failed to fetch data");

    return data;
  } catch (error: any) {
    console.error(error);
    return Error(error);
  }
};

export const getDashboardSummary = async () => {
  try {
    const res = await fetch(
      "https://dummy-1.hiublue.com/api/dashboard/summary?filter=prev-week",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value},`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!data) throw new Error("Failed to fetch data");

    return data;
  } catch (error: any) {
    console.error(error);
    return Error(error);
  }
};
