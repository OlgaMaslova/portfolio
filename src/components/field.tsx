import type { ElementType, ReactNode } from "react";

type Tone = "paper" | "ink" | "hot";

const toneClass: Record<Tone, string> = {
  paper: "field-paper",
  ink: "field-ink",
  hot: "field-hot",
};

/**
 * A full-bleed horizontal band. The band itself carries the colour; only its
 * inner wrapper is capped at --page-max, per the layout rules.
 *
 * Budget from the design spec: at most three ink fields per page.
 */
export function Field({
  tone = "paper",
  as: Tag = "section",
  className = "",
  innerClassName = "",
  children,
  ...rest
}: {
  tone?: Tone;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={`field ${toneClass[tone]} ${className}`} {...rest}>
      <div className={`frame ${innerClassName}`}>{children}</div>
    </Tag>
  );
}
