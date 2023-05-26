import Navbar from "@/fragments/Navbar";
import Sidebar from "@/fragments/Sidebar";

export default function HomeLayout({ children }) {
  return (
    <section className="min-h-screen">
      <Navbar />
      <main className="flex flex-row min-h-screen">
        <Sidebar />
        {children}
      </main>
      <footer></footer>
    </section>
  );
}
