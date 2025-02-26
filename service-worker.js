self.addEventListener('install', (event) => {
    console.log('Service Worker installé (sans cache).');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activé.');
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response(
                `<html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Connexion requise</title>
                        <style>
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                background-color: #121212;
                                color: #ffffff;
                                font-family: Arial, sans-serif;
                                text-align: center;
                                padding: 20px;
                            }
                            h1 {
                                font-size: 24px;
                                margin-bottom: 10px;
                            }
                            p {
                                font-size: 18px;
                            }
                        </style>
                    </head>
                    <body>
                        <div>
                            <h1>Connexion Internet requise</h1>
                            <p>Veuillez vérifier votre connexion et réessayer.</p>
                        </div>
                    </body>
                </html>`,
                { headers: { 'Content-Type': 'text/html; charset=UTF-8' } }
            );
        })
    );
});