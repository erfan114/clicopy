export type ModalUniqueID =
    | "newEntry"
    | "viewEntry"
    | "deleteEntry";

const MODAL_INFO_TABLE: { [key in ModalUniqueID]: string } = {
    "newEntry": "New Entry",
    "viewEntry": "View Entry",
    "deleteEntry": "Delete Entry",
};

export default MODAL_INFO_TABLE;