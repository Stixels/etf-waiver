import React, { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { waiver } from "@/components/data/waiverContent";

const waiverContent = waiver.content;

const Waiver = () => {
  const formatContent = (content: string) => {
    return content
      .split(" ")
      .map((word, i) =>
        word === word.toUpperCase() ? <b key={i}>{word}</b> : word,
      )
      .reduce(
        (prev, curr, i) => (
          <>
            {prev}
            {i > 0 && " "}
            {curr}
          </>
        ),
        <></>,
      );
  };

  return (
    <ScrollArea className="mb-4 h-64 overflow-scroll rounded-md bg-gray-200 p-2">
      <h2 className="text-xl font-bold">Waiver Agreement</h2>
      {waiverContent.split("\n").map((paragraph, index) => (
        <p key={index} className="mb-4 text-sm">
          {formatContent(paragraph)}
        </p>
      ))}
    </ScrollArea>
  );
};

export default Waiver;
