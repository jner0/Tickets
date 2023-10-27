const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { hoy, tickets, ultimos4, ultimo } = require("../db/data.json");
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);

    this.tickets.push(ticket);

    this.guardarDB();
    return "Ticket" + ticket.numero;
  }
}

module.exports = TicketControl;
