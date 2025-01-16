"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const countries = [
  {
    name: "Turkish Flag",
    flag: "🇹🇷",
    amount: 6972,
    trend: "up",
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    amount: 6972,
    trend: "up",
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    amount: 6972,
    trend: "down",
  },
  {
    name: "Vietnamese",
    flag: "🇻🇳",
    amount: 6972,
    trend: "up",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    amount: 6972,
    trend: "down",
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    amount: 6972,
    trend: "down",
  },
];

export function TopCountries() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">
          Top Countries By Sales
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">$37,802</span>
          <span className="flex items-center text-sm text-green-500">
            <ArrowUpIcon className="h-4 w-4" />
            1.56%
          </span>
          <span className="text-sm text-muted-foreground">
            since last weekend
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {countries.map((country) => (
          <div key={country.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{country.flag}</span>
              <span className="font-medium">{country.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{country.amount}</span>
              {country.trend === "up" ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
