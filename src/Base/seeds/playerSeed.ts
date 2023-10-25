import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const players = [
  { firstname: 'Martin', lastname: 'Pousa' },
  { firstname: 'Lolo', lastname: 'Garay' },
  { firstname: 'Danilo', lastname: 'Ramirez' },
  { firstname: 'Marcos', lastname: 'Santangelo' },
  { firstname: 'Nico', lastname: 'Raso' },
  { firstname: 'Camilo', lastname: 'Sanchez' },
  { firstname: 'Fabri', lastname: 'Lamanna' },
  { firstname: 'Ale', lastname: 'Riguini' },
  { firstname: 'Maxi', lastname: 'Ferrer' },
  { firstname: 'Pablo', lastname: 'Lauria' },
  { firstname: 'Agustin', lastname: 'Cernaszuk' },
  { firstname: 'Pity', lastname: 'Viglietti' },
  { firstname: 'Antonio', lastname: 'Gasparetto' },
  { firstname: 'Sebastian', lastname: 'Liaudat' },
  { firstname: 'Javier', lastname: 'Rothen' },
  { firstname: 'Pachu', lastname: 'Maglione' },
  { firstname: 'Nico', lastname: 'Solis' },
  { firstname: 'Mariano', lastname: 'Cunningham' },
  { firstname: 'Cristian', lastname: 'Charito' },
  { firstname: 'Bruce', lastname: 'Guerreiro' },
  { firstname: 'Matias', lastname: 'Lambert' },
  { firstname: 'Jeremías', lastname: 'Torres' },
  { firstname: 'Axel', lastname: 'Robles' },
  { firstname: 'Chulo', lastname: 'Galeano' },
  { firstname: 'Joni', lastname: 'Sartori' },
  { firstname: 'Toto', lastname: 'Machia' },
  { firstname: 'Claudio', lastname: 'Ruiz' },
  { firstname: 'Seba', lastname: 'Cvitanich' },
  { firstname: 'Lucas', lastname: 'Dieser' },
  { firstname: 'Damian', lastname: 'Arevalo' },
  { firstname: 'Rodrigo', lastname: 'Ledesma' },
  { firstname: 'Cristian', lastname: 'Latorre' },
  { firstname: 'Josué', lastname: 'Martinez' },
  { firstname: 'Matias', lastname: 'Cossi' },
  { firstname: 'Rocco', lastname: 'Castrignano' },
  { firstname: 'Toto', lastname: 'Encinas' },
  { firstname: 'Pedro', lastname: 'Martinez' },
  { firstname: 'Emilio', lastname: 'Gimenez' },
  { firstname: 'Matias', lastname: 'Pousa' },
  { firstname: 'Santi', lastname: 'Amendolara' },
];

async function seed() {
  try {
    // Crea registros de ejemplo en la base de datos utilizando Prisma
    await prisma.player.createMany({
      data: players,
    });

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
