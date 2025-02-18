"use server";

import { cookies } from "next/headers";

export const getOfferList = async () => {
  try {
    const res = await fetch(
      "https://dummy-1.hiublue.com/api/offers?page=1&per_page=5",
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
