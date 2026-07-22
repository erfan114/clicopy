export type ModalInfo = {
  id: number;
  title: string;
};

export const MODAL_INFO = {
  NEW_ENTRY: { title: "New entry", id: 0x01 } as ModalInfo,
  VIEW_ENTRY: { title: "View entry", id: 0x02 } as ModalInfo,
  DELETE_ENTRY: { title: "Delete entry", id: 0x03 } as ModalInfo,
  MANAGE_ENTRY: { title: "Manage entry", id: 0x04 } as ModalInfo,
} as const;
