import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { Webhook } from 'svix';
import { api } from './_generated/api';

const http = httpRouter();

http.route({
  path: '/clerk-webhook', // Added the leading slash
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('No webhook secret');
    }
    //   # check HEaders
    const svix_id = request.headers.get('svix-id');
    const svix_signature = request.headers.get('svix-signature');
    const svix_timestamp = request.headers.get('svix-timestamp');
    if (!svix_timestamp || !svix_signature || !svix_id) {
      throw new Error('NO SVIX HEADERS');
    }
    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let event: any;

    try {
      event = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as any;
    } catch (err) {
      console.log('🚀 ~ handler:httpAction ~ err:', err);
    }
    const eventType = event.type;
    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = event.data;
      const email = email_addresses[0].email_addresses;
      const name = `${first_name || ''} ${last_name || ''} `.trim();

      try {
        await ctx.runMutation(api.hooks.users.mutations.index.createUser, {
          email,
          fullName: name,
          clerkId: id,
          username: email.split('@')[0],
          image: image_url,
        });
      } catch (error) {
        console.log('🚀 ~ handler:httpAction ~ error:', error);
        return new Response('Error Create User', { status: 500 });
      }
    }
    return new Response('Webhook Loaded Successfully', { status: 200 });
  }),
});

// Add this default export
export default http;
