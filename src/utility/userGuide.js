import { driver } from "driver.js";
import "driver.js/dist/driver.css";
const driverObjMain = driver({
  showProgress: true,
  steps: [
    {
      element: "#sidebar",
      popover: {
        title: "Title",
        description: "按外面就能停止導覽",
        onNextClick: () => {
        //   if (true) {
        //     alert("Please wait...");
        //     return;
        //   }
          driverObjMain.moveNext();
        },
      },
    },
    {
      element: "#account",
      popover: { title: "Title", description: "Description" },
    },
    {
      element: "#calculation",
      popover: { title: "Title", description: "Description" },
    },
    {
      element: "#seeMembers",
      popover: { title: "Title", description: "查看群組成員" },
    },
    {
      element: "#copyLink",
      popover: { title: "Title", description: "複製群組連結" },
    },
  ],
});
export default function startGuide() {
  driverObjMain.drive();
}
