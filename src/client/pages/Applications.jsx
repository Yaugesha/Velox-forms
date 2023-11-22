import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";

function Applications() {
  const [requests, setRequests] = useState([]);
  const [sortedRequests, setSortedRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    // Загрузка данных о заявках с сервера
    // Пример запроса:
    // fetch('/api/v1/admin/requests')
    //   .then(response => response.json())
    //   .then(data => setRequests(data))
    //   .catch(error => console.error('Error fetching requests:', error));

    // Вместо этого используйте ваш реальный запрос к API
    const sampleRequests = [
      {
        userId: 1,
        email: "user1@example.com",
        submissionDate: "2023-11-01",
        status: "Pending",
        category: "Category 1",
        title: "Request 1",
        comment: "Comment 1",
        fileLink: "https://example.com/file1.pdf",
      },
      {
        userId: 2,
        email: "user2@example.com",
        submissionDate: "2023-11-02",
        status: "Approved",
        category: "Category 2",
        title: "Request 2",
        comment: "Comment 2",
        fileLink: "https://example.com/file2.pdf",
      },
      // Другие заявки...
    ];

    setRequests(sampleRequests);
    setSortedRequests(sampleRequests);
  }, []);
  useEffect(() => {
    // Сортировка заявок
    const sorted = [...requests].sort((a, b) => {
      const key = sortOrder === "asc" ? "submissionDate" : "-submissionDate";
      return new Date(a[key]) - new Date(b[key]);
    });
    setSortedRequests(sorted);
  }, [requests, sortOrder]);

  useEffect(() => {
    // Поиск заявок
    const filtered = requests.filter((request) =>
      Object.values(request)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setSortedRequests(filtered);
  }, [requests, searchQuery]);

  return (
    <>
      <Header />
      <div className="container mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-4">Applications Requests</h1>
        <div className="mb-4 flex items-center"></div>
        <table className="w-[980px] border-none">
          <thead>
            <tr>
              <th align="start" className="font-bold border-none">
                User ID
              </th>
              <th align="start" className="font-bold border-none">
                Submission Date
              </th>
              <th align="start" className="font-bold border-none">
                Status
              </th>
              <th align="start" className="font-bold border-none">
                Category
              </th>
              <th align="start" className="font-bold border-none">
                Title
              </th>
              <th align="start" className="font-bold border-none">
                Comment
              </th>
              <th align="start" className="font-bold border-none">
                File Link
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request) => (
              <tr
                key={request.submissionDate}
                className="h-14 border-b-2 cursor-pointer"
              >
                <td className=" border-none">{request.userId}</td>
                <td className=" border-none">{request.submissionDate}</td>
                <td className=" border-none">{request.status}</td>
                <td className=" border-none">{request.category}</td>
                <td className=" border-none">{request.title}</td>
                <td className=" border-none">{request.comment}</td>
                <td className=" border-none">{request.fileLink}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Applications;
