
async function fetchData(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API_DATA environment variable is not defined");
  }
  const res = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const jsonData = await res.json();
  return jsonData as Post[];
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface Env {
  API_HOST: string;
}


export default async function Home() {

    const currentDate = new Date().toUTCString();
    const greeting = process.env.NEXT_PUBLIC_GREETING || "Hello, SSR Component!";
    const greeting2 = process.env.NEXT_PUBLIC_API_URL || "Hello, SSR Component!";
    
    const data = await fetchData();

    return (
      <div>
        <h1>{greeting}</h1>
        <h1>{greeting2}</h1>
        <p>
          This component is server-side rendered (SSR) and displays the current
          date: 123
        </p>
        <p>{currentDate}</p>
        <h2>Data Fetching Example (Server Component)</h2>
        <ul>
          {data.map((item: Post) => (
            <div style={{ marginBottom: "20px" }} key={item.id}>
              {" "}
              <b>
                {item.id}. {item.title}
              </b>
              <p>{item.body}</p>
            </div>
          ))}
        </ul>
      </div>
    );
}
