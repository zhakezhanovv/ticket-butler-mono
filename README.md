# ticket-butler-mono

## Install dependencies

```sh
npm install
```

## Launch the WhatsApp bot

```sh
npm run prod:bot
```

## Launch the API server

- To launch the API server locally, use:

```sh
npm run prod:api
```

- To launch the API server in a container, use:

```sh
docker-compose up -d
```

## API

```sh
 localhost:8080/api/tickets
```

- To get the whole list of tickets, use GET method.

- To insert a ticket to the data.json file, use PUT method and input into a form-data: title, fromNumber, description(optional) and file(optional).

## How to use the service

1. After launching both the API server and the bot, scan the QR via WhatsApp mobile in the terminal where you launched the bot.

2. Receive messages to the account that the QR code has scanned from. (Somebody has to text a person who scanned the QR code).

3. Test the service with the following methods:

- Send a single text message to the account. Expected output will be:

```json
[
  {
    "createdAt": "2023-06-06T02:20:17.054Z",
    "tel": "77057017526",
    "msg": "Не хочу брать😂"
  }
]
```

- Send a message to the account with 2 paragraphs (Title is the 1st line, description is the 2nd line). Expected output will be:

```json
[
  {
    "createdAt": "2023-06-06T02:20:17.054Z",
    "tel": "77057017526",
    "msg": "Не хочу брать😂",
    "description": "Test description"
  }
]
```

- Send a message to the account with 2 paragraphs (Title is the 1st line, description is the 2nd line) and attach a document. The upload files are stored in /uploads. Expected output will be:

```json
[
  {
    "createdAt": "2023-06-06T02:44:59.367Z",
    "tel": "85268576166",
    "msg": "Tyf",
    "description": "Test description",
    "fileUrl": "uploads/Ali Zhakezhanov.pdf"
  }
]
```

- Send a message with no text. Expected output will be: "Invaid ticket".
