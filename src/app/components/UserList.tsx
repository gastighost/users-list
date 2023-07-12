"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { fetchUsers } from "../store/users";

import UserCard from "./UserCard";
import LoadButton from "./LoadButton";
import SearchBar from "./SearchBar";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, maxPage } = useSelector((state: RootState) => state.users);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const nextPage = () => {
    setCurrentPage((prevState) => (prevState += 1));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const regex = new RegExp(input, "i");

  const finalUsers =
    input === "" ? users : users.filter((user) => regex.test(user.first_name));

  const usersList = finalUsers.map((user) => {
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
    <div className="flex flex-col items-center py-4">
      <SearchBar input={input} onInputChange={onInputChange} />
      <div className="flex flex-wrap justify-center ">{usersList}</div>
      <LoadButton nextPage={nextPage} disabled={currentPage >= maxPage} />
    </div>
  );
};

export default UserList;
