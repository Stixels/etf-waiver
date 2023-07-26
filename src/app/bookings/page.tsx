"use client";
// pages/bookings.tsx
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format12HourTime } from "@/lib/utils";

const BookingsPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setProgress(20);
        const response = await axios.get("/api/bookings");
        setProgress(50);
        setGroups(response.data.data);
        setProgress(100);
      } catch (error) {
        console.error("Failed to fetch groups: ", error);
      } finally {
        setTimeout(() => {
          setProgress(0);
          setIsLoading(false);
        }, 100);
      }
    };

    fetchGroups();
  }, []);

  const handleClick = (bookingNumber: string) => {
    router.push(`/sign/${bookingNumber}`);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl font-bold">Rooms Page</h1>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <Progress value={progress} />
        </div>
      ) : groups.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {groups.map((group: Group) => (
            <Card
              key={group.bookingNumber}
              className="cursor-pointer p-4 shadow"
              onClick={() => handleClick(group.bookingNumber)}
            >
              <h2 className="mb-2 text-2xl font-semibold">
                {group.productName}
              </h2>
              <p className="text-gray-500">
                {format12HourTime(group.startTime)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

interface Group {
  bookingNumber: string;
  startTime: string;
  productName: string;
}
