// Quick helper to view all contact-form messages from the terminal.
// Run with:  npm run messages
import 'dotenv/config';
import mongoose from 'mongoose';
import Message from './src/models/Message.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/anjali_portfolio';

async function main() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  const messages = await Message.find().sort({ createdAt: -1 }).lean();

  console.log(`\n📬 Total messages: ${messages.length}`);
  console.log('═'.repeat(55));

  if (messages.length === 0) {
    console.log('No messages yet. Share your portfolio to get some! 😊');
  }

  for (const m of messages) {
    console.log(`👤 ${m.name}   <${m.email}>`);
    console.log(`📌 ${m.subject || '(no subject)'}`);
    console.log(`💬 ${m.message}`);
    console.log(`🕒 ${new Date(m.createdAt).toLocaleString('en-IN')}`);
    console.log('─'.repeat(55));
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Could not read messages:', err.message);
  process.exit(1);
});
