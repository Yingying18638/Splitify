//input: payment, users, ave
//output: bill, totalBill

function calcBills(payment, ave, users) {
  const usersArr = users.map((user) => user.name);

  const bill = payment?.map((_, index) => {
    const result = {};
    for (let i = 0; i < usersArr.length; i++) {
      const gap = payment[index][usersArr[i]] - ave[index][usersArr[i]];
      result[usersArr[i]] = Math.round(gap * 100) / 100;
    }
    return result;
  });
  const totalBill = usersArr?.reduce((acc, user) => {
    acc[user] = bill.reduce((sum, obj) => sum + obj[user], 0);
    return acc;
  }, {});
  return { bill, totalBill };
}
export default calcBills;
