import { createCookieSessionStorage, json, redirect } from "@remix-run/node";

import { db } from "./db.server";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    name: "session",
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession({
  id,
  go,
}: {
  id: string;
  go?: string;
}) {
  const session = await storage.getSession();
  session.set("id", id);
  return redirect(go ?? "/", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getSession(request: Request) {
  return await storage.getSession(request.headers.get("Cookie"));
}

export async function getUser(request: Request) {
  const { pathname } = new URL(request.url);

  // return default user if it's a static route (doesn't need to be authenticated)
  if (pathname.endsWith(".svg")) {
    return null;
  }

  const session = await getSession(request);
  const userID = session.get("id");

  if (!userID) {
    return null;
  }

  const user = await db.user.findFirst({
    select: {
      id: true,
      emailHash: true,
      accounts: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    where: { id: userID },
  });

  if (user) {
    await db.user.update({
      data: { lastSeen: new Date() },
      where: { id: userID },
    });
  }

  return user;
}

export async function jsonWith(request: Request, payload: object) {
  const session = await getSession(request);

  const info = session.get("info") as string;
  const error = session.get("error") as string;
  const warning = session.get("warning") as string;
  const success = session.get("success") as string;
  const alert =
    info || error || warning || success
      ? {
          info,
          error,
          warning,
          success,
        }
      : undefined;

  return json(
    { ...payload, alert },
    {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    }
  );
}

export async function logout(request: Request, go = "/") {
  const session = await getSession(request);
  return redirect(go, {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function redirectWith(
  route: string,
  request: Request,
  payload: {
    // [Property in keyof AlertType]: string;
  }
) {
  const session = await getSession(request);
  session.flash(Object.keys(payload)[0], Object.values(payload)[0]);
  return redirect(route, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

// fast(er) function for backend that throws when there's an error
export async function requireUserId(request: Request) {
  // get user
  const session = await getSession(request);
  const userID = session.get("id");

  if (!userID) {
    throw new Error("User is required");
  }

  const user = await db.user.findFirstOrThrow({
    select: {
      id: true,
    },
    where: { id: userID },
  });

  return user.id;
}
