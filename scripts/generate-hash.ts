import { hash, compare } from 'bcryptjs';

async function generateAndVerifyHash() {
  const password = 'Admin@2024';
  const hashedPassword = await hash(password, 12);
  console.log('Generated hash:', hashedPassword);
  
  // Verify the hash works
  const isValid = await compare(password, hashedPassword);
  console.log('Hash verification:', isValid);

  // Verify against stored hash
  const storedHash = '$2a$12$k8Y1LJ7PWFkUSDTRPQynZOUVNRzVXOBEUg8oop.QgRyaYFoIkqmzW';
  const isStoredValid = await compare(password, storedHash);
  console.log('Stored hash verification:', isStoredValid);
}

generateAndVerifyHash().catch(console.error); 