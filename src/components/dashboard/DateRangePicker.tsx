"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Calendar cells for a month, Monday-first, padded with adjacent-month days. */
function monthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Mon=0
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(year, month, 1 - lead + i));
  }
  return cells;
}

interface MonthGridProps {
  year: number;
  month: number;
  start: Date | null;
  end: Date | null;
  onPick: (d: Date) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

function MonthGrid({ year, month, start, end, onPick, onPrev, onNext }: MonthGridProps) {
  const sameDay = (a: Date | null, b: Date) =>
    !!a && a.toDateString() === b.toDateString();
  const inRange = (d: Date) => !!start && !!end && d > start && d < end;

  return (
    <div className="w-60">
      <div className="flex items-center justify-between px-1 pb-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous month"
          className={cn("p-1 text-gray-400 hover:text-gray-600", !onPrev && "invisible")}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium text-gray-900">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next month"
          className={cn("p-1 text-gray-400 hover:text-gray-600", !onNext && "invisible")}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <span key={d} className="py-1 text-xs font-medium text-gray-500">
            {d}
          </span>
        ))}
        {monthCells(year, month).map((d) => {
          const outside = d.getMonth() !== month;
          const isEdge = sameDay(start, d) || sameDay(end, d);
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => onPick(d)}
              className={cn(
                "mx-auto my-0.5 flex h-8 w-8 items-center justify-center rounded-full text-xs",
                outside && "text-gray-300",
                !outside && !isEdge && "text-gray-700 hover:bg-gray-100",
                inRange(d) && !isEdge && "bg-blue-50",
                isEdge && "bg-primary text-white"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DateRangePickerProps {
  onApply: (start: Date, end: Date) => void;
  label: string;
}

export function DateRangePicker({ onApply, label }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ year: 2025, month: 0 });
  const [start, setStart] = useState<Date | null>(new Date(2025, 0, 6));
  const [end, setEnd] = useState<Date | null>(new Date(2025, 0, 13));

  const next = view.month === 11
    ? { year: view.year + 1, month: 0 }
    : { year: view.year, month: view.month + 1 };

  function pick(d: Date) {
    if (!start || (start && end)) {
      setStart(d);
      setEnd(null);
    } else if (d < start) {
      setEnd(start);
      setStart(d);
    } else {
      setEnd(d);
    }
  }

  function shift(delta: number) {
    setView(({ year, month }) => {
      const m = month + delta;
      return { year: year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
      >
        <Calendar size={14} className="text-gray-500" />
        {label}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
          <div className="flex gap-6">
            <MonthGrid
              year={view.year}
              month={view.month}
              start={start}
              end={end}
              onPick={pick}
              onPrev={() => shift(-1)}
            />
            <MonthGrid
              year={next.year}
              month={next.month}
              start={start}
              end={end}
              onPick={pick}
              onNext={() => shift(1)}
            />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="rounded-md border border-gray-200 px-3 py-1.5">
                {start ? fmt(start) : "—"}
              </span>
              <span className="text-gray-400">–</span>
              <span className="rounded-md border border-gray-200 px-3 py-1.5">
                {end ? fmt(end) : "—"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!start || !end}
                onClick={() => {
                  if (start && end) {
                    onApply(start, end);
                    setOpen(false);
                  }
                }}
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
