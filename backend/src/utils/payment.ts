import axios from 'axios';

type TypeProduct = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  imageurl: string;
  quantity?: number;
};

const secretApiKey = process.env.PAYMONGO_API_KEY;

const headers = {
  Authorization: `Basic ${Buffer.from(secretApiKey + ':').toString('base64')}`,
  'Content-Type': 'application/json',
};

const payMongoAPI = process.env.PAYMONGO_API_LINK as string;

export async function createPaymentLink(userId: number, price: number, selectedProducts: TypeProduct[]) {
  try {
    const requestBody = {
      data: {
        attributes: {
          amount: price * 100, // 10k = 100
          currency: 'PHP',
          description: selectedProducts.map((prod) => {
            return { user_id: userId, product_id: prod.id, quantity: prod.quantity };
          }),
        },
      },
    };

    const response = await axios.post(payMongoAPI, requestBody, { headers });

    return response.data.data.attributes.checkout_url;
  } catch (error: any) {
    console.error('Error creating payment link:', error.response?.data || error.message);
  }
}

const webhookUrl = process.env.WEBHOOK_URL;

const events = ['payment.paid', 'payment.failed', 'link.payment.paid'];

const webhookData = {
  data: {
    attributes: {
      url: webhookUrl,
      events: events,
    },
  },
};

export async function createWebhook() {
  try {
    const response = await axios.post('https://api.paymongo.com/v1/webhooks', webhookData, { headers });
    console.log('Webhook created successfully:', response.data);
  } catch (error: any) {
    console.error('Error creating webhook:', error.response?.data || error.message);
  }
}
