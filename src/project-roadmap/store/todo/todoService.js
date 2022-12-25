import { ITEM_URL, TODO_URL } from "../../../constants";
import axios from "axios";
import localStorageService from "../user/localStorageService";

const defaultHeader = () => {
  const userToken = localStorageService.getToken();
  const auth = userToken ? { Authorization: `Bearer ${userToken}` } : {};

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...auth,
  };
};

async function getTodo() {
  return axios.get(TODO_URL, {
    headers: defaultHeader(),
  });
}

function createTodo(payload) {
  return axios.post(TODO_URL, payload, {
    headers: defaultHeader(),
  });
}

async function getItem(todoId) {
  return axios.get(ITEM_URL.replace("{id}", todoId), {
    headers: defaultHeader(),
  });
}

function createItem(todoId, payload) {
  return axios.post(ITEM_URL.replace("{id}", todoId), payload, {
    headers: defaultHeader(),
  });
}

function updateItem(todoId, targetTodoId, payload) {
  return axios.patch(
    ITEM_URL.replace("{id}", todoId).replace("{targetTodoId}", targetTodoId),
    payload,
    {
      headers: defaultHeader(),
    }
  );
}

function deleteItem(todoId, targetTodoId) {
  return axios.delete(
    ITEM_URL.replace("{id}", todoId).replace("{targetTodoId}", targetTodoId),
    {
      headers: defaultHeader(),
    }
  );
}

const todoService = {
  getTodo,
  createTodo,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};

export default todoService;
