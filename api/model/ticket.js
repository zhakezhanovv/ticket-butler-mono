const fs = require("fs");
class Ticket {
  static #dataPath = "data.json";
  static #dataType = "utf8";

  constructor(title, fromNumber, description, filePath, createdAt) {
    this.createdAt = new Date(Date.now()).toISOString();
    this.tel = fromNumber;
    this.msg = title;
    this.description = description;
    this.fileUrl = filePath;
  }

  static isValid(title, fromNumber, description, filePath) {
    if (!title || title == "" || !fromNumber || fromNumber == "") {
      return false;
    }

    return true;
  }

  static getMany() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.#dataPath, this.#dataType, (err, data) => {
        if (err) {
          reject(err);
        }

        try {
          const tickets = JSON.parse(data);
          resolve(tickets);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  static addMany(tickets) {
    return new Promise((resolve, reject) => {
      try {
        const ticketsJson = JSON.stringify(tickets);

        fs.writeFile(this.#dataPath, ticketsJson, (err) => {
          if (err) {
            reject(err);
          }

          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Ticket;
