import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    console.log('Database connection established successfully.');
    const existingAdmin = await Admin.findOne({ name: process.env.ADMIN_NAME });
    if (existingAdmin) {
        console.log('Admin user already exists. Skipping seeding.');
        process.exit(0);
    }
    const admin = new Admin({
      name: process.env.ADMIN_NAME,
      password: process.env.ADMIN_PASSWORD,
    });
    await admin.save();
    console.log('Admin user created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}
seedAdmin();