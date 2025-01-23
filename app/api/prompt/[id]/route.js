import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

//Get
export const GET = async (req, { params }) => {
  try {
    //الاتصال بقاعدة البيانات
    console.log("connecting to DB");

    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) {
      return new Response("Prompt Not Found");
    } else {
    }

    return new Response(JSON.stringify(prompts), { status: 221 });
  } catch (error) {
    return new Response("failed to fetch all prompts");
  }
};

//patch

export const PATCH = async (req, { params }) => {
  // استخراج البيانات من الطلب
  const { prompt, tag } = await req.json(); // Ensure `await` is used for `req.json`

  console.log("Received Data:", {prompt, tag });
  try {
    // الاتصال بقاعدة البيانات
    await connectToDB();

    // إنشاء كائن جديد من نموذج Prompt
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 201 });
  } catch (error) {
    console.error("Error updating prompt:", error); // Log error for debugging
    return new Response("Failed to update the prompt", { status: 500 });
  }
};


//delete

export const DELETE = async (req, { params }) => {
  try {
    // الاتصال بقاعدة البيانات
    await connectToDB();

    const prompt = await Prompt.findById(params.id);
    
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // حذف ال PROMPT
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting prompt:", error); // Log error for debugging
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
