import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: Request): Promise<Response> => {
  try {
    // استخراج البيانات من الطلب
    const { userId, prompt, tag }: { userId: string; prompt: string; tag: string } = await req.json();

    console.log("Received Data:", { userId, prompt, tag });

    // التحقق من البيانات المدخلة
    if (!userId || !prompt || !tag) {
      return new Response("Missing required fields: userId, prompt, or tag", { status: 400 });
    }

    // الاتصال بقاعدة البيانات
    console.log("Connecting to database...");
    await connectToDB();

    // إنشاء كائن جديد من نموذج Prompt
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();

    console.log("New prompt created successfully:", newPrompt);

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error creating prompt:", error.message);

    return new Response(`Failed to create a new prompt: ${error.message}`, {
      status: 500,
    });
  }
};
