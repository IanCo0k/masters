export default function Hero({ text }) {
  return (
    <div
      className="hero"
      style={{
        backgroundImage:
          "url(https://www.golfdigest.com/content/dam/images/golfdigest/fullset/2021/4/12-hole-november-2020-masters.jpg)",
      }}
    >
      <div className="hero-overlay  bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg p-3 md:p-8">
          <h1 className="mb-5 text-white text-4xl md:text-5xl font-bold">{text}</h1>
        </div>
      </div>
    </div>
  );
}
