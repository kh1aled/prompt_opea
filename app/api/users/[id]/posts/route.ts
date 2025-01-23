import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

// تعريف النوع الخاص بـ params
interface Params {
  id: string;
}

// تعريف نوع الاستجابة
export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
): Promise<Response> => {
  try {
    // الاتصال بقاعدة البيانات
    console.log("Connecting to database...");
    await connectToDB();

    // استخراج `id` من `params`
    const { id } = params;

    // التحقق من صحة الـ ID
    if (!id || id.length !== 24) {
      return new Response("Invalid ID format", { status: 400 });
    }

    // جلب البيانات
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    if (!prompts || prompts.length === 0) {
      return new Response("No prompts found for this creator", { status: 404 });
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
