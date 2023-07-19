"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";

import UserCard from "./UserCard";
import LoadButton from "./LoadButton";
import SearchBar from "./SearchBar";
import ApiErrorPopup from "./ApiErrorPopup";

import api from "../common/api";

import { apiBodySchema } from "../types/api";
import { UserType } from "../types/users";

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [input, setInput] = useState<string>("");
  const [badDataModal, setBadDataModal] = useState<boolean>(false);

  const openModal = () => {
    setBadDataModal(true);
  };

  const closeModal = () => {
    setBadDataModal(false);
  };

  const getUsers = useCallback(async (page: number) => {
    try {
      const response = await api.getUsers(page);

      const { data: userData, total_pages } = apiBodySchema.parse(
        response.data
      );

      setUsers((prevState) => [...prevState, ...userData]);
      setMaxPage(total_pages);
      closeModal();
    } catch (error) {
      openModal();
    }
  }, []);

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage, getUsers]);

  const nextPage = () => {
    setCurrentPage((prevState) => (prevState += 1));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const regex = new RegExp(input, "i");

  const finalUsers =
    input === ""
      ? users
      : users.filter(
          (user) =>
            regex.test(user.first_name) ||
            regex.test(user.last_name) ||
            regex.test(`${user.first_name} ${user.last_name}`) ||
            regex.test(user.email)
        );

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
      <div className="flex flex-wrap justify-center md:grid md:grid-cols-4 md:gap-4">
        {usersList}
      </div>
      <LoadButton nextPage={nextPage} disabled={currentPage >= maxPage} />
      {badDataModal && <ApiErrorPopup closeModal={closeModal} />}
    </div>
  );
};

export default UserList;
