import { Button, Form, Modal } from "antd";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ToolbarPlugin from "plugin/Toolbar";
import ListMaxIndentLevelPlugin from "plugin/ListMaxIndentLvevel";
import CodeHighlightPlugin from "plugin/CodeHightlight";
import { LexicalEditor } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { formFundRegister } from "utils/fom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { errorResponse } from "components/NotificationCustom";
import { successNotification } from "components/NotificationCustom";

const EditorDialog = ({ visible, onClose, defaultValue }) => {
  const [form] = Form.useForm();
  let valueInput = defaultValue;

  const onDownLoad = () => {
    const body = document.body;
    const pdfView = document.getElementsByClassName("editor-inner")[0];

    body.style.visibility = "hidden";
    pdfView.style.visibility = "visible";
    window.print();
    body.style.visibility = "visible";
    pdfView.style.visibility = "visible";
  };

  const editorConfig = {
    // The editor theme
    editorState: defaultValue ?? formFundRegister,
    theme: {
      ltr: "ltr",
      rtl: "rtl",
      placeholder: "editor-placeholder",
      paragraph: "editor-paragraph",
      quote: "editor-quote",
      heading: {
        h1: "editor-heading-h1",
        h2: "editor-heading-h2",
        h3: "editor-heading-h3",
        h4: "editor-heading-h4",
        h5: "editor-heading-h5",
      },
      list: {
        nested: {
          listitem: "editor-nested-listitem",
        },
        ol: "editor-list-ol",
        ul: "editor-list-ul",
        listitem: "editor-listitem",
      },
      image: "editor-image",
      link: "editor-link",
      text: {
        bold: "editor-text-bold",
        italic: "editor-text-italic",
        overflowed: "editor-text-overflowed",
        hashtag: "editor-text-hashtag",
        underline: "editor-text-underline",
        strikethrough: "editor-text-strikethrough",
        underlineStrikethrough: "editor-text-underlineStrikethrough",
        code: "editor-text-code",
      },
      code: "editor-code",
      codeHighlight: {
        atrule: "editor-tokenAttr",
        attr: "editor-tokenAttr",
        boolean: "editor-tokenProperty",
        builtin: "editor-tokenSelector",
        cdata: "editor-tokenComment",
        char: "editor-tokenSelector",
        class: "editor-tokenFunction",
        "class-name": "editor-tokenFunction",
        comment: "editor-tokenComment",
        constant: "editor-tokenProperty",
        deleted: "editor-tokenProperty",
        doctype: "editor-tokenComment",
        entity: "editor-tokenOperator",
        function: "editor-tokenFunction",
        important: "editor-tokenVariable",
        inserted: "editor-tokenSelector",
        keyword: "editor-tokenAttr",
        namespace: "editor-tokenVariable",
        number: "editor-tokenProperty",
        operator: "editor-tokenOperator",
        prolog: "editor-tokenComment",
        property: "editor-tokenProperty",
        punctuation: "editor-tokenPunctuation",
        regex: "editor-tokenVariable",
        selector: "editor-tokenSelector",
        string: "editor-tokenSelector",
        symbol: "editor-tokenProperty",
        tag: "editor-tokenProperty",
        url: "editor-tokenOperator",
        variable: "editor-tokenVariable",
      },
    },
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };
  return (
    <Modal
      bodyStyle={{ width: "fit-content" }}
      width="fit-content"
      open={visible}
      footer={[
        <Button key="back" onClick={onClose}>
          Đóng
        </Button>,
        <Button key="submit" type="primary" onClick={onDownLoad}>
          Tải về
        </Button>,
      ]}
    >
      <Form form={form} size="large" style={{ width: "fit-content" }}>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="editor-container">
            <ToolbarPlugin />
            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input" height="60vh" />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <CodeHighlightPlugin />
              <ListPlugin />
              <LinkPlugin />
              <OnChangePlugin
                onChange={(editor) => {
                  valueInput = JSON.stringify(editor.toJSON());
                }}
              />
              <ListMaxIndentLevelPlugin maxDepth={7} />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            </div>
          </div>
        </LexicalComposer>
      </Form>
    </Modal>
  );
};

export default EditorDialog;
