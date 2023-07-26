"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Waiver, columns } from "@/components/WaiverColumns";
import { WaiverTable } from "@/components/WaiverTable";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";

const Home = () => {
  const router = useRouter();
  const [waivers, setWaivers] = useState([]);
  const [sortByBooking, setSortByBooking] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleBookingClick = () => {
    window.open("/bookings", "_blank");
  };

  const handleEditWaiverClick = () => {
    router.push("/edit-waiver");
  };

  const handleSortSwitch = () => {
    setSortByBooking(!sortByBooking);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchSignedWaivers();
  }, [debouncedSearchTerm, dateRange]);

  const fetchSignedWaivers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/waiver/get?page=${page}&searchTerm=${searchTerm}${
          dateRange
            ? `&fromDate=${dateRange.from?.toISOString()}&toDate=${dateRange.to?.toISOString()}`
            : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      setWaivers(data.waivers);
      console.log("Waivers: ", data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch waivers: ", error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 space-x-2">
          <Button
            onClick={handleBookingClick}
            className="rounded px-4 py-2 text-white"
          >
            Go to Booking Page
          </Button>
          <Button
            onClick={handleEditWaiverClick}
            className="rounded px-4 py-2 text-white"
          >
            Edit Waiver
          </Button>
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <label htmlFor="sort-by-booking" className="mr-2">
            Sort by Booking
          </label>
          <Switch
            id="sort-by-booking"
            onCheckedChange={handleSortSwitch}
            checked={sortByBooking}
          />
        </div>
        <div className="mb-4 flex gap-4">
          <DatePickerWithRange onChange={(range) => setDateRange(range)} />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading...</p>
        ) : (
          <WaiverTable columns={columns} data={waivers} />
        )}
      </div>
    </main>
  );
};

export default Home;
