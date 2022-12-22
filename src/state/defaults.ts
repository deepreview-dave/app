import { WorkAttributeType } from "../business/common";

export type AttributeDefinition = {
  type: WorkAttributeType;
  description: string;
  colorClass: string;
};

export const AllAttributeDefinitions: AttributeDefinition[] = [
  {
    type: WorkAttributeType.SKILL,
    description: "Add a skill your colleague posseses",
    colorClass: "is-success",
  },
  {
    type: WorkAttributeType.TRAIT,
    description:
      "Add a trait, like communication, team player, confidence, etc you colleague has",
    colorClass: "is-success",
  },
  {
    type: WorkAttributeType.PROJECT,
    description: "Add a project your colleague has worked on",
    colorClass: "is-info",
  },
  {
    type: WorkAttributeType.GROWTH,
    description: "Add an area where you colleague has grown in the past",
    colorClass: "is-success",
  },
  {
    type: WorkAttributeType.IMPROVE,
    description: "Add an area where your colleague can improve in the future",
    colorClass: "is-warning",
  },
  {
    type: WorkAttributeType.GOAL,
    description:
      "Add a specific goal for your colleague to strive towards in the next review cycle",
    colorClass: "is-info",
  },
];

export const getAttributeDescription = (
  type: WorkAttributeType
): AttributeDefinition => AllAttributeDefinitions.find((e) => e.type === type)!;
