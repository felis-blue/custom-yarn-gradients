const colors = new Map([
['005',{name: 'weiß', color_number: '005', hex: '#F8F8F9', text_color: 'dark', hue_group: '0'}],
['315',{name: 'hellgrau', color_number: '315', hex: '#E1E2E3', text_color: 'dark', hue_group: '0'}],
['1009',{name: 'hellgrau-toe', color_number: '1009', hex: '#D4DEE4', text_color: 'dark', hue_group: '0'}],
['3212',{name: 'asche-3k', color_number: '3212', hex: '#C7D8DC', text_color: 'dark', hue_group: '0'}],
['450',{name: 'stahl', color_number: '450', hex: '#CBD1DE', text_color: 'dark', hue_group: '0'}],
['620',{name: 'beton', color_number: '620', hex: '#CCC9C6', text_color: 'dark', hue_group: '0'}],
['300',{name: 'silber-mel', color_number: '300', hex: '#B3BCBC', text_color: 'dark', hue_group: '0'}],
['695',{name: 'stone', color_number: '695', hex: '#B1BCBA', text_color: 'dark', hue_group: '0'}],
['010',{name: 'blei-mel', color_number: '010', hex: '#ABB3B6', text_color: 'dark', hue_group: '0'}],
['400',{name: 'kies-mel', color_number: '400', hex: '#BAB0AC', text_color: 'dark', hue_group: '0'}],
['015',{name: 'zinn', color_number: '015', hex: '#8F9094', text_color: 'light', hue_group: '0'}],
['170',{name: 'mittelgrau', color_number: '170', hex: '#768186', text_color: 'light', hue_group: '0'}],
['355',{name: 'grau-mel', color_number: '355', hex: '#6A7075', text_color: 'light', hue_group: '0'}],
['1003',{name: 'khaki-toe', color_number: '1003', hex: '#646D5C', text_color: 'light', hue_group: '0'}],
['435',{name: 'khaki', color_number: '435', hex: '#646D56', text_color: 'light', hue_group: '0'}],
['625',{name: 'asche-mel', color_number: '625', hex: '#444745', text_color: 'light', hue_group: '0'}],
['305',{name: 'anthrazit-mel', color_number: '305', hex: '#3F4447', text_color: 'light', hue_group: '0'}],
['175',{name: 'anthrazit', color_number: '175', hex: '#353B37', text_color: 'light', hue_group: '0'}],
['520',{name: 'graphit-mel', color_number: '520', hex: '#2C3032', text_color: 'light', hue_group: '0'}],
['070',{name: 'schwarz', color_number: '070', hex: '#222324', text_color: 'light', hue_group: '0'}],
['340',{name: 'tiefschwarz', color_number: '340', hex: '#1D2022', text_color: 'light', hue_group: '0'}],
['310',{name: 'wollweiß', color_number: '310', hex: '#F9F7F1', text_color: 'dark', hue_group: '1'}],
['110',{name: 'creme', color_number: '110', hex: '#F5F0E5', text_color: 'dark', hue_group: '1'}],
['115',{name: 'hellbeige', color_number: '115', hex: '#E5DFD4', text_color: 'dark', hue_group: '1'}],
['495',{name: 'alabaster', color_number: '495', hex: '#D6C8BA', text_color: 'dark', hue_group: '1'}],
['120',{name: 'beige', color_number: '120', hex: '#DCC9B2', text_color: 'dark', hue_group: '1'}],
['1011',{name: 'beige-toe', color_number: '1011', hex: '#D6C49D', text_color: 'dark', hue_group: '1'}],
['155',{name: 'schlamm', color_number: '155', hex: '#A38C7A', text_color: 'light', hue_group: '1'}],
['790',{name: 'lehm', color_number: '790', hex: '#AE8F73', text_color: 'light', hue_group: '1'}],
['125',{name: 'mocca', color_number: '125', hex: '#B47450', text_color: 'light', hue_group: '1'}],
['360',{name: 'taupe', color_number: '360', hex: '#655D54', text_color: 'light', hue_group: '1'}],
['525',{name: 'braun-mel', color_number: '525', hex: '#5E4F4B', text_color: 'light', hue_group: '1'}],
['615',{name: 'nuss', color_number: '615', hex: '#6D4633', text_color: 'light', hue_group: '1'}],
['135',{name: 'braun', color_number: '135', hex: '#4B3027', text_color: 'light', hue_group: '1'}],
['140',{name: 'schokolade', color_number: '140', hex: '#2A2624', text_color: 'light', hue_group: '1'}],
['185',{name: 'rose', color_number: '185', hex: '#FBD5D9', text_color: 'dark', hue_group: '2'}],
['700',{name: 'babe', color_number: '700', hex: '#F9B9BE', text_color: 'dark', hue_group: '2'}],
['1015',{name: 'koralle-toe', color_number: '1015', hex: '#EA8B8F', text_color: 'dark', hue_group: '2'}],
['430',{name: 'lachs', color_number: '430', hex: '#F07278', text_color: 'dark', hue_group: '2'}],
['1022',{name: 'coralle-toe', color_number: '1022', hex: '#E76E7C', text_color: 'light', hue_group: '2'}],
['500',{name: 'rost', color_number: '500', hex: '#D95851', text_color: 'light', hue_group: '2'}],
['730',{name: 'koralle', color_number: '730', hex: '#EA4A4A', text_color: 'light', hue_group: '2'}],
['190',{name: 'hummer', color_number: '190', hex: '#D94A5D', text_color: 'light', hue_group: '2'}],
['325',{name: 'kirsche', color_number: '325', hex: '#D83B49', text_color: 'light', hue_group: '2'}],
['795',{name: 'mars', color_number: '795', hex: '#DB3941', text_color: 'light', hue_group: '2'}],
['245',{name: 'ziegel', color_number: '245', hex: '#A73B41', text_color: 'light', hue_group: '2'}],
['195',{name: 'rot', color_number: '195', hex: '#B32B3F', text_color: 'light', hue_group: '2'}],
['735',{name: 'salsa', color_number: '735', hex: '#B92130', text_color: 'light', hue_group: '2'}],
['200',{name: 'burgund', color_number: '200', hex: '#92232E', text_color: 'light', hue_group: '2'}],
['205',{name: 'malaga', color_number: '205', hex: '#8E2232', text_color: 'light', hue_group: '2'}],
['685',{name: 'kastanie', color_number: '685', hex: '#7D2B2A', text_color: 'light', hue_group: '2'}],
['560',{name: 'muschel', color_number: '560', hex: '#F5E5D8', text_color: 'dark', hue_group: '3'}],
['650',{name: 'peach', color_number: '650', hex: '#F3D8CE', text_color: 'dark', hue_group: '3'}],
['425',{name: 'quarz', color_number: '425', hex: '#F7B4A1', text_color: 'dark', hue_group: '3'}],
['370',{name: 'mango', color_number: '370', hex: '#F68E5A', text_color: 'dark', hue_group: '3'}],
['460',{name: 'orange', color_number: '460', hex: '#F88520', text_color: 'dark', hue_group: '3'}],
['775',{name: 'neonorange', color_number: '775', hex: '#FE7139', text_color: 'dark', hue_group: '3'}],
['3016',{name: 'mandarine-3k', color_number: '3016', hex: '#F8792A', text_color: 'dark', hue_group: '3'}],
['3019',{name: 'apfelsine-3k', color_number: '3019', hex: '#F15F42', text_color: 'light', hue_group: '3'}],
['240',{name: 'cognac', color_number: '240', hex: '#D76728', text_color: 'light', hue_group: '3'}],
['215',{name: 'vanille', color_number: '215', hex: '#FBF0D1', text_color: 'dark', hue_group: '4'}],
['605',{name: 'jalousie', color_number: '605', hex: '#FFEC80', text_color: 'dark', hue_group: '4'}],
['255',{name: 'gold', color_number: '255', hex: '#F9DF6F', text_color: 'dark', hue_group: '4'}],
['755',{name: 'neongelb', color_number: '755', hex: '#F8FB46', text_color: 'dark', hue_group: '4'}],
['750',{name: 'kiwi', color_number: '750', hex: '#DFE12E', text_color: 'dark', hue_group: '4'}],
['725',{name: 'sonne', color_number: '725', hex: '#FBD640', text_color: 'dark', hue_group: '4'}],
['3179',{name: 'wüste-3k', color_number: '3179', hex: '#D8B961', text_color: 'dark', hue_group: '4'}],
['3010',{name: 'karotte-3k', color_number: '3010', hex: '#FBBC46', text_color: 'dark', hue_group: '4'}],
['690',{name: 'limette', color_number: '690', hex: '#DFCE0D', text_color: 'dark', hue_group: '4'}],
['675',{name: 'kurkuma', color_number: '675', hex: '#F0B625', text_color: 'dark', hue_group: '4'}],
['455',{name: 'curry', color_number: '455', hex: '#D0871B', text_color: 'light', hue_group: '4'}],
['260',{name: 'erbse', color_number: '260', hex: '#E1EEE2', text_color: 'dark', hue_group: '5'}],
['1001',{name: 'l-green-toe', color_number: '1001', hex: '#D8ECD3', text_color: 'dark', hue_group: '5'}],
['3218',{name: 'ölbaum-3k', color_number: '3218', hex: '#C1CFC5', text_color: 'dark', hue_group: '5'}],
['1014',{name: 'hemlock-toe', color_number: '1014', hex: '#A9DCC2', text_color: 'dark', hue_group: '5'}],
['3136',{name: 'gurke-3k', color_number: '3136', hex: '#98E6B1', text_color: 'dark', hue_group: '5'}],
['1010',{name: 'grasgrün-toe', color_number: '1010', hex: '#88DDB0', text_color: 'dark', hue_group: '5'}],
['265',{name: 'blattgrün', color_number: '265', hex: '#C9DA70', text_color: 'dark', hue_group: '5'}],
['1004',{name: 'pistazie-toe', color_number: '1004', hex: '#BBC36E', text_color: 'dark', hue_group: '5'}],
['515',{name: 'apfel', color_number: '515', hex: '#77D15C', text_color: 'dark', hue_group: '5'}],
['390',{name: 'froschgrün', color_number: '390', hex: '#66AC4A', text_color: 'light', hue_group: '5'}],
['465',{name: 'farn', color_number: '465', hex: '#5D9727', text_color: 'light', hue_group: '5'}],
['785',{name: 'waldmeister', color_number: '785', hex: '#009856', text_color: 'light', hue_group: '5'}],
['380',{name: 'absinth', color_number: '380', hex: '#009160', text_color: 'light', hue_group: '5'}],
['3165',{name: 'billard-3k', color_number: '3165', hex: '#26713C', text_color: 'light', hue_group: '5'}],
['1006',{name: 'dunkelgrün-toe', color_number: '1006', hex: '#50573C', text_color: 'light', hue_group: '5'}],
['1008',{name: 'khaki2-toe', color_number: '1008', hex: '#4D4C37', text_color: 'light', hue_group: '5'}],
['580',{name: 'tannengrün', color_number: '580', hex: '#274439', text_color: 'light', hue_group: '5'}],
['025',{name: 'libelle', color_number: '025', hex: '#C2E4EB', text_color: 'dark', hue_group: '6'}],
['550',{name: 'pistazie', color_number: '550', hex: '#BDE7D9', text_color: 'dark', hue_group: '6'}],
['1020',{name: 'meerblau-toe', color_number: '1020', hex: '#B7E4EF', text_color: 'dark', hue_group: '6'}],
['1013',{name: 'türkis2-toe', color_number: '1013', hex: '#95E1EC', text_color: 'dark', hue_group: '6'}],
['645',{name: 'jade', color_number: '645', hex: '#9CCDC9', text_color: 'dark', hue_group: '6'}],
['3123',{name: 'nymphe-3k', color_number: '3123', hex: '#85E1E2', text_color: 'dark', hue_group: '6'}],
['1005',{name: 'türkis-toe', color_number: '1005', hex: '#57DEEE', text_color: 'dark', hue_group: '6'}],
['1023',{name: 'türkis3-toe', color_number: '1023', hex: '#42CFC2', text_color: 'dark', hue_group: '6'}],
['035',{name: 'capri', color_number: '035', hex: '#59C2DB', text_color: 'dark', hue_group: '6'}],
['275',{name: 'riviera', color_number: '275', hex: '#35D1DA', text_color: 'dark', hue_group: '6'}],
['640',{name: 'opal', color_number: '640', hex: '#43B8B2', text_color: 'dark', hue_group: '6'}],
['280',{name: 'oceangrün', color_number: '280', hex: '#389B8E', text_color: 'light', hue_group: '6'}],
['330',{name: 'hellpetrol', color_number: '330', hex: '#4C8FA9', text_color: 'light', hue_group: '6'}],
['3112',{name: 'türkis-3k', color_number: '3112', hex: '#00B3C5', text_color: 'dark', hue_group: '6'}],
['3111',{name: 'lagune-3k', color_number: '3111', hex: '#00ACB3', text_color: 'light', hue_group: '6'}],
['1012',{name: 'petrol-toe', color_number: '1012', hex: '#2F8586', text_color: 'light', hue_group: '6'}],
['780',{name: 'karibik', color_number: '780', hex: '#0A99CA', text_color: 'light', hue_group: '6'}],
['670',{name: 'smaragd', color_number: '670', hex: '#317166', text_color: 'light', hue_group: '6'}],
['3116',{name: 'dschungel-3k', color_number: '3116', hex: '#007784', text_color: 'light', hue_group: '6'}],
['020',{name: 'hellblau', color_number: '020', hex: '#D6E8F0', text_color: 'dark', hue_group: '7'}],
['365',{name: 'aqua', color_number: '365', hex: '#B5DBF0', text_color: 'dark', hue_group: '7'}],
['1018',{name: 'hellblau-toe', color_number: '1018', hex: '#A6C6D7', text_color: 'dark', hue_group: '7'}],
['710',{name: 'cloud', color_number: '710', hex: '#9DBDDD', text_color: 'dark', hue_group: '7'}],
['3225',{name: 'maulwurf-3k', color_number: '3225', hex: '#83A4B2', text_color: 'dark', hue_group: '7'}],
['1002',{name: 'blau-toe', color_number: '1002', hex: '#65ADE0', text_color: 'dark', hue_group: '7'}],
['395',{name: 'jeans-mel', color_number: '395', hex: '#709AC8', text_color: 'light', hue_group: '7'}],
['045',{name: 'taubenblau', color_number: '045', hex: '#6C92B2', text_color: 'light', hue_group: '7'}],
['575',{name: 'ciel', color_number: '575', hex: '#5C99D4', text_color: 'light', hue_group: '7'}],
['040',{name: 'ultramarine', color_number: '040', hex: '#4B85CC', text_color: 'light', hue_group: '7'}],
['375',{name: 'granit', color_number: '375', hex: '#526371', text_color: 'light', hue_group: '7'}],
['635',{name: 'azur', color_number: '635', hex: '#297BCB', text_color: 'light', hue_group: '7'}],
['590',{name: 'indigo-mel', color_number: '590', hex: '#426088', text_color: 'light', hue_group: '7'}],
['570',{name: 'preuss-blau', color_number: '570', hex: '#405D7A', text_color: 'light', hue_group: '7'}],
['480',{name: 'seablue', color_number: '480', hex: '#067CC4', text_color: 'light', hue_group: '7'}],
['630',{name: 'denim-mel', color_number: '630', hex: '#3F4856', text_color: 'light', hue_group: '7'}],
['760',{name: 'lapis', color_number: '760', hex: '#364FB3', text_color: 'light', hue_group: '7'}],
['335',{name: 'petrol', color_number: '335', hex: '#2B4A5C', text_color: 'light', hue_group: '7'}],
['565',{name: 'midnightblau', color_number: '565', hex: '#29426D', text_color: 'light', hue_group: '7'}],
['440',{name: 'enzian', color_number: '440', hex: '#2344AE', text_color: 'light', hue_group: '7'}],
['050',{name: 'atlantik', color_number: '050', hex: '#283C70', text_color: 'light', hue_group: '7'}],
['530',{name: 'navy-mel', color_number: '530', hex: '#2D323C', text_color: 'light', hue_group: '7'}],
['055',{name: 'royal', color_number: '055', hex: '#262E4D', text_color: 'light', hue_group: '7'}],
['060',{name: 'schatten', color_number: '060', hex: '#222735', text_color: 'light', hue_group: '7'}],
['345',{name: 'marine', color_number: '345', hex: '#212429', text_color: 'light', hue_group: '7'}],
['065',{name: 'navy', color_number: '065', hex: '#1D2026', text_color: 'light', hue_group: '7'}],
['075',{name: 'lavendel', color_number: '075', hex: '#D7CEE2', text_color: 'dark', hue_group: '8'}],
['800',{name: 'magic', color_number: '800', hex: '#CBC9EB', text_color: 'dark', hue_group: '8'}],
['705',{name: 'krokus', color_number: '705', hex: '#C5C1E3', text_color: 'dark', hue_group: '8'}],
['405',{name: 'erika', color_number: '405', hex: '#D0B9D5', text_color: 'dark', hue_group: '8'}],
['1007',{name: 'flieder-toe', color_number: '1007', hex: '#B07FC6', text_color: 'light', hue_group: '8'}],
['415',{name: 'violett', color_number: '415', hex: '#886782', text_color: 'light', hue_group: '8'}],
['660',{name: 'oleander', color_number: '660', hex: '#994C94', text_color: 'light', hue_group: '8'}],
['740',{name: 'distel', color_number: '740', hex: '#7B3987', text_color: 'light', hue_group: '8'}],
['3077',{name: 'turmalin-3k', color_number: '3077', hex: '#523F9F', text_color: 'light', hue_group: '8'}],
['3066',{name: 'bischof-3k', color_number: '3066', hex: '#692D88', text_color: 'light', hue_group: '8'}],
['745',{name: 'aubergine', color_number: '745', hex: '#4A3A6E', text_color: 'light', hue_group: '8'}],
['770',{name: 'ultraviolett', color_number: '770', hex: '#403BA4', text_color: 'light', hue_group: '8'}],
['095',{name: 'lila', color_number: '095', hex: '#3D2D53', text_color: 'light', hue_group: '8'}],
['490',{name: 'pastellrosa', color_number: '490', hex: '#FDECF1', text_color: 'dark', hue_group: '9'}],
['350',{name: 'babyrosa', color_number: '350', hex: '#FCDEE9', text_color: 'dark', hue_group: '9'}],
['1019',{name: 'rose-toe', color_number: '1019', hex: '#FAC9DB', text_color: 'dark', hue_group: '9'}],
['585',{name: 'rosa', color_number: '585', hex: '#FBBBD1', text_color: 'dark', hue_group: '9'}],
['555',{name: 'flieder', color_number: '555', hex: '#D7B6C0', text_color: 'dark', hue_group: '9'}],
['445',{name: 'anemone', color_number: '445', hex: '#F2ADC5', text_color: 'dark', hue_group: '9'}],
['085',{name: 'amethyst', color_number: '085', hex: '#D69FC8', text_color: 'dark', hue_group: '9'}],
['420',{name: 'candy', color_number: '420', hex: '#FF9EC3', text_color: 'dark', hue_group: '9'}],
['210',{name: 'fuchsia', color_number: '210', hex: '#E35AA2', text_color: 'light', hue_group: '9'}],
['1016',{name: 'aubergine-toe', color_number: '1016', hex: '#C05DA4', text_color: 'light', hue_group: '9'}],
['765',{name: 'neonpink', color_number: '765', hex: '#EE4BBA', text_color: 'light', hue_group: '9'}],
['3049',{name: 'phlox-3k', color_number: '3049', hex: '#C6587E', text_color: 'light', hue_group: '9'}],
['1017',{name: 'beere-toe', color_number: '1017', hex: '#B153A7', text_color: 'light', hue_group: '9'}],
['320',{name: 'himbeere', color_number: '320', hex: '#C34387', text_color: 'light', hue_group: '9'}],
['610',{name: 'beere', color_number: '610', hex: '#C73F5B', text_color: 'light', hue_group: '9'}],
['715',{name: 'bonbon', color_number: '715', hex: '#C93B61', text_color: 'light', hue_group: '9'}],
['720',{name: 'hotpink', color_number: '720', hex: '#C82F7E', text_color: 'light', hue_group: '9'}],
['655',{name: 'brombeere', color_number: '655', hex: '#7F2451', text_color: 'light', hue_group: '9'}],
['1021',{name: 'aubergine2-toe', color_number: '1021', hex: '#3F2936', text_color: 'light', hue_group: '9'}],
['680',{name: 'vino', color_number: '680', hex: '#47203A', text_color: 'light', hue_group: '9'}],
['470',{name: 'chianti', color_number: '470', hex: '#3C242D', text_color: 'light', hue_group: '9'}],
]); 