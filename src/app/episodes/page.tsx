export default function Episodes() {
  const longText = Array(1000)
    .fill("This is a long text for testing. ")
    .join("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Episodes</h1>
      <p>{longText}</p>
    </div>
  );
}

  