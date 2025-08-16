import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <main className="max-w-xl mx-auto p-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
        <p className="text-gray-600 mb-6">You can reach me at <a href="mailto:youremail@example.com" className="text-blue-600">youremail@example.com</a></p>
        <form action="https://formspree.io/f/yourformid" method="POST" className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" className="w-full border p-3 rounded" required />
          <input type="email" name="email" placeholder="Your Email" className="w-full border p-3 rounded" required />
          <textarea name="message" placeholder="Your Message" className="w-full border p-3 rounded" rows={5} required></textarea>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
