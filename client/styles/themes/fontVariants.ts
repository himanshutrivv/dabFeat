export type FontVariant =
  | "arial"
  | "segoe"
  | "trebuchet"
  | "gillSans"
  | "georgia"
  | "palatino"
  | "courier"
  | "lucida";

export interface AppFont {
  name: string;
  description: string;
  stack: string;
}

export const fontVariants: Record<FontVariant, AppFont> = {
  arial: {
    name: "Arial",
    description: "Simple and widely supported",
    stack: "Arial, Helvetica, sans-serif",
  },
  segoe: {
    name: "Segoe UI",
    description: "Modern and professional",
    stack: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  trebuchet: {
    name: "Trebuchet MS",
    description: "Friendly and rounded",
    stack: '"Trebuchet MS", "Lucida Grande", Lucida, sans-serif',
  },
  gillSans: {
    name: "Gill Sans",
    description: "Clean and humanist",
    stack: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
  },
  georgia: {
    name: "Georgia",
    description: "Classic serif, highly readable",
    stack: '"Georgia", "Times New Roman", serif',
  },
  palatino: {
    name: "Palatino",
    description: "Elegant and timeless",
    stack: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
  },
  courier: {
    name: "Courier New",
    description: "Monospaced and technical",
    stack: '"Courier New", Courier, monospace',
  },
  lucida: {
    name: "Lucida Sans",
    description: "Neutral and balanced",
    stack: '"Lucida Sans", "Lucida Sans Unicode", sans-serif',
  },
};
