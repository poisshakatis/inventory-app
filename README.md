This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Troubleshooting

If `npm` gives script execution error

Windows PowerShell
```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Install modules

```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## TODO

- Swap yup for zod (typescript-first, should be possible scenario: not required but if field not empty has max length)