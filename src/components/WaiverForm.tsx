import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Define a Zod schema
const formSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  dob: z.string().nonempty({ message: "Date of Birth is required" }),
  bookingNumber: z.string().nonempty({ message: "Group ID is required" }),
  productName: z.string().nonempty({ message: "Product name is required" }),
  startTime: z.string().nonempty({ message: "Start time is required" }),
});

// Create a type for form inputs using the Zod schema
type FormInputs = z.infer<typeof formSchema>;

interface WaiverFormProps {
  bookingNumber: string;
  startTime: string;
  productName: string;
}

const WaiverForm: React.FC<WaiverFormProps> = ({
  bookingNumber,
  startTime,
  productName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await fetch("/api/waiver/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Waiver created: ", result);
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error("Failed to create waiver: ", error);
    }
  };

  return (
    <Card className="space-y-4 bg-white p-4 shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="mt-2 font-bold text-gray-700">First Name</label>
          <Input {...register("firstName")} className="rounded border p-2" />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mt-2 font-bold text-gray-700">Last Name</label>
          <Input {...register("lastName")} className="rounded border p-2" />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mt-2 font-bold text-gray-700">Email</label>
          <Input {...register("email")} className="rounded border p-2" />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mt-2 font-bold text-gray-700">Date of Birth</label>
          <Input
            type="date"
            {...register("dob")}
            className="rounded border p-2"
          />
          {errors.dob && (
            <span className="text-red-500">{errors.dob.message}</span>
          )}
        </div>

        <input
          type="hidden"
          {...register("bookingNumber")}
          value={bookingNumber}
        />
        <input type="hidden" {...register("productName")} value={productName} />
        <input type="hidden" {...register("startTime")} value={startTime} />

        <Button type="submit" className="mt-4 rounded px-4 py-2 text-white">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default WaiverForm;
