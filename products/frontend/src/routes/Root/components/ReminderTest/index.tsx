import type { FC } from "react";

const ReminderTest: FC = () => {
  const webhookUrl = "https://discord.com/api/webhooks/1430405385671671858/EZZlF3vrhVw-zwhBg9OVVuINsOJHSc-NneYRfVKzR-V32Ng76lYLcByOnVKCkNuVrIfG";

  const onClick = () => {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "Send a test message!" }),
    });
  }

  return(
    <button onClick={onClick}>テストボタン</button>
  )
};

export default ReminderTest;