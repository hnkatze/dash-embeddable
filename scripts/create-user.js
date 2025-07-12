import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createUser(username, password) {
  try {
    const docRef = await addDoc(collection(db, 'userdashboard'), {
      username: username,
      pass: password,
      createdAt: new Date().toISOString()
    });
    
    console.log('Usuario creado exitosamente con ID:', docRef.id);
    console.log('Username:', username);
    console.log('Password:', password);
    
    process.exit(0);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    process.exit(1);
  }
}

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('Uso: node scripts/create-user.js <username> <password>');
  console.log('Ejemplo: node scripts/create-user.js admin 123456');
  process.exit(1);
}

const [username, password] = args;
createUser(username, password);