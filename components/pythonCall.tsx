async function getData() {
    const res = await fetch('http://localhost:8000/call_python_script', {
        method: 'POST',
    });

    return res.json();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  }
   
  export default async function Page() {
    const data = await getData()
   
    return <main></main>
  }