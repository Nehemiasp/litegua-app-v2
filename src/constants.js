// Ubicaciones de buses (nombres tal como los maneja el sistema de Litegua)
export const BUS_LOCATIONS = [
  'Ciudad Capital',
  'Chiquimula',
  'Rio Dulce',
  'Santo tomas de Castilla',
  'Retalhuleu Irtra',
  'Puerto Barrios',
  'El Florido',
  'Jocotan',
  'Los Amates',
  'Entre Rios',
  'El Rancho',
  'Cadenas',
  'Sanarate',
  'Teculutan',
  'Valle Dorado',
  'Rio Hondo',
  'Mayuelas',
  'Morales',
  'Gualan',
]

// Precios fijos por planta (Q). Cambian solo si Litegua los modifica.
export const DECK_PRICES = { upper: 145, lower: 200 }

// Numeración de butacas: planta baja 1-40, planta alta 41-80
export const UPPER_DECK_FIRST_SEAT = 41

export const seatDeck = (seatNum) => (seatNum >= UPPER_DECK_FIRST_SEAT ? 'upper' : 'lower')
export const seatPrice = (seatNum) => DECK_PRICES[seatDeck(seatNum)]

// LEX (encomiendas)
export const LEX_PACKAGE_TYPES = ['Documentos', 'Paquete pequeño', 'Caja mediana', 'Caja grande', 'Frágil']
export const LEX_WEIGHTS = ['Menos de 1 kg', '1 a 5 kg', '5 a 15 kg', 'Más de 15 kg']
