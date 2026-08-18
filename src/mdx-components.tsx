import type { MDXComponents } from "mdx/types";

/**
 * Global MDX element mapping. Typography lives in `.prose` (globals.css);
 * this file only handles structural concerns that CSS cannot express.
 */
const components: MDXComponents = {
  // Wide measurement tables scroll inside their own box rather than
  // forcing the page to scroll horizontally.
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  a: ({ href = "", ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
