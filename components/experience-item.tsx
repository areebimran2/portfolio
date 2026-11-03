"use client";

import { Expand as ExpandIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Experience } from "@/types/portfolio";

type ExperienceItemProps = {
  experience: Experience;
};

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group w-full rounded-2xl border border-border bg-card/65 p-5 text-left outline-none transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card hover:shadow-[0_16px_42px_rgb(0_0_0/0.24)] focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
          aria-label={`View details for ${experience.role} at ${experience.organization}`}
        >
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
                {experience.role}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {experience.organization}
              </p>
            </div>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-[border-color,background-color,color] group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ExpandIcon className="size-4" />
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>{experience.location}</span>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <span>{experience.period}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <Badge key={skill} className="bg-background/70">
                {skill}
              </Badge>
            ))}
          </div>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{experience.role}</DialogTitle>
          <p className="font-medium text-primary">{experience.organization}</p>
          <DialogDescription>
            {experience.location} · {experience.period}
          </DialogDescription>
        </DialogHeader>

        <ul className="grid gap-4" aria-label="Responsibilities and outcomes">
          {experience.details.map((detail) => (
            <li
              key={detail}
              className="grid grid-cols-[0.5rem_1fr] gap-3 text-sm leading-6 text-muted-foreground sm:text-[0.9375rem] sm:leading-7"
            >
              <span
                aria-hidden="true"
                className="mt-[0.65rem] size-1.5 rounded-full bg-primary shadow-[0_0_10px_rgb(113_151_208/0.45)]"
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 border-t border-border pt-5">
          {experience.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
