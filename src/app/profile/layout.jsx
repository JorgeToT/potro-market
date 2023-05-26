import Navbar from "@/fragments/Navbar";

export default function HomeLayout({ children }) {
  return (
    <section className="min-h-screen">
      <Navbar />
      <main className="p-8">{children}</main>
      <footer></footer>
    </section>
  );
}
