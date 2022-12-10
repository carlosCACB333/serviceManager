import { UserInterface } from './../interfaces/userInterfaces';
interface IUsersGetAll {
  type: 'userGetAll';
  payload: UserInterface[];
}
interface IUsersAdd {
  type: 'userAdd';
  payload: UserInterface;
}
interface IUsersUpdate {
  type: 'userUpdate';
  payload: UserInterface;
}
interface IUsersDelete {
  type: 'userDelete';
  payload: number;
}
interface IUsersSetActive {
  type: 'userSetActive';
  payload: { id: number; checked: boolean };
}
interface IUserOnSelected {
  type: 'userOnSelected';
  payload: number;
}
interface IUserOfSelected {
  type: 'userOfSelection';
}
interface IErrorAdd {
  type: 'errorAdd';
  payload: UserInterface;
}
interface IErrorClear {
  type: 'errorClear';
}

export type UserAction =
  | IUsersGetAll
  | IUsersAdd
  | IErrorAdd
  | IErrorClear
  | IUserOnSelected
  | IUserOfSelected
  | IUsersUpdate
  | IUsersDelete
  | IUsersSetActive;

interface UserState {
  users: UserInterface[];
  selected?: UserInterface;
}

const initialState = {
  users: [],
  selected: undefined,
};

export const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case 'userGetAll':
      return { ...state, users: action.payload };
    case 'userAdd':
      return { ...state, users: [...state.users, action.payload] };
    case 'userUpdate':
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.payload.id ? action.payload : user)),
        selected: undefined,
      };
    case 'userSetActive':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, is_active: action.payload.checked } : user
        ),
      };

    case 'userDelete':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'userOnSelected':
      return {
        ...state,
        selected: state.users.find((user) => user.id === action.payload),
      };

    case 'userOfSelection':
      return { ...state, selected: undefined };

    case 'errorAdd':
      return { ...state, errors: action.payload };
    case 'errorClear':
      return { ...state, errors: undefined };

    default:
      return state;
  }
};
