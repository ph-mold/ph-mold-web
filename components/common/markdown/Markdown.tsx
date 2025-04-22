import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownImage from "./MarkdownImage";

interface Props {
  data: string;
}
export default function Markdown({ data }: Props) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <div>{children}</div>,
          h1: ({ children }) => (
            <h1 className="mt-6 mb-3 w-full text-3xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-4 mb-3 w-full text-2xl font-semibold">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h2 className="mt-2 mb-1 w-full text-lg font-semibold">
              {children}
            </h2>
          ),
          strong: ({ children }) => (
            <strong className="text-signature font-semibold">{children}</strong>
          ),
          img: ({ src, alt, title }) => (
            <MarkdownImage
              src={typeof src === "string" ? src : ""}
              alt={alt}
              title={title}
            />
          ),
          hr: () => <hr className="border-background2 my-3 border-1" />,
          ul: ({ children }) => (
            <ul className="m-2 flex flex-col gap-2">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="[&>*:first-child]:border-background2 [&>*:first-child]:border-b [&>*:first-child]:pb-1 [&>*:not(:first-child)]:p-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="bg-background2 border-signature rounded-r-md border-l-4 p-2 pl-4">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="border-signature w-full overflow-x-auto rounded-lg border-1 sm:w-fit">
              <table className="text-foreground w-full border-collapse text-sm sm:w-fit">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-background2 border-signature border-b text-left font-semibold">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-signature border-b last:border-none">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border-signature border-r px-4 py-2 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-signature border-r px-4 py-2 last:border-r-0">
              {children}
            </td>
          )
        }}
      >
        {data}
      </ReactMarkdown>
    </div>
  );
}
