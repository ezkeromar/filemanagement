import axios from 'axios';	
 
export async function sendEmail({ to, from, subject, message } : { to: string, from: string, subject: string, message: string }) {
    const emailData = {
      from,
      to,
      subject,
      text: message,
    };
    try {

    const response = await axios.post('https://api.mailgun.net/v3/sandbox3f178afdf51b419fb4324a08a3088774.mailgun.org/messages', emailData, {
        auth: {
          username: 'api',
          password: '499366d0e09bb66cede0bb7cd0752dbe-ed54d65c-dd36c1eb',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log(response);

    }
    catch (error) {
      console.error('Error sending email:', error);
    }
  }