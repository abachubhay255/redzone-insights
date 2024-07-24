import { SayHelloDocument } from "./graphql/types-and-documents";
import { NO_SERVER_CACHE_HEADER, useGraphQL } from "./graphql/useGraphQL";

export function Home() {
  const { data, isLoading } = useGraphQL(SayHelloDocument, { message: "World!" }, NO_SERVER_CACHE_HEADER);
  console.log(data, isLoading);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
