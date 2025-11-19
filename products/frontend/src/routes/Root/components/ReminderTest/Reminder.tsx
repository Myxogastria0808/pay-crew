import type { FC } from "react";

type Props = {
  historyData: {
    id: number;
    from: string;
    to: string;
    amount: number;
  }[] | undefined
}

const ReminderTest: FC<Props> = (props) => {
  const discordWebhookUrl = "https://discord.com/api/webhooks/1440560971348185088/sE8RwgjZnb6fqSMEb366mJqlSbE1dEIS39pgnTAjuksDjiNS4XXFCvvWmFAvjOzxs9YV";

  const onClick = () => {
    const message = props.historyData === undefined
    ? "No data"
    : props.historyData.map((v) => `返金の流れ: ${v.to} -> ${v.from}\n\t金額: ${v.amount}\n`).join("\n");

    fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `現在残っている返金\n${message}` }),
    });
  }

  return(
    <button onClick={onClick}>リマインダーを送る</button>
  )
};

export default ReminderTest;