const config = {
    boroughNames: [
        { full: 'Brooklyn', abbr: 'BKLYN' },
        { full: 'Bronx', abbr: 'BRONX' },
        { full: 'Manhattan', abbr: 'MANHTN' },
        { full: 'Staten Island', abbr: 'STNISL' },
        { full: 'Queens', abbr: 'QUEENS' },
    ],

    avgGrades: [
        'A',
        'B',
        'C',
        'D',
        'F'
    ],

    searchMethods: [
        'borough', 
        'name', 
        'avg_rating', 
        'cuisine_type'
    ],
};

export default config;