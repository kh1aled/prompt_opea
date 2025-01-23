import connectToDB from "@utils/database";
import Prompt from "@models/prompt";

// تعريف نوع RequestParams
type RequestParams = {
  params: {
    id: string;
  };
};

// تعريف نوع RequestBody للطلبات التي تحتوي على JSON
type RequestBody = {
  prompt: string;
  tag: string;
};

// GET
export const GET = async (_: Request, { params }: RequestParams): Promise<Response> => {
  try {
    console.log("Connecting to database...");
    await connectToDB();

    // Validate the ID
    const { id } = params;
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
  } catch (error: any) {
    console.error("Error fetching prompt:", error.message);
    return new Response(`Failed to fetch the prompt: ${error.message}`, { status: 500 });
  }
};

// PATCH
export const PATCH = async (req: Request, { params }: RequestParams): Promise<Response> => {
  try {
    const { id } = params;
    if (!id || id.length !== 24) {
      return new Response("Invalid ID format", { status: 400 });
    }

    const { prompt, tag }: RequestBody = await req.json();
    console.log("Received Data:", { prompt, tag });

    await connectToDB();

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 201 });
  } catch (error: any) {
    console.error("Error updating prompt:", error);
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (_: Request, { params }: RequestParams): Promise<Response> => {
  try {
    const { id } = params;
    if (!id || id.length !== 24) {
      return new Response("Invalid ID format", { status: 400 });
    }

    await connectToDB();

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error: any) {
    console.error("Error deleting prompt:", error);
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
