# Work with QR Codes for Web

## Topics

- Generate a QR Code
- Scan a QR Code

## Production Packages

```sh
npm install @cmdnio/react-qr-reader react-qr-code
```

- https://github.com/cmdnio/react-qr-reader
  - https://github.com/JodusNodus/react-qr-reader/pull/361
- https://github.com/rosskhanas/react-qr-code

## Development Packages

We need to use `HTTPS` to access the camera on mobile devices.

Use this package to generate a self-signed certificate:

```sh
npm install --save-dev vite-plugin-mkcert
```

You need to apply the configuration described in:

- https://github.com/liuweiGL/vite-plugin-mkcert

## Start the Development Server and Access the Web Application

You need to add the `--host` option to the command line to start the development server, so that your web application will be served in your local network.

```sh
npx vite --host
```

You will get a couple of message boxes to allow the self signed certificate to be used.

Vite will show something like:

```plain
> vite --host

  VITE v5.4.9  ready in 184 ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: https://192.168.178.74:5173/
```

Use `https://192.168.178.74:5173/` to access your web application from other devices in your local network.

Use the documentation of the packages to implement the features you need.
