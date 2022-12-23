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
    title: "Add a Skill",
    description:
      "Add a specific skill with a tool or technique your colleague possesses.",
    placeholder: "Excell, sales, accounting, etc",
    colorClass: "is-success",
  },
  {
    type: WorkAttributeType.TRAIT,
    title: "Add a Trait",
    description:
      "Add a trait like communication, flexibility, negotiation, etc you colleague excells at.",
    placeholder: "Communication, flexibility, negotiation, confidence, etc",
    colorClass: "is-success",
  },
  {
    type: WorkAttributeType.PROJECT,
    title: "Add a Project",
    description: "Mention a project your colleague has worked on or has led.",
    placeholder: "Sorted accounts, Moved to a new office, etc",
    colorClass: "is-info",
  },
  {
    type: WorkAttributeType.GROWTH,
    title: "Add an area of recent Growth",
    description:
      "Add a skill or trait your colleague has improved on in this review cycle.",
    placeholder: "Communication, Excell, etc",
    colorClass: "is-success",
  },
  {
    type: WorkAttributeType.IMPROVE,
    title: "Add an area of future Improvement",
    description: "Add an area where your colleague can improve in the future.",
    placeholder: "Assertivness, leadership, etc",
    colorClass: "is-warning",
  },
  {
    type: WorkAttributeType.GOAL,
    title: "Add a future Goal",
    description:
      "Add a specific goal for your colleague to strive towards in the next review cycle",
    placeholder: "Become a team lead, double the amount of sales, etc",
    colorClass: "is-info",
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
