import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import userApi from "../../api/userApi";

function Dashboard(props) {
  const [userList, setUserList] = useState([]);
  const [paginationList, setPaginationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const history = useHistory();
  const perPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) history.push("/login");
    const fetchUserList = async () => {
      try {
        const response = await userApi.getAll();
        setUserList(response);
        setPaginationList(response.slice(0, perPage));
        setTotalPage(Math.ceil(response.length / perPage));
      } catch (error) {
        console.log("Failed, " + error);
      }
    };
    fetchUserList();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setPaginationList([
      ...userList.slice(perPage * (newPage - 1), perPage * newPage),
    ]);
  };

  return (
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Users list table</h4>
          <div class="mt-3 ml-auto text-right">
            <button
              onClick={logout}
              class="btn btn-primary btn-md font-weight-medium auth-form-btn"
            >
              LOG OUT
            </button>
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {paginationList?.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td class="py-1">
                      <img src={user.avatar} alt="" />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="mt-3 align-items-center">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              class="btn btn-primary btn-rounded btn-md font-weight-medium auth-form-btn mr-2"
            >
              Prev
            </button>
            <button
              disabled={currentPage >= totalPage}
              onClick={() => handlePageChange(currentPage + 1)}
              class="btn btn-primary btn-rounded btn-md font-weight-medium auth-form-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
