import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discover",
    description:
      "We assess your current operations, systems, and stakeholders to define the real problem, not just the symptom, using structured program-management diagnostics.",
    methodologyTag: "PMI",
  },
  {
    step: 2,
    title: "Design",
    description:
      "We design the target architecture and change plan together, selecting the Enterprise Digital Services that compose your solution and mapping the adoption path for your people.",
    methodologyTag: "PROSCI",
  },
  {
    step: 3,
    title: "Deliver",
    description:
      "We build and ship in iterative, demonstrable increments, keeping stakeholders aligned and reducing delivery risk through continuous feedback.",
    methodologyTag: "Agile / SAFe",
  },
  {
    step: 4,
    title: "Sustain",
    description:
      "We hand off with documentation, training, and monitoring in place, so the platform keeps delivering value - and can scale - long after go-live.",
    methodologyTag: "Lean",
  },
];
