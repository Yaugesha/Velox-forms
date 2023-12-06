import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-8 px-6 mt-6">
      <div className="container mx-auto flex justify-between items-center">
        <nav className="space-x-4">
          <ul className="flex gap-6">
            <li className="hover:text-gray-300">
              <Link to="/">Main</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/">About</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/">Documentation</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/documents">Documents</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-sm">Velox-forms</p>
          <p className="text-sm">Adress: P.Brovki 4, Minsk, Belarus</p>
          <p className="text-sm">Phone: +375 (44) 456-78-90</p>
          <p className="text-sm">Email: velox-forms@example.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
