import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ComboboxPopover } from "@/components/ComboBox";
import { format12HourTime } from "@/lib/utils";
import Waiver from "./Waiver";

// Define a Zod schema
const formSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  dob: z.string().nonempty({ message: "Date of Birth is required" }),
  bookingNumber: z.string().nonempty({ message: "Group ID is required" }),
  productName: z.string().nonempty({ message: "Product name is required" }),
  startTime: z.string().nonempty({ message: "Start time is required" }),
  minors: z.array(z.object({ name: z.string().optional() })),
  source: z.string().nonempty({ message: "Source is required" }),
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: { minors: [{ name: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "minors",
  });

  const onSubmit = async (data: FormInputs) => {
    console.log("onSubmit is being called");

    const modifiedData = {
      ...data,
      minors: JSON.stringify(data.minors.map((minor) => minor.name)),
    };

    try {
      const response = await fetch("/api/waiver/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedData),
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

  const addMinor = () => {
    append({ name: "" });
  };

  return (
    <Card className="space-y-4 bg-white p-4 shadow">
      <CardTitle>Sign Waiver for {productName}</CardTitle>
      <h2 className="">At {format12HourTime(startTime)}</h2>
      <Waiver />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

        <Button
          type="button"
          onClick={addMinor}
          className="mt-4 rounded px-4 py-2 text-white"
        >
          Add Minor
        </Button>
        {fields.map((field, index) => (
          <div className="flex flex-col" key={field.id}>
            <label className="mt-2 font-bold text-gray-700">
              Minor {index + 1}
            </label>
            <div className="flex items-center">
              <Controller
                name={`minors.${index}.name` as const}
                control={control}
                defaultValue={field.name}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="flex-grow rounded border p-2"
                    value={field.value || ""}
                  />
                )}
              />
              <Button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 rounded px-4 py-2 text-white"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

        <Controller
          name="source"
          control={control}
          render={({ field }) => (
            <ComboboxPopover
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
        />

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
