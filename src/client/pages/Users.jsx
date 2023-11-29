import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footers/Footer";
import Header from "../components/header/Header";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(function () {
    const getAllUsers = async () => {
      const response = await fetch("/api/v1/users/all", {
        method: "GET",
      });
      const result = await response.json();
      setUsers(result);
      if (response.status !== 200) {
        throw Error(result.message);
      }
    };
    getAllUsers();
  }, []);
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="w-full flex flex-auto flex-col items-center">
        <div className="w-[980px] mt-8">
          <h1 className="text-2xl font-bold mb-4">Users</h1>
          <table className="w-[980px] border-none">
            <thead>
              <tr>
                <th align="start" className="font-bold border-none">
                  Id
                </th>
                <th align="start" className="font-bold border-none">
                  Email
                </th>
                <th align="start" className="font-bold border-none">
                  Role
                </th>
                <th align="start" className="font-bold border-none">
                  Documents
                </th>
                <th align="start" className="font-bold border-none">
                  Applications
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id} className="h-14 border-b-2">
                    <td className="border-none">{user.id}</td>
                    <td className="border-none">{user.email}</td>
                    <td className="border-none">{user.role}</td>

                    <td className="border-none underline">
                      <Link to="">Documents</Link>
                    </td>

                    <td className="border-none underline">
                      <Link to="">Applications</Link>
                    </td>

                    <td align="end" className="border-none">
                      <button className="bg-black text-white px-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Users;
