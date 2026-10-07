import React, { useState } from "react";

import { CiTrash } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";

const Todoapp = ({ user }) => {
  let [items, setItems] = useState([
    { id: 1, label: "html&scc", checked: true },
    { id: 3, label: "javascript", checked: true },
    { id: 2, label: "react", checked: false },
    { id: 4, label: "sql", checked: true },
  ]);
  let [newItem, setNewItem] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [currentEleId, setCurrentEleId] = useState(null);

  let handleChecked = (id) => {
    let newListItems = items.map((item) => {
      return item.id == id ? { ...item, checked: !item.checked } : item;
    });

    setItems(newListItems);
  };

  let handleAddorSaveItem = () => {
    if (isEditing) {
      let newListItems = items.map((item) => {
        return item.id === currentEleId ? { ...item, label: newItem } : item;
      });
      setItems(newListItems);
      setCurrentEleId(null);
      setNewItem("");
      setIsEditing(false);
    } else {
      setItems([
        ...items,
        { id: items.length + 1, label: newItem, checked: false },
      ]);
      setNewItem("");
    }
  };
  let handleUpdate = (id) => {
    let listItem = items.find((item) => item.id === id);
    setNewItem(listItem.label);
    setIsEditing(true);
    setCurrentEleId(id);
  };

  let handleDelete = (id) => {
    let newItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return {
          ...item,
          id: index + 1,
        };
      });
    setItems(newItems);
  };

  return (
    <main>
      <div>
        <input
          type="text"
          value={newItem}
          placeholder="add new item"
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button onClick={handleAddorSaveItem}>
          {isEditing ? "save" : "add"}
        </button>
      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input
                type="checkBox"
                checked={item.checked}
                onChange={() => {
                  handleChecked(item.id);
                }}
              />
              <label>{item.label}</label>
              <CiCreditCard1
                id="edit"
                role="button"
                tabIndex={0}
                onClick={() => handleUpdate(item.id)}
              />
              <CiTrash
                id="delete"
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Todoapp;
