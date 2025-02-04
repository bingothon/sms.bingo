module.exports = {
    purge: {
        content: ['./pages/**/*.tsx', './components/**/*.tsx'],
        options: {
            safelist: [/.*bingosync.*/ /*fr-qc*/],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: theme => ({
                'tile-background': "url('/SA2_background.png')",
                'fr-qc': "url('/fr-qc.svg')",
                'purple-gradient': 'linear-gradient(90deg, rgba(26, 26, 98, 0.87) 3%, rgba(36,0,15,0.8799720571822479) 61%)',
                'blue-gradient': 'linear-gradient(90deg, rgba(9,9,121,0.8659664549413515) 3%, rgba(36,0,15,0.8799720571822479) 61%)',
                'red-gradient': 'linear-gradient(109deg, rgba(64,4,1,0.6875700280112045) 0%, rgba(63,4,0,0.8799720571822479) 50%, rgba(184,185,201,0.4875700280112045) 100%);',
            }),
            colors: {
                'bingosync-orange': '#FF9C12',
                'bingosync-red': '#FF4944',
                'bingosync-blue': '#409CFF',
                'bingosync-green': '#31D814',
                'bingosync-purple': '#822DBF',
                'bingosync-navy': '#0D48B5',
                'bingosync-teal': '#419695',
                'bingosync-brown': '#AB5C23',
                'bingosync-pink': '#ED86AA',
                'bingosync-yellow': '#D8D014',
                'sa2-red': '#59182a',
                'sa2-blue': '#08023c',
                'sa2-purple': '#cc19f740',
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#fff',
                        h1: {
                            color: '#fff',
                        },
                        h2: {
                            color: '#fff',
                        },
                        h3: {
                            color: '#fff',
                        },
                        th: {
                            color: '#fff',
                        },
                        strong: {
                            color: '#fff',
                        },
                        a: {
                            color: '#fff',
                        },
                    },
                },
            },
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
