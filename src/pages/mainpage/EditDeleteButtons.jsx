import React from "react";
import { Button } from "../../components/ui/button";
function EditDeleteButtons({ handleEditExpense, handleDeleteExpense, time }) {
  return (
    <div className="md:self-center">
      <Button onClick={() => handleEditExpense(time)}>編輯</Button>
      <Button onClick={() => handleDeleteExpense(time)}>刪除</Button>
    </div>
  );
}
export { EditDeleteButtons };
