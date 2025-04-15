import React, { useState } from 'react';
import { FoodDiary, AddMealForm } from '../components';

const DiaryPage: React.FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="diary-page">
      <h1>Дневник питания</h1>
      <DatePicker selected={date} onChange={(date: Date) => setDate(date)} />
      <AddMealForm date={date} />
      <FoodDiary date={date} />
    </div>
  );
};

export default DiaryPage;