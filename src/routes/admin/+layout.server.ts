import { fail, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";

export const load = (async ({ locals: { getSession }}) => {
    const session = await getSession();

    if (!session) {
        throw redirect(303, "/login");
    }

    return {
        session
    }
}) satisfies LayoutServerLoad;