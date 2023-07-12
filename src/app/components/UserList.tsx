"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { fetchUsers } from "../store/users";
import UserCard from "./UserCard";
import LoadButton from "./LoadButton";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, maxPage } = useSelector((state: RootState) => state.users);

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const nextPage = () => {
    setCurrentPage((prevState) => (prevState += 1));
  };

  const usersList = users.map((user) => {
    const { id, email, first_name, last_name, avatar } = user;

    return (
      <UserCard
        key={id}
        id={id}
        email={email}
        first_name={first_name}
        last_name={last_name}
        avatar={avatar}
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center ">{usersList}</div>
      <LoadButton nextPage={nextPage} disabled={currentPage >= maxPage} />
    </div>
  );
};

export default UserList;
