import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="40" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="420" rx="10" ry="10" width="100" height="40" />
    <rect x="140" y="420" rx="25" ry="25" width="140" height="45" />
  </ContentLoader>
)
