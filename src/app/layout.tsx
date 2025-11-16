import type { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import './globals.css';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
});

export const metadata: Metadata = {
  title: 'Once Upon a Time - Game Lobby',
  description: 'Join an existing story or create your own.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${epilogue.variable} font-display bg-background-light dark:bg-background-dark`}
      >
        {children}
      </body>
    </html>
  );
}
