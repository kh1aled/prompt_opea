import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (): Promise<Response> => {
  try {
    // الاتصال بقاعدة البيانات
    console.log("Connecting to database...");
    await connectToDB();

    // جلب جميع الـ Prompts مع البيانات المرتبطة بـ "creator"
    const prompts = await Prompt.find({}).populate("creator");

    if (!prompts || prompts.length === 0) {
      return new Response("No prompts found", { status: 404 });
    }

    console.log("Prompts fetched successfully:", prompts);

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch prompts:", (error as Error).message);

    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
