import React, { useState } from 'react';
import '../../assets/css/AddFoodModal.css';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose, onAddFood }) => {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood({
      name: formData.name,
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fats: Number(formData.fats)
    });
    setFormData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Add New Food</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Food Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Calories (kcal):</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Protein (g):</label>
            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleInputChange}
              required
              min="0"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Carbs (g):</label>
            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleInputChange}
              required
              min="0"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Fats (g):</label>
            <input
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleInputChange}
              required
              min="0"
              step="0.1"
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Food</button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;