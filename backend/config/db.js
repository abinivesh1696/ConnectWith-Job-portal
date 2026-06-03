import mongoose from 'mongoose';
import dns from 'dns';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/connectwith';

  const currentDnsServers = dns.getServers();
  const localResolver = currentDnsServers.some((server) => server === '127.0.0.1' || server === '::1');
  if (localResolver) {
    const externalDns = ['8.8.8.8', '1.1.1.1'];
    dns.setServers(externalDns);
    console.log('Using external DNS servers for MongoDB SRV lookups:', dns.getServers());
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('\n❌ MongoDB connection failed!');
    console.error('   Error:', err.message);
    console.error(err.stack);
    console.error('\n   Common fixes:');
    console.error('   1. Whitelist your IP in MongoDB Atlas → Network Access');
    console.error('   2. Check username/password in MONGODB_URI');
    console.error('   3. Ensure your Atlas cluster is not paused\n');
    process.exit(1);
  }
};

export default connectDB;
