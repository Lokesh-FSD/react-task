import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchUserByID, updateUserByID } from "../../redux/users/userSlice";
import {
  isAlphabetical,
  isMobileNumberValidator,
  isRequiredValidator,
  isValidAge,
} from "../../utils/validators";

interface AppState {
  values: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    age: string;
  };
  errors: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    age: string;
  };
}

const initialState = {
  values: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
  },
  errors: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
  },
};

const UpdateUserModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<AppState>(initialState);
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.user.selectedUser);

  useEffect(() => {
    setFormData({
      ...formData,
      values: {
        firstName: selectedUser?.firstName || "",
        lastName: selectedUser?.lastName || "",
        phoneNumber: String(selectedUser?.phoneNumber) || "",
        age: String(selectedUser?.age) || "",
      },
    });
  }, [selectedUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const updatedData = {
        firstName: formData.values.firstName,
        lastName: formData.values.lastName,
        age: Number(formData.values.age),
        phoneNumber: Number(formData.values.phoneNumber),
      };

      dispatch(updateUserByID({ id, updatedData }));

      setIsModalOpen(false);
    }
  };

  const validate = () => {
    let validationMessage = isAlphabetical(formData.values.firstName);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          firstName: validationMessage || "",
        },
      });

      return false;
    }

    validationMessage = isAlphabetical(formData.values.lastName);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          lastName: validationMessage || "",
        },
      });

      return false;
    }

    validationMessage = isValidAge(formData.values.age);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          age: validationMessage || "",
        },
      });

      return false;
    }

    validationMessage = isMobileNumberValidator(formData.values.phoneNumber);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          phoneNumber: validationMessage || "",
        },
      });

      return false;
    }

    return true;
  };

  const handleOpen = () => {
    dispatch(fetchUserByID(id));
    setIsModalOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      values: {
        ...formData.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <div>
        <button
          className="cursor-pointer font-medium hover:underline"
          onClick={handleOpen}
        >
          🖋
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-screen items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full rounded-lg bg-white p-6 shadow-lg md:max-w-md">
            <div className="mb-4 text-xl font-medium text-gray-900 ">
              Update User Details
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-900"
                ></label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.values.firstName}
                  onChange={handleChange}
                  defaultValue={selectedUser?.firstName}
                  placeholder="First Name"
                />
                <span className="text-red-500">
                  {formData.errors.firstName}
                </span>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-900"
                ></label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.values.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <span className="text-red-500">{formData.errors.lastName}</span>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-900"
                ></label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.values.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
                <span className="text-red-500">{formData.errors.age}</span>
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-900"
                ></label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.values.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone No."
                />
                <span className="text-red-500">
                  {formData.errors.phoneNumber}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserModal;
