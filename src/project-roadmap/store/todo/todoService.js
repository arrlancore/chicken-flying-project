import { ITEM_URL, PATCH_ITEM_URL, TODO_URL } from "../../../constants";
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

async function getMultipleItem(todoIds) {
  const multipleRequest = Promise.all(todoIds.map((id) => getItem(id)));

  return multipleRequest;
}

function createItem(todoId, payload) {
  return axios.post(ITEM_URL.replace("{id}", todoId), payload, {
    headers: defaultHeader(),
  });
}

function updateItem(todoId, itemId, payload) {
  return axios.patch(
    PATCH_ITEM_URL.replace("{id}", todoId).replace("{itemId}", itemId),
    payload,
    {
      headers: defaultHeader(),
    }
  );
}

function deleteItem(todoId, itemId) {
  return axios.delete(
    PATCH_ITEM_URL.replace("{id}", todoId).replace("{itemId}", itemId),
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
  getMultipleItem,
};

export default todoService;
