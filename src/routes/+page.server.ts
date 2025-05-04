import type { Actions } from './$types';
import { Resend } from 'resend';
import { env as nodeEnv } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	rsvp: async ({ request, platform }) => {
		const cfEnv = platform?.env;
		const apiKey = cfEnv?.RESEND_API_KEY ?? nodeEnv.RESEND_API_KEY;
		const fromEmail = cfEnv?.FROM_EMAIL ?? nodeEnv.FROM_EMAIL;
		const toEmail = cfEnv?.TO_EMAIL ?? nodeEnv.TO_EMAIL;
		const resend = new Resend(apiKey);

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
			from: fromEmail,
			to: toEmail,
			subject: `[결혼 초대] ${name}님 참석여부: ${rsvp}`,
			text: `${name}님의 참석여부: ${rsvp}.`
		});

		if (error) {
			return fail(400, { name, emailError: true });
		}

		return { success: true };
	}
} satisfies Actions;
