import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import useStore from "./hooks/useStore";
const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: "#whoPaid",
      popover: {
        title: "誰先付",
        description: "這筆帳是誰付的？",
      },
    },
    {
      element: "#evenPayer",
      popover: { title: "一人付帳，直接選他", description: "就是這麼簡單" },
    },
    {
      element: "#morePayerOptions",
      popover: {
        title: "多人合付這筆帳時",
        description: "點擊後開啟多人付款視窗，填誰付了多少錢",
      },
    },
    {
      element: "#whoParticipated",
      popover: { title: "分給誰", description: "這筆帳誰要分擔？" },
    },
    {
      element: "#evenParticipated",
      popover: { title: "若是平均分擔", description: "選擇須參與分擔的人就好" },
    },
    {
      element: "#cusParticipatedOptions",
      popover: {
        title: "每個人要分擔的金額不同時",
        description: "點擊後開啟自訂分擔視窗，填誰應該要分擔多少錢",
      },
    },
  ],
});
export default function useAddExpGuide() {
  driverObj.drive();
}
