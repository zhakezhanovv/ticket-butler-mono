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

- To insert a ticket to the data.json file, use POST method and input into a form-data: title, fromNumber, description(optional) and file(optional).

## How to use the service

1. After launching both the API server and the bot, scan the QR via WhatsApp mobile in the terminal where you launched the bot.

2. Receive messages to the account that the QR code has scanned from. (Somebody has to text a person who scanned the QR code).

3. Test the service with the following methods and check output in data.json file:

In order to correctly create a ticket, you need to use "#ticket" text at the beginning of the message. Then the next line should start with "Title:" (i.e. Title: Fix the bathroom). Then in order to add a description, you need to start the next line with "Description:" (i.e. Description: It does not work properly) and description should be more than 2 words.

- Send a text message to the account:

```
#ticket
Title: test

```

Expected output will be:

```json
[
  {
    "id": "d7a5b4ed-216a-48c0-5dw2-a390ade37aae",
    "createdAt": "2023-06-08T14:39:51.591Z",
    "tel": "85268576166",
    "msg": "test"
  }
]
```

- Send a text message to the account:

```
#ticket
Title: test
Description: the bathroom does not work properly

```

Expected output will be:

```json
[
  {
    "id": "d7a5b4ed-216a-48c0-8dc2-a390ade37abe",
    "createdAt": "2023-06-08T14:39:51.591Z",
    "tel": "85268576166",
    "msg": "test",
    "description": "the bathroom does not work",
    "updatedAt": "2023-06-08T14:40:52.570Z"
  }
]
```

- Send a text message with an image to the account:

```
#ticket
Title: test
Description: the bathroom does not work properly

```

Expected output will be:

```json
[
  {
    "id": "d7a5b4ed-216a-48c0-8dc2-a390ade37abe",
    "createdAt": "2023-06-08T14:39:51.591Z",
    "tel": "85268576166",
    "msg": "test",
    "description": "the bathroom does not work",
    "fileUrl": "uploads/test",
    "updatedAt": "2023-06-08T14:40:52.570Z"
  }
]
```

- Send a message with no title. Expected output will be: "Invaid ticket".

## Troubleshooting

- If you are using a local server, then change the API_URL value from http://0.0.0.0:8080 to http://localhost:8080. The original API_URL value is for launching with a docker container.

- If you want to switch to a different account, then delete the project cache. This will allow you to scan a new QR code from the terminal.

# Assumptions

The endpoint itself is needed to generate a ticket(POST) and fetch a JSON file containing all tickets information. The endpoint requires a ticket information in order to create a ticket. Therefore, the endpoint has to operate with a service that connects WhatsApp client and the API. There is a library called ["whatsapp-web.js"](https://github.com/pedroslopez/whatsapp-web.js) that was used to create a bot which sends requests to the API service. Currently, the service works on a local machine and generates the JSON file locally(data.json). Since it is a test task, the service was deployed locally only. "#ticket" text is used to determine a ticket. If the same ticket with the same title and sender is detected, then the new ticket will override the previous ticket and add an updated date to the database. Further development might include adding a database and deployment on a cloud server. After creating a ticket, please check the data.json file to see the output.
