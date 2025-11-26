import { GoogleGenAI } from "@google/genai";
import { DailyLogData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDailyReport = async (data: DailyLogData): Promise<string> => {
  try {
    const prompt = `
      You are a facility management AI assistant. 
      Analyze the following daily meter reading log data and provide a brief summary report in Korean.
      
      Highlight any missing values or potential anomalies (if values seem unrealistic, though you may not have context for "normal" ranges, just flag extreme outliers if obvious).
      Summarize the data completion status.

      Data:
      ${JSON.stringify(data, null, 2)}

      Format the output as a concise HTML-friendly summary (using <p>, <ul>, <li> tags, but do not wrap in <html> or <body>).
      Keep the tone professional and helpful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "리포트를 생성할 수 없습니다.";
  } catch (error) {
    console.error("Error generating report:", error);
    return "AI 서비스 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};