import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

//Get


export const GET = async (request, { params }) => {
  try {
    console.log("Connecting to database...");
    await connectToDB();

    // Validate the ID
    const { id } = params; // No need to await params
    if (!id || id.length !== 24) {
      return new Response("Invalid ID format", { status: 400 });
    }

    // Find the prompt by ID
    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      console.log(`Prompt with ID ${id} not found.`);
      return new Response("Prompt not found", { status: 404 });
    }

    console.log(`Fetched prompt: ${JSON.stringify(prompt)}`);
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error.message);
    return new Response(`Failed to fetch the prompt: ${error.message}`, { status: 500 });
  }
};


//patch

export const PATCH = async (req, { params }) => {
  // استخراج البيانات من الطلب
  const { prompt, tag } = await req.json(); // Ensure `await` is used for `req.json`

  console.log("Received Data:", { prompt, tag });
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
