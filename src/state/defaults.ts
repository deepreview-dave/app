import { EAttributeType } from './state'

export type TAttributeDefinition = {
  type: EAttributeType;
  description: string;
  colorClass: string;
};

export const AllAttributeDefinitions: TAttributeDefinition[] = [
  {
    type: EAttributeType.SKILL,
    description: 'Add a skill your colleague posseses',
    colorClass: 'is-success',
  },
  {
    type: EAttributeType.TRAIT,
    description: 'Add a trait, like communication, team player, confidence, etc you colleague has',
    colorClass: 'is-success',
  },
  {
    type: EAttributeType.PROJECT,
    description: 'Add a project your colleague has worked on',
    colorClass: 'is-info',
  },
  {
    type: EAttributeType.GROWTH,
    description: 'Add an area where you colleague has grown in the past',
    colorClass: 'is-success',
  },
  {
    type: EAttributeType.IMPROVE,
    description: 'Add an area where your colleague can improve in the future',
    colorClass: 'is-warning',
  },
  {
    type: EAttributeType.GOAL,
    description: 'Add a specific goal for your colleague to strive towards in the next review cycle',
    colorClass: 'is-info',
  },
];

export const getAttributeDescription = (type: EAttributeType): TAttributeDefinition => AllAttributeDefinitions.find(e => e.type === type)!; 