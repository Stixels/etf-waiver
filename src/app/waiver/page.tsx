"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a Zod schema
const formSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  dob: z.string().nonempty({ message: "Date of Birth is required" }),
  groupId: z.string().nonempty({ message: "Group ID is required" }),
});

// Create a type for form inputs using the Zod schema
type FormInputs = z.infer<typeof formSchema>;

const WaiverForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormInputs) => {
    // Handle form submission here
    

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <label className="font-bold text-gray-700">First Name</label>
        <Input {...register("firstName")} />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-gray-700">Last Name</label>
        <Input {...register("lastName")} />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-gray-700">Email</label>
        <Input {...register("email")} />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="font-bold text-gray-700">Date of Birth</label>
        <Input type="date" {...register("dob")} />
        {errors.dob && (
          <span className="text-red-500">{errors.dob.message}</span>
        )}
      </div>

      <input type="hidden" {...register("groupId")} value="your-group-id" />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default WaiverForm;
