import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Initialize Resend with your API Key
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Parse the incoming form data
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const phone = data.get('phone')?.toString();
    const email = data.get('email')?.toString(); // Capture the new email field
    const service = data.get('service')?.toString();
    const details = data.get('details')?.toString();

    // 2. Validate the data
    if (!name || !phone || !email) {
      return new Response(JSON.stringify({ error: "Name, phone, and email are required." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Grab the tenant ID
    const tenantId = locals.tenantId;

    // TODO: In the future, you will query Sanity here to get the specific tenant's email address 
    // const tenantData = await sanityClient.fetch(`*[_type == "tenant" && _id == $tenantId][0]`, { tenantId });
    // const clientEmail = tenantData.contactEmail;
    
    // For now, hardcode your email to test it:
    const clientEmail = 'calebsmithy20@gmail.com'; 
    const agencyEmail = 'onboarding@resend.dev'; // This MUST be a domain you verify in Resend

    // 4. Dispatch Email to the Client (The Plumber)
    const notifyClient = resend.emails.send({
      from: agencyEmail,
      to: clientEmail,
      subject: `New Lead: ${service} - ${name}`,
      html: `
        <h2>You have a new service lead!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Details:</strong><br/> ${details}</p>
      `
    });

    // 5. Dispatch Email to the Customer (The Homeowner)
    const notifyCustomer = resend.emails.send({
      from: agencyEmail,
      to: email,
      subject: `We received your request - ${service}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! We have received your request for <strong>${service}</strong>.</p>
        <p>One of our team members will review your details and call you shortly at ${phone} to provide a quote.</p>
        <br/>
        <p>Best regards,</p>
        <p>The Service Team</p>
      `
    });

    // 6. Fire both emails simultaneously
    const [clientResponse, customerResponse] = await Promise.all([notifyClient, notifyCustomer]);

    // Optional: Check if Resend threw any internal errors
    if (clientResponse.error || customerResponse.error) {
      console.error("Resend Error:", clientResponse.error || customerResponse.error);
      throw new Error("Failed to send emails via Resend");
    }

    // 7. Return a success response to the frontend
    return new Response(JSON.stringify({ success: true, message: "Lead submitted!" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Lead submission failed:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};