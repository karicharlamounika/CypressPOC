import ItemsTable, { type ItemShape } from "./ItemsTable.component";
import { ITEMS_TABLE, ROW, EDIT_BTN, DELETE_BTN } from "./ItemsTable.selectors";

export const defaultItems: ItemShape[] = [
  { id: 1, name: "Apple", quantity: 2 },
  { id: 2, name: "Banana", quantity: 5 },
];

type MountOverrides = {
  items?: ItemShape[];
  onStartEdit?: (item: ItemShape) => void;
  onDelete?: (id: number) => void;
};

export function mountItemsTable(overrides: MountOverrides = {}) {
  const props = {
    items: overrides.items ?? defaultItems,
    onStartEdit: overrides.onStartEdit ?? (() => { }),
    onDelete: overrides.onDelete ?? (() => { }),
  };

  cy.mount(
    <ItemsTable
      items={props.items}
      onStartEdit={props.onStartEdit}
      onDelete={props.onDelete}
    />
  );

  const getTable = () => cy.get(ITEMS_TABLE);
  const getRows = () => cy.get(ROW);
  const getRowByIndex = (i: number) => getRows().eq(i);

  const getCell = (i: number, col: number) =>
    getRowByIndex(i).find("td").eq(col);

  const getEditButton = (i: number) => getRowByIndex(i).find(EDIT_BTN);
  const getDeleteButton = (i: number) => getRowByIndex(i).find(DELETE_BTN);

  const clickEdit = (i: number) => getEditButton(i).click();
  const clickDelete = (i: number) => getDeleteButton(i).click();

  const getItem = (i: number) =>
    getRowByIndex(i).then(($row) => {
      const cells = $row.find("td");
      return {
        name: cells.eq(0).text(),
        quantity: Number(cells.eq(1).text()),
      };
    });

  return {
    props,
    getTable,
    getRows,
    getRowByIndex,
    getCell,
    getEditButton,
    getDeleteButton,
    clickEdit,
    clickDelete,
    getItem,
  };
}