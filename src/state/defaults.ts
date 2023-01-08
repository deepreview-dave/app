import { WorkAttributeType } from "../business/common";

export type AttributeDefinition = {
  type: WorkAttributeType;
  title: string;
  description: string;
  placeholder: string;
  colorClass: string;
};

export const AllAttributeDefinitions: AttributeDefinition[] = [
  {
    type: WorkAttributeType.SKILL,
    title: "Skill",
    description:
      "Mention a specific skill with a tool or technique that your colleague possesses.",
    placeholder: "Excel, sales, accounting, etc",
    colorClass: "has-background-success",
  },
  {
    type: WorkAttributeType.STRENGTH,
    title: "Strength",
    description:
      "Mention a strength like communication, flexibility, negotiation, etc.",
    placeholder: "Communication, flexibility, negotiation, confidence, etc",
    colorClass: "has-background-success",
  },
  {
    type: WorkAttributeType.PROJECT,
    title: "Project",
    description: "Mention a project your colleague has worked on or has led.",
    placeholder: "Sorted accounts, Moved to a new office, etc",
    colorClass: "has-background-info",
  },
  {
    type: WorkAttributeType.GROWTH,
    title: "Area of recent Growth",
    description:
      "Mention a skill or trait your colleague has improved on in this review cycle.",
    placeholder: "Communication, Excel, etc",
    colorClass: "has-background-success",
  },
  {
    type: WorkAttributeType.IMPROVE,
    title: "Area of future Improvement",
    description:
      "Mention an area where your colleague can improve in the future.",
    placeholder: "Assertivness, leadership, etc",
    colorClass: "has-background-warning",
  },
  {
    type: WorkAttributeType.GOAL,
    title: "Future Goal",
    description:
      "Mention a specific goal for your colleague to strive towards in the next review cycle.",
    placeholder: "Become a team lead, double the amount of sales, etc",
    colorClass: "has-background-info",
  },
];

export const getAttributeDescription = (
  type: WorkAttributeType
): AttributeDefinition => {
  const result = AllAttributeDefinitions.find((e) => e.type === type);

  if (result === undefined) {
    throw new Error(
      `Something bad has happened trying to find attribute ${type}`
    );
  }

  return result;
};
