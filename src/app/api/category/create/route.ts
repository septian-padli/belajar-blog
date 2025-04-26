import { getTrpcCaller } from "@/server/server";


export async function POST(req: Request) {
  const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const slug = formData.get("slug")?.toString();

  if (!name || !slug) {
    return new Response("Name and slug are required", { status: 400 });
  }

  const trpc = await getTrpcCaller();

  const existingCategory = await trpc.category.getCategories({
    name,
  });

  if (existingCategory.length > 0) {
    return new Response("Category with this name already exists", { status: 409 });
  }

  try {
    const category = await trpc.category.createCategory({
      name,
      slug,
    });

    return Response.json({ success: true, category });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create category", { status: 500 });
  }
}