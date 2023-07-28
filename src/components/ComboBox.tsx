import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Source = {
  value: string;
  label: string;
};

const sources: Source[] = [
  {
    value: "walk-in",
    label: "Walk-in",
  },
  {
    value: "friend",
    label: "Friend",
  },
  {
    value: "google",
    label: "Google",
  },
  {
    value: "yelp",
    label: "Yelp",
  },
  {
    value: "tripadvisor",
    label: "TripAdvisor",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "advertisement",
    label: "Advertisement",
  },
  {
    value: "other",
    label: "Other",
  },
];

type ComboboxPopoverProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function ComboboxPopover({
  value,
  onValueChange,
}: ComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedSource, setSelectedSource] = React.useState<Source | null>(
    null,
  );

  return (
    <div className="flex flex-col py-2">
      <p className="mt-2 font-bold text-gray-700">
        Where did you hear about us?
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedSource ? <>{selectedSource.label}</> : <>+ Set source</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change source..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {sources.map((source) => (
                  <CommandItem
                    key={source.value}
                    onSelect={(value) => {
                      const selected = sources.find(
                        (source) => source.value === value,
                      );
                      setSelectedSource(selected || null);
                      onValueChange(value);
                      setOpen(false);
                    }}
                  >
                    <span>{source.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
