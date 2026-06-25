import React from "react";
import {
  isProbablyHtml,
  normalizeRichTextHtmlForDisplay,
} from "../../utils/helper";

const richTextClassName =
  "max-w-none [&_strong]:font-bold [&_b]:font-bold [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-semibold [&_h4]:text-lg [&_h4]:font-semibold [&_h5]:font-semibold [&_h6]:font-semibold [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-teal-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-blue-600 [&_a]:underline [&_img]:max-w-full [&_img]:h-auto [&_table]:mx-auto [&_table]:w-auto [&_table]:max-w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_figure]:max-w-full [&_figure]:mx-0 [&_figure]:my-4 [&_iframe]:block [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:border-0 [&_iframe]:aspect-video [&_[data-oembed-url]]:w-full";

const RichTextContent = ({ content }) => {
  if (!content) {
    return null;
  }

  if (!isProbablyHtml(content)) {
    return (
      <div style={{ fontFamily: "PT Serif, serif" }}>
        <p className="text-justify whitespace-pre-line">{content}</p>
      </div>
    );
  }

  return (
    <div
      className={`rich-text-content ck-content ${richTextClassName}`}
      style={{ fontFamily: "PT Serif, serif" }}
      dangerouslySetInnerHTML={{
        __html: normalizeRichTextHtmlForDisplay(content),
      }}
    />
  );
};

export default RichTextContent;
