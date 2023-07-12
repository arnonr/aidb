import axios from "axios";

export const get = async (a, path) => {
  const response = await axios
    .get(`/${path}`, {
      params: {
        isActive: 1,
      },
      signal: a,
    })
    .catch(() => {
      window.location.reload();
    });
  return response.data.rows;
};
