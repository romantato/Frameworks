export function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    home: (
      <>
        <path d="M4 10.5 12 4l8 6.5" />
        <path d="M6.5 9.8V20h11V9.8" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="2.4" />
        <path d="M4.8 18.2c.6-2.4 2.3-3.6 4.2-3.6s3.6 1.2 4.2 3.6" />
        <circle cx="16.2" cy="8.6" r="1.8" />
        <path d="M15.2 14.6c1.5.2 2.8 1.1 3.4 2.8" />
      </>
    ),
    truck: (
      <>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7" />
        <circle cx="7" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </>
    ),
    layers: (
      <>
        <path d="M12 4 4 8l8 4 8-4-8-4Z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 16 8 4 8-4" />
      </>
    ),
    cart: (
      <>
        <circle cx="9" cy="19" r="1.3" />
        <circle cx="17" cy="19" r="1.3" />
        <path d="M3 5h2.2l1.6 9.2h10.6l1.8-6.6H7" />
      </>
    ),
    clipboard: (
      <>
        <rect x="6" y="4.5" width="12" height="15" rx="2" />
        <path d="M9 4.5h6v2H9z" />
        <path d="M9 11h6M9 14.5h4" />
      </>
    ),
    card: (
      <>
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <path d="M3.5 10h17" />
      </>
    ),
    drop: (
      <>
        <path d="M12 3.5s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10Z" />
      </>
    ),
    bottle: (
      <>
        <path d="M10 3h4" />
        <path d="M11 3v3.2L8.5 9.2A3 3 0 0 0 8 11v8.2A1.8 1.8 0 0 0 9.8 21h4.4a1.8 1.8 0 0 0 1.8-1.8V11a3 3 0 0 0-.5-1.8L13 6.2V3" />
      </>
    ),
    logout: (
      <>
        <path d="M10 7V5.5A1.5 1.5 0 0 1 11.5 4h7A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 10 18.5V17" />
        <path d="M4 12h10" />
        <path d="m11 9 3 3-3 3" />
      </>
    ),
    chevron: <path d="m9 6 6 6-6 6" />,
    user: (
      <>
        <circle cx="12" cy="9" r="3" />
        <path d="M6.5 19c.8-2.8 2.8-4 5.5-4s4.7 1.2 5.5 4" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
