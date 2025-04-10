// /api/notify.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    date, time, pickup, dropoffs, carType, people, luggage, fare
  } = req.body;

  const lineAccessToken = "+OmfPQlYnKuAnwivXmmUAmqgdUSSUID49stCDeXAi8poK183ssaNEGUc9rOYzZQIuOPN6fBwiswZ1beSCOj2aQIARLYONoxHlacIdXwZNEkMVgw2Ll6f0N79sOuxbyQogAzk3GTEfgfvGu+P9/qQYgdB04t89/1O/w1cDnyilFU=";

  const flexMessage = {
    type: "flex",
    altText: "Tesla 預約通知",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://tesla-ride-booking.vercel.app/Welcome.png",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover"
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          { type: "text", text: "新預約通知", weight: "bold", size: "xl" },
          { type: "text", text: `日期：${date} ${time}`, size: "sm" },
          { type: "text", text: `上車地點：${pickup}`, size: "sm" },
          ...dropoffs.map((d, i) => ({
            type: "text",
            text: `下車地點${i + 1}：${d}`,
            size: "sm"
          })),
          { type: "text", text: `車型：${carType}`, size: "sm" },
          { type: "text", text: `人數：${people} 人 / 行李：${luggage} 件`, size: "sm" },
          { type: "text", text: `報價：NT$ ${fare}`, size: "md", weight: "bold", color: "#27AC00" }
        ]
      }
    }
  };

  try {
    const response = await fetch("https://api.line.me/v2/bot/message/broadcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lineAccessToken}`
      },
      body: JSON.stringify({ messages: [flexMessage] })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("LINE 發送失敗：", error);
      return res.status(500).json({ message: "LINE 發送失敗", error });
    }

    return res.status(200).json({ message: "LINE 發送成功" });
  } catch (err) {
    console.error("伺服器錯誤：", err);
    return res.status(500).json({ message: "伺服器錯誤", error: err.message });
  }
}
