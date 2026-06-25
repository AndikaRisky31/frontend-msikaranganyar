import React, { useEffect, useMemo, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  TableToolbar,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import CKEditorUploadAdapterPlugin from "./CKEditorUploadAdapter";
import { normalizeRichTextHtmlForEditor } from "../../utils/helper";

const editorWrapperClassName =
  "rounded-md border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400";

const fallbackClassName =
  "border text-xs border-gray-300 rounded-md px-3 py-2 w-full min-h-[220px] focus:outline-none focus:ring focus:border-blue-400 text-justify";

const RichTextEditor = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "Tulis konten berita di sini...",
}) => {
  const editorDataRef = useRef(normalizeRichTextHtmlForEditor(value || ""));
  const editorInstanceRef = useRef(null);
  const lastRawEditorValueRef = useRef("");

  useEffect(() => {
    const normalizedValue = normalizeRichTextHtmlForEditor(value || "");

    if (value === lastRawEditorValueRef.current) {
      return;
    }

    if (normalizedValue !== editorDataRef.current) {
      editorDataRef.current = normalizedValue;

      if (editorInstanceRef.current) {
        editorInstanceRef.current.setData(normalizedValue);
      }
    }
  }, [value]);

  const editorConfig = useMemo(
    () => ({
      licenseKey: "GPL",
      placeholder,

      plugins: [
        Essentials,
        Paragraph,
        Heading,
        Bold,
        Italic,
        Link,
        List,
        Alignment,
        Autoformat,
        BlockQuote,
        Table,
        TableToolbar,
        MediaEmbed,
        Image,
        ImageCaption,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        GeneralHtmlSupport,
        CKEditorUploadAdapterPlugin,
      ],

      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "|",
          "alignment:left",
          "alignment:center",
          "alignment:right",
          "alignment:justify",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "imageUpload",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "|",
          "undo",
          "redo",
        ],
        shouldNotGroupWhenFull: true,
      },

      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
        ],
      },

      alignment: {
        options: [
          { name: "left", className: "ck-align-left" },
          { name: "center", className: "ck-align-center" },
          { name: "right", className: "ck-align-right" },
          { name: "justify", className: "ck-align-justify" },
        ],
      },

      image: {
        toolbar: [
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:block",
          "imageStyle:side",
          "|",
          "resizeImage",
        ],
      },

      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
      },

      mediaEmbed: {
        previewsInData: false,
      },

      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },

      htmlSupport: {
        allow: [
          {
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true,
          },
        ],
        htmlIframeSandbox: false,
      },
    }),
    [placeholder],
  );

  if (!onChange) {
    return (
      <textarea
        id={id}
        name={name}
        value={value || ""}
        readOnly
        rows={10}
        placeholder={placeholder}
        className={fallbackClassName}
      />
    );
  }

  return (
    <div className={`rich-text-editor ${editorWrapperClassName}`}>
      <CKEditor
        editor={ClassicEditor}
        data={editorDataRef.current}
        config={editorConfig}
        onReady={(editor) => {
          editorInstanceRef.current = editor;

          const currentData = editor.getData();

          if (currentData !== editorDataRef.current) {
            editor.setData(editorDataRef.current);
          }
        }}
        onChange={(_, editor) => {
          const data = editor.getData();

          lastRawEditorValueRef.current = data;
          editorDataRef.current = data;

          onChange({
            target: {
              name,
              value: data,
            },
          });
        }}
        onBlur={() => {
          if (onBlur) {
            onBlur({
              target: {
                name,
              },
            });
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
