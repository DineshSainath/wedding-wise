import api from "../../services/api";

export const FETCH_VENDORS_BY_CATEGORY_SUCCESS =
  "FETCH_VENDORS_BY_CATEGORY_SUCCESS";

export const fetchVendorsByCategory = (category) => async (dispatch) => {
  try {
    const res = await api.get(`/vendors/category/${category}`);
    dispatch({
      type: FETCH_VENDORS_BY_CATEGORY_SUCCESS,
      payload: { category, vendors: res.data },
    });
  } catch (err) {
    console.error("Error fetching vendors:", err);
  }
};
