"use client";
import WaiverForm from "@/components/WaiverForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format12HourTime } from "@/lib/utils";

type Booking = {
  bookingNumber: string;
  startTime: string;
  productName: string;
};

const SignWaiverPage = () => {
  const params = useParams();
  const [booking, setBooking] = useState<Booking>();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`/api/bookings/${params.bookingNumber}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const booking = await response.json();
        setBooking(booking);
        console.log("Groups: ", booking);
      } catch (error) {
        console.error("Failed to fetch groups: ", error);
      }
    };

    fetchGroups();
  }, [params.bookingNumber]);

  return (
    <div className="p-4">
      {booking ? (
        <div className="mb-4">
          <h1 className="mb-4 text-4xl">
            Sign Waiver for
            <span className="font-bold"> {booking?.productName}</span>
          </h1>
          <h2 className="mb-4 text-4xl">
            At{" "}
            <span className="font-bold">
              {format12HourTime(booking?.startTime)}
            </span>
          </h2>
          <WaiverForm
            bookingNumber={booking?.bookingNumber}
            startTime={booking?.startTime}
            productName={booking?.productName}
          />
        </div>
      ) : (
        <p className="flex min-h-screen items-center justify-center">
          Loading...
        </p>
      )}
    </div>
  );
};

export default SignWaiverPage;
