import Footer from "../../components/Footer";
import Divider from "../../components/Divider";

export default function Contact() {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <main className="flex-1 max-w-xl mx-auto p-10 text-center">
        <h1
          className="text-4xl font-bold mt-6"
          style={{ color: "#0f1f4f" }}
        >
          Contact Me
        </h1>

        <div className="text-gray-900 mt-4 mb-12 space-y-2">
          {/*Email Link*/}
          <p>
            You can reach me at{" "}
            <a
              href="mailto:tey.mingchuan@yahoo.com.sg"
              className="text-blue-600 hover:underline"
            >
              tey.mingchuan@yahoo.com.sg
            </a>
          </p>
          {/*LinkedIn Link*/}
          <p>
            Or connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/mingchuantey/?originalSubdomain=sg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>


        <form
          action="https://formspree.io/f/yourformid"
          method="POST"
          className="space-y-4 text-left"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border border-gray-400 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border border-gray-400 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full border border-gray-400 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </form>
      </main>

      {/* Divider */}
      <Divider/>

      {/* Footer */}
      <Footer />
    </div>
  );
}
