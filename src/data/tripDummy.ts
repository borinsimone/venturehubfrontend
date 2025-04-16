export type Activity = {
  id: string;
  name: string;
  title?: string;
  icon: string;
  time: string;
  description: string;
  details?: string;
  type: string;
  completed?: boolean;
  from?: string;
  to?: string;
  location?: string;
};

export type Day = {
  day: string | number;
  date?: string;
  activities: Activity[];
};

export type Todo = {
  text: string;
  checked: boolean;
};

export type TripDetails = {
  id: string;
  destination: string;
  title?: string;
  image: string;
  date: string;
  startDate?: string;
  endDate?: string;
  participants?: string[];
  todos?: Todo[];
  days?: Day[];
  totalExpenses?: number;
  balances?: {
    username: string;
    amount: number;
  }[];
};

export const dummyTrips: TripDetails[] = [
  {
    id: '1',
    destination: 'Roma, Italia',
    title: 'Vacanza a Roma',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    date: '10 - 15 Giugno',
    startDate: '2024-06-10',
    endDate: '2024-06-15',
    participants: ['Marco', 'Giulia', 'Alessandro', 'Sofia'],
    totalExpenses: 1250.75,
    balances: [
      { username: 'Tu', amount: -145.5 },
      { username: 'Marco', amount: 78.3 },
      { username: 'Giulia', amount: 125.8 },
      { username: 'Alessandro', amount: -58.6 },
    ],
    todos: [
      { text: 'Prenotare volo Roma', checked: true },
      { text: 'Prenotare hotel centro storico', checked: true },
      { text: 'Comprare biglietti Musei Vaticani', checked: false },
      { text: 'Prenotare tour Colosseo', checked: false },
      { text: 'Preparare valigia', checked: false },
    ],
    days: [
      {
        day: '1',
        date: '10 Giugno',
        activities: [
          {
            id: 'a1',
            name: 'Arrivo a Roma',
            icon: 'plane',
            time: '10:30 AM',
            description:
              "Atterraggio all'aeroporto di Fiumicino. Prendere il Leonardo Express per Roma Termini.",
            type: 'trasporto',
            from: 'Milano Malpensa',
            to: 'Roma Fiumicino',
          },
          {
            id: 'a2',
            name: 'Check-in Hotel',
            icon: 'hotel',
            time: '1:00 PM',
            description:
              "Check-in all'Hotel Artemide. Abbiamo prenotato due camere doppie con colazione inclusa.",
            type: 'alloggio',
            location: 'Via Nazionale, 22',
          },
          {
            id: 'a3',
            name: 'Passeggiata Centro Storico',
            icon: 'walk',
            time: '3:30 PM',
            description:
              'Passeggiata esplorativa nel centro di Roma. Fontana di Trevi, Piazza di Spagna e Pantheon.',
            type: 'escursione',
            location: 'Centro storico',
          },
          {
            id: 'a4',
            name: 'Cena Trastevere',
            icon: 'food',
            time: '8:00 PM',
            description:
              'Cena in una trattoria tradizionale a Trastevere. Prenotazione a nome di Marco.',
            type: 'ristorazione',
            location: 'Trattoria Da Enzo, Trastevere',
          },
        ],
      },
      {
        day: '2',
        date: '11 Giugno',
        activities: [
          {
            id: 'b1',
            name: 'Colosseo e Foro Romano',
            icon: 'monument',
            time: '9:00 AM',
            description:
              'Tour guidato del Colosseo, Foro Romano e Palatino. Tour di 3 ore con guida italiana. Portare acqua e cappello per il sole.',
            type: 'cultura',
            location: 'Colosseo, Via dei Fori Imperiali',
          },
          {
            id: 'b2',
            name: 'Pranzo',
            icon: 'food',
            time: '1:00 PM',
            description:
              'Pranzo presso Pizzeria ai Marmi. Famosa per la pizza romana sottile e croccante.',
            type: 'ristorazione',
            location: 'Via dei Marmi, 5',
          },
          {
            id: 'b3',
            name: 'Musei Capitolini',
            icon: 'museum',
            time: '3:00 PM',
            description:
              'Visita ai Musei Capitolini, la più antica collezione pubblica di arte al mondo. Da vedere la Lupa Capitolina e la statua di Marco Aurelio.',
            type: 'cultura',
            location: 'Piazza del Campidoglio, 1',
          },
        ],
      },
      {
        day: '3',
        date: '12 Giugno',
        activities: [
          {
            id: 'c1',
            name: 'Musei Vaticani',
            icon: 'museum',
            time: '8:30 AM',
            description:
              'Visita dei Musei Vaticani e Cappella Sistina. Ingresso alle 9:00 con prenotazione. Dress code: spalle coperte e niente pantaloncini corti.',
            type: 'cultura',
            location: 'Viale Vaticano',
          },
          {
            id: 'c2',
            name: 'Basilica di San Pietro',
            icon: 'church',
            time: '12:00 PM',
            description:
              'Visita della Basilica di San Pietro e possibilità di salire sulla cupola per una vista panoramica (7€ ascensore + 320 scalini).',
            type: 'cultura',
            location: 'Piazza San Pietro',
          },
          {
            id: 'c3',
            name: 'Shopping Via del Corso',
            icon: 'shopping',
            time: '3:30 PM',
            description:
              'Pomeriggio di shopping lungo Via del Corso e strade limitrofe. Negozi di marchi italiani e internazionali.',
            type: 'shopping',
            location: 'Via del Corso',
          },
        ],
      },
      {
        day: '4',
        date: '13 Giugno',
        activities: [
          {
            id: 'd1',
            name: 'Villa Borghese',
            icon: 'park',
            time: '9:30 AM',
            description:
              'Visita della Galleria Borghese (prenotazione obbligatoria) e passeggiata nei giardini di Villa Borghese. Possibilità di noleggiare barchette sul laghetto.',
            type: 'cultura',
            location: 'Piazzale Scipione Borghese, 5',
          },
          {
            id: 'd2',
            name: 'Pranzo Piazza del Popolo',
            icon: 'food',
            time: '1:00 PM',
            description:
              "Pranzo in uno dei caffè storici di Piazza del Popolo. Consigliato Caffè Rosati per l'atmosfera e la posizione.",
            type: 'ristorazione',
            location: 'Piazza del Popolo',
          },
          {
            id: 'd3',
            name: "Castel Sant'Angelo",
            icon: 'castle',
            time: '3:30 PM',
            description:
              "Visita di Castel Sant'Angelo, antica fortezza e prigione papale. Belle viste sul Tevere e San Pietro dalla terrazza.",
            type: 'cultura',
            location: 'Lungotevere Castello, 50',
          },
        ],
      },
      {
        day: '5',
        date: '14 Giugno',
        activities: [
          {
            id: 'e1',
            name: 'Parco degli Acquedotti',
            icon: 'park',
            time: '10:00 AM',
            description:
              'Escursione al Parco degli Acquedotti per vedere i maestosi acquedotti romani. Portare macchina fotografica e acqua.',
            type: 'natura',
            location: 'Via Lemonia',
          },
          {
            id: 'e2',
            name: 'Quartiere Ostiense',
            icon: 'city',
            time: '2:00 PM',
            description:
              "Visita del quartiere Ostiense per vedere i murales e l'arte urbana. Zona con molti locali trendy e ristoranti.",
            type: 'cultura',
            location: 'Quartiere Ostiense',
          },
          {
            id: 'e3',
            name: 'Cena di arrivederci',
            icon: 'food',
            time: '8:00 PM',
            description:
              'Cena speciale di arrivederci in un ristorante tipico romano. Menu degustazione di piatti tradizionali.',
            type: 'ristorazione',
            location: 'Ristorante Roscioli, Via dei Giubbonari',
          },
        ],
      },
      {
        day: '6',
        date: '15 Giugno',
        activities: [
          {
            id: 'f1',
            name: 'Check-out',
            icon: 'hotel',
            time: '10:00 AM',
            description:
              "Check-out dall'hotel. Possibilità di lasciare i bagagli alla reception se necessario.",
            type: 'alloggio',
            location: 'Hotel Artemide',
          },
          {
            id: 'f2',
            name: 'Tempo libero',
            icon: 'city',
            time: '10:30 AM',
            description:
              'Tempo libero per ultimi acquisti o visite. Consigliata una passeggiata finale nel centro storico.',
            type: 'tempo libero',
          },
          {
            id: 'f3',
            name: 'Partenza',
            icon: 'plane',
            time: '4:30 PM',
            description:
              'Partenza da Roma Fiumicino. Arrivo in aeroporto consigliato 2 ore prima della partenza. Prendere il Leonardo Express da Roma Termini.',
            type: 'trasporto',
            from: 'Roma Fiumicino',
            to: 'Milano Malpensa',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    destination: 'Barcellona, Spagna',
    title: 'Weekend a Barcellona',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
    date: '20 - 22 Luglio',
    startDate: '2024-07-20',
    endDate: '2024-07-22',
    participants: ['Lorenzo', 'Chiara'],
    totalExpenses: 780.25,
    balances: [
      { username: 'Tu', amount: 145.3 },
      { username: 'Lorenzo', amount: -85.5 },
      { username: 'Chiara', amount: -59.8 },
    ],
    todos: [
      { text: 'Prenotare volo per Barcellona', checked: true },
      { text: 'Prenotare hotel zona Rambla', checked: true },
      { text: 'Biglietti Sagrada Familia', checked: false },
      { text: 'Controllare meteo', checked: false },
    ],
    days: [
      {
        day: '1',
        date: '20 Luglio',
        activities: [
          {
            id: 'ba1',
            name: 'Arrivo a Barcellona',
            icon: 'plane',
            time: '9:15 AM',
            description:
              "Atterraggio all'aeroporto El Prat. Prendere l'Aerobus fino a Plaza Catalunya.",
            type: 'trasporto',
            from: 'Milano Malpensa',
            to: 'Barcellona El Prat',
          },
          {
            id: 'ba2',
            name: 'Check-in Hotel',
            icon: 'hotel',
            time: '12:00 PM',
            description:
              'Check-in Hotel Catalonia Ramblas. Posizione centrale, colazione inclusa, con piscina sul tetto.',
            type: 'alloggio',
            location: 'Carrer de Pelai, 28',
          },
          {
            id: 'ba3',
            name: 'Passeggiata sulla Rambla',
            icon: 'walk',
            time: '2:00 PM',
            description:
              'Passeggiata lungo La Rambla, visita al mercato della Boqueria e Plaça Reial.',
            type: 'escursione',
            location: 'La Rambla',
          },
          {
            id: 'ba4',
            name: 'Cena tapas',
            icon: 'food',
            time: '8:30 PM',
            description:
              'Cena di tapas in un locale tradizionale del quartiere Gotico. Ordinate il "pa amb tomàquet" e assaggiate diversi tipi di tapas.',
            type: 'ristorazione',
            location: 'El Xampanyet, Carrer de Montcada',
          },
        ],
      },
      {
        day: '2',
        date: '21 Luglio',
        activities: [
          {
            id: 'bb1',
            name: 'Sagrada Familia',
            icon: 'monument',
            time: '10:00 AM',
            description:
              'Visita alla Sagrada Familia. Prenotazione per le 10:15. Durata della visita: circa 1,5 ore. Non perdete la spiegazione dei simbolismi e della luce nelle vetrate.',
            type: 'cultura',
            location: 'Carrer de Mallorca, 401',
          },
          {
            id: 'bb2',
            name: 'Park Güell',
            icon: 'park',
            time: '1:30 PM',
            description:
              "Visita al Park Güell di Gaudí. Prenotazione consigliata per l'area monumentale. Portare acqua e cappello per il sole.",
            type: 'cultura',
            location: "Carrer d'Olot",
          },
          {
            id: 'bb3',
            name: 'Spiaggia Barceloneta',
            icon: 'beach',
            time: '4:00 PM',
            description:
              'Relax sulla spiaggia della Barceloneta. Possibilità di noleggiare lettini e ombrelloni o semplicemente passeggiare sul lungomare.',
            type: 'relax',
            location: 'Platja de la Barceloneta',
          },
          {
            id: 'bb4',
            name: 'Cena sul porto',
            icon: 'food',
            time: '8:00 PM',
            description:
              'Cena con vista sul porto olimpico. Ristorante specializzato in paella e frutti di mare. Prenotazione a nome Lorenzo.',
            type: 'ristorazione',
            location: 'Can Ros, Passeig Marítim',
          },
        ],
      },
      {
        day: '3',
        date: '22 Luglio',
        activities: [
          {
            id: 'bc1',
            name: 'Casa Batlló',
            icon: 'monument',
            time: '9:30 AM',
            description:
              'Visita a Casa Batlló, capolavoro di Gaudí. Audioguida inclusa nel biglietto, consigliata la realtà aumentata.',
            type: 'cultura',
            location: 'Passeig de Gràcia, 43',
          },
          {
            id: 'bc2',
            name: 'Shopping Passeig de Gràcia',
            icon: 'shopping',
            time: '11:30 AM',
            description:
              'Shopping lungo Passeig de Gràcia, una delle vie più eleganti di Barcellona. Negozi di lusso e boutique locali.',
            type: 'shopping',
            location: 'Passeig de Gràcia',
          },
          {
            id: 'bc3',
            name: 'Check-out e partenza',
            icon: 'plane',
            time: '4:00 PM',
            description:
              "Check-out dall'hotel e trasferimento in aeroporto. Prendere l'Aerobus da Plaza Catalunya.",
            type: 'trasporto',
            from: 'Barcellona El Prat',
            to: 'Milano Malpensa',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    destination: 'Parigi, Francia',
    title: 'Paris Mon Amour',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    date: '5 - 10 Agosto',
    startDate: '2024-08-05',
    endDate: '2024-08-10',
    participants: ['Valeria', 'Roberto', 'Alessia'],
    totalExpenses: 1560.4,
    balances: [
      { username: 'Tu', amount: -245.6 },
      { username: 'Valeria', amount: 130.2 },
      { username: 'Roberto', amount: 115.4 },
    ],
    todos: [
      { text: 'Prenotare Eurostar', checked: true },
      { text: 'Prenotare hotel', checked: true },
      { text: 'Biglietti Louvre', checked: false },
      { text: 'Biglietti Torre Eiffel', checked: false },
      { text: 'Controllare orari battelli Seine', checked: false },
    ],
    days: [
      {
        day: '1',
        date: '5 Agosto',
        activities: [
          {
            id: 'pa1',
            name: 'Arrivo Gare de Lyon',
            icon: 'train',
            time: '11:20 AM',
            description:
              'Arrivo alla Gare de Lyon con Eurostar. Prendere la metropolitana linea 1 direzione La Défense.',
            type: 'trasporto',
            from: 'Milano Centrale',
            to: 'Paris Gare de Lyon',
          },
          {
            id: 'pa2',
            name: 'Check-in Hotel',
            icon: 'hotel',
            time: '2:00 PM',
            description:
              "Check-in all'Hotel Le Marais. Boutique hotel nel quartiere storico Le Marais, vicino a Place des Vosges.",
            type: 'alloggio',
            location: 'Rue de Turenne, 75',
          },
          {
            id: 'pa3',
            name: 'Passeggiata Senna',
            icon: 'walk',
            time: '4:00 PM',
            description:
              'Passeggiata lungo la Senna, Notre-Dame (esterno) e Île de la Cité. Visita al famoso mercato dei fiori.',
            type: 'escursione',
            location: 'Île de la Cité',
          },
          {
            id: 'pa4',
            name: 'Cena Saint-Germain',
            icon: 'food',
            time: '8:00 PM',
            description:
              'Cena a Saint-Germain-des-Prés in una tipica brasserie parigina. Provate la zuppa di cipolle e il confit de canard.',
            type: 'ristorazione',
            location: 'Brasserie Lipp, Boulevard Saint-Germain',
          },
        ],
      },
      {
        day: '2',
        date: '6 Agosto',
        activities: [
          {
            id: 'pb1',
            name: 'Louvre',
            icon: 'museum',
            time: '9:00 AM',
            description:
              'Visita al Museo del Louvre. Ingresso prenotato per le 9:30. Non perdere la Gioconda, la Venere di Milo e la Vittoria Alata.',
            type: 'cultura',
            location: 'Rue de Rivoli, 75001',
          },
          {
            id: 'pb2',
            name: 'Pranzo Tuileries',
            icon: 'food',
            time: '1:00 PM',
            description:
              'Pranzo nei giardini delle Tuileries. Possibilità di picnic o pranzo in uno dei caffè del giardino.',
            type: 'ristorazione',
            location: 'Jardin des Tuileries',
          },
          {
            id: 'pb3',
            name: 'Champs-Élysées',
            icon: 'walk',
            time: '3:00 PM',
            description:
              "Passeggiata lungo gli Champs-Élysées fino all'Arco di Trionfo. Possibilità di salire sulla terrazza per una vista panoramica (biglietto extra).",
            type: 'escursione',
            location: 'Avenue des Champs-Élysées',
          },
        ],
      },
      {
        day: '3',
        date: '7 Agosto',
        activities: [
          {
            id: 'pc1',
            name: 'Torre Eiffel',
            icon: 'monument',
            time: '10:00 AM',
            description:
              'Visita alla Torre Eiffel. Biglietti prenotati per salire fino al secondo piano. Opzione di salire a piedi fino al primo piano (circa 300 gradini).',
            type: 'cultura',
            location: 'Champ de Mars, 5 Avenue Anatole France',
          },
          {
            id: 'pc2',
            name: 'Pranzo Rue Cler',
            icon: 'food',
            time: '12:30 PM',
            description:
              'Pranzo nel quartiere di Rue Cler, una delle vie gastronomiche più famose di Parigi. Negozi di formaggi, salumi e panetterie.',
            type: 'ristorazione',
            location: 'Rue Cler',
          },
          {
            id: 'pc3',
            name: "Museo d'Orsay",
            icon: 'museum',
            time: '2:30 PM',
            description:
              "Visita al Museo d'Orsay, con la più grande collezione di opere impressioniste al mondo. Da vedere le opere di Monet, Renoir e Van Gogh.",
            type: 'cultura',
            location: "1 Rue de la Légion d'Honneur",
          },
          {
            id: 'pc4',
            name: 'Crociera sulla Senna',
            icon: 'boat',
            time: '7:00 PM',
            description:
              "Crociera serale sulla Senna. Durata: 1 ora. Partenza dal Pont de l'Alma. Vedrete i principali monumenti illuminati.",
            type: 'escursione',
            location: "Pont de l'Alma",
          },
        ],
      },
    ],
  },
];

// Export a function to get a trip by ID
export const getTripById = (id: string): TripDetails | undefined => {
  return dummyTrips.find((trip) => trip.id === id);
};

// Export default trip for testing
export const defaultTrip = dummyTrips[0];
