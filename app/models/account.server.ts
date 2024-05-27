import { formatSlug } from "~/helpers";
import { db, requireUserId } from "~/utils";

export async function createAccount({
  name,
  slug,
  url,
  feedUrl,
  request,
}: {
  name: string;
  slug: string;
  url: string;
  feedUrl: string;
  request: Request;
}) {
  const userId = await requireUserId(request);

  // todo validation
  if (!name) {
    throw new Error("Name is required");
  }

  if (!slug) {
    throw new Error("Slug is required");
  }

  slug = formatSlug(slug);

  if (!url) {
    throw new Error("URL is required");
  }

  if (!feedUrl) {
    throw new Error("Feed URL is required");
  }

  // todo create account
  await db.account.create({
    data: {
      name,
      slug,
      url,
      feedUrl,
      users: { connect: { id: userId } },
    },
  });

  return new URL(`/${slug}`, request.url).toString();
}

export async function getAccount(slug: string) {
  return db.account.findFirstOrThrow({
    include: { requests: true, users: true },
    where: { slug },
  });
}
