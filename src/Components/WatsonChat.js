// File: src/components/WatsonChat.js
import { useEffect } from 'react';

const WatsonChat = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "ceaab0de-a3f6-48c2-b9c0-2e55e7ce5f13",
      region: "au-syd",
      serviceInstanceID: "cc9647e4-30f9-463a-9a0a-8c928061a3e8",
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    setTimeout(() => {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    }, 0);
  }, []);

  return null; // Widget loads as floating icon, no visible component needed
};

export default WatsonChat;
