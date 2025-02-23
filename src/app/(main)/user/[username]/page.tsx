export default async function User({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return (
    <div>
      <h1>User</h1>
    </div>
  );
}
