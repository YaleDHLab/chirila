# Chirila

> A database of Australian languages

## Dependencies

To run this application, you'll need to install Node.js on your system.

## Quickstart

```bash
git clone https://github.com/YaleDHLab/chirila
cd chirila
npm install
npm run production
```

Visit app at http://localhost:8080

To set up IP forwarding such that requests for port 80 will be sent to 8080, run:

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
```

## Issues

Report any issues to @abhinayar
