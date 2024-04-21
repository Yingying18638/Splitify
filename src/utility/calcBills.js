//input: payment, users, ave
//ouput: bill, totalBill

function calcBills(payment, ave, users) {
  const usersArr = users.map((user) => user.name);

  const bill = payment?.map((_, index) => {
    const result = {};
    for (let i = 0; i < usersArr.length; i++) {
      result[usersArr[i]] =
        payment[index][usersArr[i]] - ave[index][usersArr[i]];
    }
    return result;
  });
  console.log("bill", bill);
  const totalBill = usersArr?.reduce((acc, user) => {
    acc[user] = bill.reduce((sum, obj) => sum + obj[user], 0);
    return acc;
  }, {});
  console.log("totalBill", totalBill);
  return { bill, totalBill };
}
export default calcBills;