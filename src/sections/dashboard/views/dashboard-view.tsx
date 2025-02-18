"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Badge,
  IconButton,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import {
  getDashboardStatResponse,
  getDashboardSummary,
} from "@/services/Dashboard";
import { DayOfWeek, IDashboardStatResponse } from "@/types";
import { Delete, Edit } from "@mui/icons-material";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardView() {
  const [data, setData] = useState<IDashboardStatResponse | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both APIs in parallel
        const [statsData, summaryData] = await Promise.all([
          getDashboardStatResponse(),
          getDashboardSummary(),
        ]);

        setData(statsData);
        setSummary(summaryData);

        console.log(summaryData);
      } catch (err: any) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const offers = Object.keys(data.offers_sent).map((day) => ({
    day,
    count: data.offers_sent[day as DayOfWeek],
  }));

  const visits = Object.keys(data.website_visits).map((day) => ({
    day,
    desktop: data.website_visits[day as DayOfWeek].desktop,
    mobile: data.website_visits[day as DayOfWeek].mobile,
  }));

  // Inside DashboardView function
  const calculatePercentageChange = (current: number, previous: number) => {
    const difference = current - previous;
    const percentageChange = previous
      ? ((difference / previous) * 100).toFixed(2)
      : 0;
    const isIncrease = difference > 0;
    const arrow = isIncrease ? (
      <KeyboardDoubleArrowUpRoundedIcon />
    ) : (
      <KeyboardDoubleArrowDownRoundedIcon />
    );
    return { percentageChange, arrow, isIncrease };
  };

  // Helper function to map stats data
  const getStatsData = (summary: any) => {
    const stats = [
      { label: "Total Active Users", key: "active_users" },
      { label: "Total Clicks", key: "clicks" },
      { label: "Total Appearances", key: "appearance" },
    ];

    return stats.map((stat, index) => {
      const current = summary?.current[stat.key];
      const previous = summary?.previous[stat.key];

      const { percentageChange, arrow, isIncrease } = calculatePercentageChange(
        current ?? 0,
        previous ?? 0
      );

      return {
        key: index,
        label: stat.label,
        current,
        percentageChange,
        arrow,
        isIncrease,
      };
    });
  };

  const filteredOffers = offers
    .filter((offer) => filter === "all" || offer.count === Number(filter))
    .filter((offer) => offer.day.toLowerCase().includes(search.toLowerCase()));

  const paginatedOffers = filteredOffers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {getStatsData(summary).map((stat, index) => {
          return (
            <Card key={index} className="p-4 shadow-lg">
              <CardContent>
                <Typography className="text-gray-800 font-semibold text-sm">
                  {stat.label}
                </Typography>
                <Typography
                  variant="h5"
                  className="text-gray-800 font-bold text-3xl"
                >
                  {stat.current
                    ? `${(stat.current / 1000).toFixed(1)}k`
                    : "N/A"}
                </Typography>
                <div className="flex gap-1">
                  <Typography
                    className={
                      stat.isIncrease
                        ? "text-green-500 text-sm"
                        : "text-red-500 text-sm"
                    }
                  >
                    {stat.arrow} {Math.abs(Number(stat.percentageChange))}%
                  </Typography>
                  <Typography className="text-gray-500 text-sm">
                    previous month
                  </Typography>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 shadow-lg relative">
          <Typography className="text-gray-500">Website Visits</Typography>

          {/* Top-right labels with circles */}
          <div className="flex flex-row-reverse gap-6 mb-8">
            {/* Mobile label with circle */}
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#FFAB00" }}
              ></div>
              <Typography className="text-sm">Mobile</Typography>
            </div>
            {/* Desktop label with circle */}
            <div className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#007867" }}
              ></div>
              <Typography className="text-sm">Desktop</Typography>
            </div>
          </div>

          {/* ApexChart for the website visits */}
          <ApexChart
            options={{
              chart: { type: "bar" },
              xaxis: { categories: visits.map((v) => v.day) },
              colors: ["#007867", "#FFAB00"], // Set the custom colors here
              plotOptions: {
                bar: {
                  borderRadius: 6,
                  horizontal: false,
                },
              },
            }}
            series={[
              { name: "Desktop", data: visits.map((v) => v.desktop) },
              { name: "Mobile", data: visits.map((v) => v.mobile) },
            ]}
            type="bar"
            height={300}
          />
        </Card>

        <Card className="p-4 shadow-lg">
          <Typography className="text-gray-500">Offers Sent</Typography>
          <ApexChart
            options={{
              chart: { type: "line" },
              xaxis: { categories: offers.map((o) => o.day) },
              colors: ["#000000"],
            }}
            series={[{ name: "Offers Sent", data: offers.map((o) => o.count) }]}
            type="line"
            height={300}
          />
        </Card>
      </div>

      {/* Table Filters */}
      <div className="flex justify-between items-center mb-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="50">50</MenuItem>
          <MenuItem value="100">100</MenuItem>
        </Select>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOffers.map((offer, index) => (
              <TableRow key={index}>
                <TableCell>Jayrim Simon</TableCell>
                <TableCell>385-374-4961</TableCell>
                <TableCell>Lueilwitz & Sons</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Monthly</TableCell>
                <TableCell>
                  <Badge color={offer.count > 50 ? "success" : "error"}>
                    {offer.count > 50 ? "Accepted" : "Rejected"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                  <IconButton size="small">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(filteredOffers.length / rowsPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
        className="mt-4"
      />
    </div>
  );
}
