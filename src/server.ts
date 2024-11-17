import fastify from "fastify";
import cors from '@fastify/cors';

const server = fastify({ logger: true });

server.register(cors, {
  origin: '*',
})

const teams = [
  { id: 1, name: 'McLaren', base: 'Woking, United Kingdom' },
  { id: 2, name: 'Mercedes', base: 'Brackley, United Kingdom' },
  { id: 3, name: 'Red Bull Racing', base: 'Milton Keynes, United Kingdom' },
  { id: 4, name: 'Ferrari', base: 'Maranello, Italy' },
  { id: 5, name: 'Aston Martin', base: 'Silverstone, United Kingdom' },
  { id: 6, name: 'Alpine', base: 'Enstone, United Kingdom' },
  { id: 7, name: 'AlphaTauri', base: 'Faenza, Italy' },
  { id: 8, name: 'Williams', base: 'Grove, United Kingdom' },
  { id: 9, name: 'Haas', base: 'Kannapolis, United States' },
  { id: 10, name: 'Alfa Romeo', base: 'Hinwil, Switzerland' }
];

const drivers = [
  // Red Bull Racing
  { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing' },
  { id: 2, name: 'Sergio Pérez', team: 'Red Bull Racing' },
  
  // Mercedes
  { id: 3, name: 'Lewis Hamilton', team: 'Mercedes' },
  { id: 4, name: 'George Russell', team: 'Mercedes' },
  
  // Ferrari
  { id: 5, name: 'Charles Leclerc', team: 'Ferrari' },
  { id: 6, name: 'Carlos Sainz', team: 'Ferrari' },
  
  // McLaren
  { id: 7, name: 'Lando Norris', team: 'McLaren' },
  { id: 8, name: 'Oscar Piastri', team: 'McLaren' },
  
  // Aston Martin
  { id: 9, name: 'Fernando Alonso', team: 'Aston Martin' },
  { id: 10, name: 'Lance Stroll', team: 'Aston Martin' },
  
  // Alpine
  { id: 11, name: 'Esteban Ocon', team: 'Alpine' },
  { id: 12, name: 'Pierre Gasly', team: 'Alpine' },
  
  // AlphaTauri
  { id: 13, name: 'Yuki Tsunoda', team: 'AlphaTauri' },
  { id: 14, name: 'Daniel Ricciardo', team: 'AlphaTauri' },
  
  // Williams
  { id: 15, name: 'Alex Albon', team: 'Williams' },
  { id: 16, name: 'Logan Sargeant', team: 'Williams' },
  
  // Haas
  { id: 17, name: 'Kevin Magnussen', team: 'Haas' },
  { id: 18, name: 'Nico Hülkenberg', team: 'Haas' },
  
  // Alfa Romeo
  { id: 19, name: 'Valtteri Bottas', team: 'Alfa Romeo' },
  { id: 20, name: 'Zhou Guanyu', team: 'Alfa Romeo' }
];


interface driversParams{
  id: string
}

server.get('/teams', async(req, res) => {
  res.type("application/json").code(200);

  return {teams};
});

server.get('/drivers', async(req, res) => {
  res.type("application/json").code(200);
  return {drivers};
})

server.get<{Params: driversParams}>('/drivers/:id', async(req, res) => {
 const id = parseInt(req.params.id);
 const driver = drivers.find(d => d.id === id);
 console.log(driver)
 
 if(driver) {
  res.type("application/json").code(200);
  return driver;
} else {
  res.type("application/json").code(404);
  return { message: "Driver not found"}
 }
})

server.listen({port: 3333}, () => {
  console.log("server running on port 3333");
});