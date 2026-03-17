import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ItemsPage.page.module.css";
import ItemForm from "../../components/ItemForm/ItemForm.component";
import ItemsTable from "../../components/ItemsTable/ItemsTable.component";
import Button from "../../components/Button/Button.component";
import TextInput from "../../components/TextInput/TextInput.component";

interface Item {
  id: number;
  name: string;
  quantity: number;
}

const apiBaseUrl = "http://localhost:5000";

const ItemsPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState<number>(1);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState<number>(1);

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/items`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (res.status === 401) throw new Error("unauthenticated");
      const data = await res.json();
      setItems(data);
    } catch {
      alert("Failed to fetch items. Please login again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddItem = async () => {
    if (!newName.trim()) return alert("Item name required");
    try {
      const res = await fetch(`${apiBaseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ name: newName, quantity: newQuantity }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      const createdItem: Item = { ...created, id: Number(created.id) };
      setItems((s) => [...s, createdItem]);
      setNewName("");
      setNewQuantity(1);
      setShowAddForm(false);
    } catch {
      alert("Failed to add item");
    }
  };
  
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${apiBaseUrl}/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) throw new Error();
      setItems((s) => s.filter((it) => it.id !== id));
    } catch {
      alert("Failed to delete item");
    }
  };

  const startEditing = (item: Item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setEditQuantity(1);
  };

  const saveEditing = async () => {
    if (editingId === null) return;
    if (!editName.trim()) return alert("Item name required");
    try {
      const res = await fetch(`${apiBaseUrl}/items/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ name: editName, quantity: editQuantity }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      const updatedItem: Item = { ...updated, id: Number(updated.id) };
      setItems((s) => s.map((it) => (it.id === updatedItem.id ? updatedItem : it)));
      cancelEditing();
    } catch {
      alert("Failed to update item");
    }
  };

return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Items</h2>
        <div className={styles.headerActions}>
          <Button data-testid="addNewItem" onClick={() => setShowAddForm((v) => !v)}>{showAddForm ? "Cancel" : "Add New Item"}</Button>
          <Button data-testid="logoutBtn" variant="muted" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {showAddForm && (
        <div className={styles.addForm}>
          <ItemForm
            name={newName}
            quantity={newQuantity}
            onChange={({ name, quantity }) => {
              if (name !== undefined) setNewName(name);
              if (quantity !== undefined) setNewQuantity(quantity);
            }}
            onSubmit={handleAddItem}
            submitLabel="Add"
          />
        </div>
      )}

      {loading ? (
        <p className={styles.muted}>Loading items...</p>
      ) : items.length === 0 ? (
        <p className={styles.muted}>No items found.</p>
      ) : (
        <ItemsTable items={items} onStartEdit={startEditing} onDelete={handleDeleteItem} />
      )}

      {editingId !== null && (
        <div className={styles.editPanel}>
          <h4>Edit Item</h4>
          <TextInput data-testid="editName" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <TextInput data-testid="editQuantity" type="number" min={1} value={editQuantity} onChange={(e) => setEditQuantity(Number(e.target.value))} />
          <div className={styles.editActions}>
            <Button data-testid="editSave" onClick={saveEditing}>Save</Button>
            <Button data-testid="editCancel" variant="muted" onClick={cancelEditing}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPage;