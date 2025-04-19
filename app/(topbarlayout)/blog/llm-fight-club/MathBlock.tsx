import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export function MathBlock({ children }: { children: string }) {
  return <BlockMath math={children} />;
}

export function MathInline({ children }: { children: string }) {
  return <InlineMath math={children} />;
}
