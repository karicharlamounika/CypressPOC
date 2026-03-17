import React from "react";
import "./ItemsTable.component.style.css";

export type ItemShape = { id: number; name: string; quantity: number };

type Props = {
  items: ItemShape[];
  onStartEdit: (item: ItemShape) => void;
  onDelete: (id: number) => void;
};

const ItemsTable: React.FC<Props> = ({ items, onStartEdit, onDelete }) => {
  return (
    <table className="items-table" data-testid="itemsTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th style={{ width: 120 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it) => (
          <tr key={it.id}>
            <td>{it.name}</td>
            <td>{it.quantity}</td>
            <td className="items-table__actions">
              <button data-testid="editItem" className="icon-btn" onClick={() => onStartEdit(it)}>✏️</button>
              <button data-testid="deleteItem" className="icon-btn" onClick={() => onDelete(it.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemsTable;