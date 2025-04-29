import type { Actions } from './$types';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

const resend = new Resend(env.RESEND_API_KEY);

export const actions = {
	rsvp: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('fullname')?.toString().trim();
		const rsvp = formData.get('rsvp')?.toString();

		if (!name) {
			return fail(400, { missingName: true });
		}

		if (!rsvp) {
			return fail(400, { missingRsvp: true });
		}

		const { data, error } = await resend.emails.send({
			from: env.FROM_EMAIL,
			to: env.TO_EMAIL,
			subject: `[결혼 초대] ${name}님 참석여부: ${rsvp}`,
			text: `${name}님의 참석여부: ${rsvp}.`
		});

		if (error) {
			return fail(400, { name, emailError: true });
		}

		return { success: true };
	}
} satisfies Actions;
