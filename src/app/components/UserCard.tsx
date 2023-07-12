import Image from "next/image";

import { UserType } from "../types/users";

const UserCard = ({ id, email, first_name, last_name, avatar }: UserType) => {
  return (
    <div className="w-xs rounded overflow-hidden shadow-lg m-4">
      <Image
        className="w-full"
        src={avatar}
        alt={`${first_name}-${last_name}`}
        width={200}
        height={200}
      />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{id}</p>
        <div className="font-bold text-xl mb-2">{email}</div>
        <p className="text-gray-700 text-base">
          {first_name} {last_name}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
