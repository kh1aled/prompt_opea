import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  // استخراج البيانات من الطلب
  const { userId, prompt, tag } = await req.json(); // Ensure `await` is used for `req.json`

  console.log("Received Data:", { userId, prompt, tag });
  try {
    // الاتصال بقاعدة البيانات
    await connectToDB();

    // إنشاء كائن جديد من نموذج Prompt
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error("Error creating prompt:", error); // Log error for debugging
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
