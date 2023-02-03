import create from "zustand";
import { ToolName } from "../business/common";

export type ToolState = {
  tool: ToolName;
  setTool: (tool: ToolName) => void;
};

export const useToolState = create<ToolState>()((set) => ({
  tool: ToolName.None,
  setTool: (tool: ToolName) => set((state) => ({ ...state, tool })),
}));
