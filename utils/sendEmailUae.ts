export const getUaeFtsInitiatedMail = (name: string) => {
  const subject = `UAE-FTS Request Initiated || ${name}`;
  const body = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; font-size: 14px; color: #000000;">
        <p>Dear <strong>${name}</strong>,</p>

        <p>Greetings from Newgen Bank!!</p>

        <p>
          We are pleased to inform you that your request for UAE Funds Transfer System (UAE-FTS) 
          has been successfully initiated. We will inform you when your request is completed. 
          You can resume your journey after completion of this request.
        </p>

        <p>
          Please note that the processing time may vary based on the beneficiary bank’s operating hours 
          and the nature of the transaction. Should any further information or action be required from your side, 
          we will contact you promptly.
        </p>

        <p>
          If you have any questions or require further assistance, please do not hesitate to reach out to us at 
          <a href="https://www.newgensoft.com">www.newgensoft.com</a> or 
          <a href="mailto:support@newgensoft.com">support@newgensoft.com</a>.
        </p>

        <p>Thanking You!!</p>
        <p><strong>Newgen Bank</strong></p>
      </body>
    </html>
  `;

  return { subject, body };
};

export const getUaeFtsCompletedMail = (name: string) => {
  const subject = `UAE-FTS Request Completed || ${name}`;
  const body = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; font-size: 14px; color: #000000;">
        <p>Dear <strong>${name}</strong>,</p>

        <p>Greetings from <strong>Newgen Bank</strong>!!</p>

        <p>
          We are pleased to inform you that your request for <strong>UAE Funds Transfer System (UAE-FTS)</strong> 
          has been successfully <strong>Completed</strong>.
        </p>

        <p>
          Please click here to resume your Mortgage Loan Journey - 
          <a href="https://tytlmsdemo.newgensoftware.net/CustomerPortalUAE/" target="_blank">
            https://tytlmsdemo.newgensoftware.net/CustomerPortalUAE/
          </a>
        </p>

        <p>
          If you have any questions or require further assistance, please do not hesitate to reach out 
          to us at <a href="https://www.newgensoft.com" target="_blank">www.newgensoft.com</a> or 
          <a href="mailto:support@newgensoft.com">support@newgensoft.com</a>.
        </p>

        <p>Thanking You!!</p>
        <p><strong>Newgen Bank</strong></p>
      </body>
    </html>
  `;

  return { subject, body };
};
