import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose_weight' | 'maintain' | 'gain_weight';
  dailyCalorieTarget: number;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        gender: 'male',
        height: 180,
        weight: 75,
        activityLevel: 'moderate',
        goal: 'maintain',
        dailyCalorieTarget: 2500
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? Number(value) 
        : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/profile', formData);
      setProfile(response.data);
      setIsEditing(false);
      setFormData({});
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const calculateCalories = () => {
    if (!profile) return 0;
    
    // Basic Harris-Benedict equation for BMR
    let bmr;
    if (profile.gender === 'male') {
      bmr = 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age);
    } else {
      bmr = 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age);
    }
    
    // Activity multiplier
    let activityMultiplier;
    switch (profile.activityLevel) {
      case 'sedentary': activityMultiplier = 1.2; break;
      case 'light': activityMultiplier = 1.375; break;
      case 'moderate': activityMultiplier = 1.55; break;
      case 'active': activityMultiplier = 1.725; break;
      case 'very_active': activityMultiplier = 1.9; break;
      default: activityMultiplier = 1.2;
    }
    
    // Goal adjustment
    let goalAdjustment;
    switch (profile.goal) {
      case 'lose_weight': goalAdjustment = -500; break;
      case 'gain_weight': goalAdjustment = 500; break;
      default: goalAdjustment = 0;
    }
    
    return Math.round(bmr * activityMultiplier + goalAdjustment);
  };

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      
      {profile ? (
        <div className="profile-card">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || profile.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age !== undefined ? formData.age : profile.age}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Gender:</label>
                <select
                  name="gender"
                  value={formData.gender || profile.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Height (cm):</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height !== undefined ? formData.height : profile.height}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight !== undefined ? formData.weight : profile.weight}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Activity Level:</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel || profile.activityLevel}
                  onChange={handleInputChange}
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Lightly active (light exercise 1-3 days/week)</option>
                  <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
                  <option value="active">Active (hard exercise 6-7 days/week)</option>
                  <option value="very_active">Very active (very hard exercise & physical job)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Goal:</label>
                <select
                  name="goal"
                  value={formData.goal || profile.goal}
                  onChange={handleInputChange}
                >
                  <option value="lose_weight">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain_weight">Gain Weight</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Save</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="profile-info">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Height:</strong> {profile.height} cm</p>
                <p><strong>Weight:</strong> {profile.weight} kg</p>
                <p><strong>Activity Level:</strong> {profile.activityLevel.replace('_', ' ')}</p>
                <p><strong>Goal:</strong> {profile.goal.replace('_', ' ')}</p>
                <p><strong>Daily Calorie Target:</strong> {calculateCalories()} kcal</p>
              </div>
              
              <div className="profile-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setIsEditing(true);
                    setFormData({
                      name: profile.name,
                      age: profile.age,
                      gender: profile.gender,
                      height: profile.height,
                      weight: profile.weight,
                      activityLevel: profile.activityLevel,
                      goal: profile.goal
                    });
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;