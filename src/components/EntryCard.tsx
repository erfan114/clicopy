import Card from "../containers/Card";

import { RiDocumentClipboardLine } from "solid-icons/ri";

import FooterTag from "./FooterTag";
import { Entry } from "../helpers/db";
import ManageEntryButton from "./ManageEntryButton";
import clsx from "clsx";
import { copyEntryText } from "../helpers/entity";
import { ellipsis } from "../helpers/string";

export default function EntryCard(props: Entry) {
  const { name, description, text } = props;

  return (
    <Card
      onClick={() => copyEntryText(props)}
      class={clsx(
        "gap-1 relative group flex flex-col shadow-none hover:shadow-none opacity-85 hover:opacity-100 transition cursor-pointer group select-none border-2 border-transparent",
        "hover:[&:not(:has(.manage-button:hover))]:border-indigo-500",
        "active:[&:not(:has(.manage-button:active))]:scale-95",
      )}
    >
      <div class="flex gap-1">
        <div class="font-bold flex-1">{name}</div>
        <ManageEntryButton {...props} />
      </div>
      <p class="line-clamp-1 text-xs">
        {ellipsis(description || "No description", 16)}
      </p>

      <FooterTag Icon={RiDocumentClipboardLine}>{ellipsis(text, 24)}</FooterTag>
    </Card>
  );
}
