import { useEffect } from "react";
import { deleteUserByID, fetchAllUsers } from "../../redux/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import AddUserModal from "../modal/AddUserModal";
import UpdateUserModal from "../modal/UpdateUserModal";

const Card = () => {
  const users = useAppSelector((state) => state.user.users);
  const loading = useAppSelector((state) => state.user.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRemoveUser = (id: string) => {
    dispatch(deleteUserByID(id));
  };

  return (
    <>
      <div className="my-5">
        <AddUserModal />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading === "pending" ? (
          <div className="py-20">loading ..</div>
        ) : (
          Object.entries(users).map(([id, user]) => {
            return (
              <div
                key={id}
                className="w-300 cursor-pointer rounded-xl bg-white p-6 shadow-lg hover:bg-cyan-100"
              >
                <div className="font-medium">
                  👮‍♂️ firstName : {user.firstName}
                </div>
                <div>Lastname : {user.lastName}</div>
                <div className="text-cyan-900">
                  📞 Contact : {user.phoneNumber}
                </div>
                <div>Age :{user.age}</div>
                <div className="flex justify-end">
                  <UpdateUserModal id={id} />
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveUser(id)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Card;
