// WaiverColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// This type is used to define the shape of our data.
export type Waiver = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  timestamp: string;
  bookingNumber: string;
  Booking: {
    id: string;
    startTime: string;
    productName: string;
  };
};

export const columns: ColumnDef<Waiver>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => {
      let dob = new Date(row.original.dob);
      dob = new Date(dob.getTime() + dob.getTimezoneOffset() * 60 * 1000);
      return format(dob, "MMMM do, yyyy"); // E.g. March 27th, 1993
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date Signed",
    cell: ({ row }) => {
      let timestamp = new Date(row.original.timestamp);
      timestamp = new Date(
        timestamp.getTime() + timestamp.getTimezoneOffset() * 60 * 1000,
      );
      return format(timestamp, "MMMM do, yyyy, h:mm:ss a"); // E.g. March 27th, 1993, 10:15:30 PM
    },
  },
  {
    accessorKey: "Booking.productName",
    header: "Product Name",
  },
];
